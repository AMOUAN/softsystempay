import { Injectable  } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { Paiement } from './entities/paiement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Lien } from 'src/lien/entities/lien.entity';
import { getstatus } from 'src/getstatus/entities/getstatus.entity';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';
import * as moment from 'moment';
import axios, { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';

import { ConfigService } from '@nestjs/config';


@Injectable()
export class PaiementService {
  constructor(
    @InjectRepository(Paiement)
    private Paiementrepository: Repository<Paiement>,
    @InjectRepository(Lien)
    private readonly liensRepository: Repository<Lien>,
    @InjectRepository(getstatus)
    private readonly getStatusRepository: Repository<getstatus>,
    @InjectRepository(Paiement)

    @InjectRepository(Users)
  private UserRepository: Repository<Users>,

  private httpService: HttpService

  ) {}

  

  async findByBearerToken(bearerToken: string):Promise<boolean>  {
    try {
      
      const user = await this.UserRepository
      .createQueryBuilder('users')
      .where('users.apiToken = :token', { token: bearerToken })
      .getOne();

      // Si aucun utilisateur n'est trouvé avec le token donné, retourner false
      if (!user) {
        return false;
      }

      // Si un utilisateur est trouvé avec le token donné, retourner true
      return true;
    } catch (error) {
      // Gérer les erreurs de manière appropriée (par exemple, enregistrer les erreurs dans les journaux)
      console.error('Erreur lors de la vérification du token Bearer :', error);
      return false; // En cas d'erreur, retourner false
    }
  }


  async findByOrderId(orderId: string):Promise<boolean>  {
    try {
      
     
      const user = await this.getStatusRepository
      .createQueryBuilder('getstatus')
      .where('getstatus.orderId = :orderId', { orderId: orderId })
      .getOne();
      // Si aucun utilisateur n'est trouvé avec le token donné, retourner false
      if (!user) {
        return false;
      }

      // Si un utilisateur est trouvé avec le token donné, retourner true
      return true;
    } catch (error) {
      // Gérer les erreurs de manière appropriée (par exemple, enregistrer les erreurs dans les journaux)
      console.error('Erreur lors de la vérification du token Bearer :', error);
      return false; // En cas d'erreur, retourner false
    }
  }
  
  create(createPaiementDto: CreatePaiementDto) {
    return this.Paiementrepository.create(createPaiementDto);
  }

  findAll() {
    return this.Paiementrepository.find();
  }

  findOne(id: number) {
    return this.Paiementrepository.findOneBy({id});
  }

  update(id: number, updatePaiementDto: UpdatePaiementDto) {
    return this.Paiementrepository.update(id, updatePaiementDto);
  }

  remove(id: number) {
    return this.Paiementrepository.delete({id}) ;
  }



  async processPaiementMtn(value: any): Promise<any> {
    const length = 30;
    const randomBytesBuffer = randomBytes(Math.ceil(length / 2));

// Convertir les octets en une chaîne hexadécimale
const randomString = randomBytesBuffer.toString('hex').slice(0, length);
    const liens = this.liensRepository.create({
      reference: value.client_reference,
      externalId: uuidv4(),
      orderId: value.orderId,
      montant: value.montant,
      numero: value.numero,
      token: randomString,
      created_at:moment().toISOString(),
    });
    await this.liensRepository.save(liens);

    const payement = this.getStatusRepository.create({
      montant: value.montant,
      error_url: value.error_url,
      success_url: value.success_url,
      callback_url: value.callback_url,
      reseau: 'mtn',
      status: 'En cours',
      numero: value.numero,
      objet: value.objet,
      orderId: value.orderId,
      created_at:moment().toISOString(),
    });
    await this.getStatusRepository.save(payement);

    const url = 'https://softsystempay.com/paiementMtn/'+randomString;
    
    return {
      orderId: value.orderId,
      Http_reponse: "200",
      url,
    };
  }

  async processPaiementWave(value: any): Promise<any> {
    const url = 'https://api.wave.com/v1/checkout/sessions';
    
    const curlResponse = await this.processWavePayment(value);
    

    // Récupérer l'utilisateur en fonction de l'apiToken
    

    // Enregistrer les détails de paiement
    const payement = this.getStatusRepository.create({
      montant: value.montant,
      error_url: value.error_url,
      success_url: value.success_url,
      callback_url: value.callback_url,
      reseau: 'wave',
      status: 'En cours',
      numero: value.numero,
      objet: value.objet,
      orderId: value.orderId,
      created_at:moment().toISOString(),
    });


    const paiement = this.Paiementrepository.create({
      montant: value.montant,
      error_url: value.error_url,
      success_url: value.success_url,
      callback_url: value.callback_url,
      reseau: 'wave',
      status: 'En cours',
      numero: value.numero,
      objet: value.objet,
      orderId: value.orderId,
     client_reference: value.client_reference,
     created_at:moment().toISOString(),
    });

   
    return {
      orderId: value.orderId,
      Http_reponse: '200',
      url: response,
    };
  }
  async processWavePayment(value: any) {

    const url = 'https://api.wave.com/v1/checkout/sessions';
    const data = {
      currency: 'XOF',
      amount: value.montant,
      error_url: value.error_url,
      success_url: value.success_url,
      client_reference: value.orderId,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer wave_ci_prod_ww6OH_zfGHgjT5k-P7EIb_g-vZQQS76fwxWiAQmlgcdqEG4RTKwZYrj6PHYU3gJi_vKXc9u0ahubNMEm11Iiy_cwKRtaBHSsBg',
    };

    try {
      const response = await this.httpService.post(url, data, { headers }).toPromise();
      const responseData = response.data;

      // Enregistrer les détails de paiement ou faire d'autres traitements ici

      return responseData.wave_launch_url;
    } catch (error) {
      // Gérer les erreurs de manière appropriée
      throw error;
    }
  }


  async accestoken2(): Promise<string> {
    const authHeader = Buffer.from('PidStPgLIZt4jkFQ3AxVjla1GKpMblX:', 'base64');
    try {
      const response = await axios.post('https://api.orange.com/oauth/v3/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': 'Basic UGlkU3RQbEdJWVp0NGprRlEzQXhWamxhMUdLcE1ibFg6QmppTXpMU0RBMmdhQUZpSQ==',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      
      const accessToken = response.data.access_token;
      return 'Bearer '+accessToken;
    } catch (error) {
      console.error('Error while fetching access token:', error);
      throw new Error('An error occurred while fetching access token.');
    }
  }
  async processPaiementOrange(value: any): Promise<any> {

    const access_token = await this.accestoken2();

    const url = 'https://api.orange.com/orange-money-webpay/ci/v1/webpayment';
    const data = {
      currency: 'XOF',
      merchant_key: '2a4b48f8',
      amount: value.montant,
      cancel_url: value.error_url,
      return_url: value.success_url,
      order_id: value.orderId,
      notif_url: 'https://softsystempay.com/api/callback/orange',
      lang: 'fr',
      reference: 'softsystemPay',
    };

    try {
      const response = await this.httpService.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: access_token,
        },
      }).toPromise();




      const paymentData = response.data;



      const payement = this.getStatusRepository.create({
        montant: value.montant,
        error_url: value.error_url,
        success_url: value.success_url,
        callback_url: value.callback_url,
        reseau: 'orange',
        status: 'En cours',
        numero: value.numero,
        objet: value.objet,
        orderId: value.orderId,
        created_at:moment().toISOString(),
      });
  
  
      const paiement = this.Paiementrepository.create({
        montant: value.montant,
        error_url: value.error_url,
        success_url: value.success_url,
        callback_url: value.callback_url,
        reseau: 'orange',
        status: 'En cours',
        numero: value.numero,
        objet: value.objet,
        orderId: value.orderId,
       client_reference: value.client_reference,
       created_at:moment().toISOString(),
      });
  
    

    // Récupérer l'utilisateur en fonction de l'apiToken
    return {
        orderId: value.orderId,
        Http_response: '200',
        url: paymentData.payment_url,
      };
    } catch (error) {
      throw new Error('Failed to create payment:'+ error.message);
    }

    // Enregistrer les détails de paiement
    

  }


/////////// Moov process  /////////////



async processPaiementMoov(value: any): Promise<any> {
  const length = 30;
  const randomBytesBuffer = randomBytes(Math.ceil(length / 2));

// Convertir les octets en une chaîne hexadécimale
const randomString = randomBytesBuffer.toString('hex').slice(0, length);
  const liens = this.liensRepository.create({
    reference: value.client_reference,
    externalId: uuidv4(),
    orderId: value.orderId,
    montant: value.montant,
    numero: value.numero,
    token: randomString,
    created_at:moment().toISOString(),
  });
  await this.liensRepository.save(liens);

  const payement = this.getStatusRepository.create({
    montant: value.montant,
    error_url: value.error_url,
    success_url: value.success_url,
    callback_url: value.callback_url,
    reseau: 'moov',
    status: 'En cours',
    numero: value.numero,
    objet: value.objet,
    orderId: value.orderId,
    created_at:moment().toISOString(),
  });
  await this.getStatusRepository.save(payement);

  const url = 'https://softsystempay.com/paiementMoov/'+randomString;
  
  return {
    orderId: value.orderId,
    Http_reponse: "200",
    url,
  };
}











 
}
