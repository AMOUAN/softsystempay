import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { validate, validateOrReject } from 'class-validator';
import { Console } from 'console';
import { Request } from 'express';

import { paiement } from './dto/paiement.dto';
import { UsersService } from 'src/users/users.service';

@Controller('paiement')
export class PaiementController {
  constructor(private readonly paiementService: PaiementService,private readonly UserService:UsersService) {}


  @Post('/paymentgateway')
  async Postdata(@Body(new ValidationPipe()) data:paiement ,@Req() request:Request){

      try {
          
          // Valider les données de paiement en utilisant le DTO
          const errors = await validate(data);
          let bearerToken: string;
          if (errors.length > 0) {
            // Si des erreurs de validation sont trouvées, lancez une exception avec un statut HTTP 400
            throw new HttpException('Données de paiement invalides', HttpStatus.BAD_REQUEST);
          }
         
          const authorizationHeader = request.headers.authorization;
          if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            // Le jeton d'authentification est manquant ou incorrect
            return { error: 'Non authorisé' };
          }
          bearerToken = authorizationHeader.substring(7);
          
          const user = await this.UserService.findByBearerToken(bearerToken);

          
          if (!user) {
            // Aucun utilisateur trouvé avec ce jeton d'authentification
            return { error: 'Token invalide' };
          }

          const id=data.orderId;

          const orderId = await this.paiementService.findByOrderId(id);

         
          if (orderId) {
            // Aucun utilisateur trouvé avec ce jeton d'authentification
            return { error: 'OrderId déja utilisé' };
          }

          


          switch (data.canal) {
            case 'mtn':
            const responsemtn= this.paiementService.processPaiementMtn(data);
            return responsemtn;
              break;
            case 'wave':
              const responsewave= this.paiementService.processWavePayment(data);
              return responsewave;
              break;

              case 'orange':
              const responseorange= this.paiementService.processPaiementOrange(data);
              return responseorange;

              break;

              case 'moov':
                const responsemoov= this.paiementService.processPaiementMoov(data);
                return responsemoov;
                
                break;
  
        
              // Logique par défaut si aucune correspondance de canal n'est trouvée
          }
          
          
          // Traitez les données de paiement ici si elles sont valides
          return 'Données de paiement validées avec succès !';

        } catch (error) {
          // Gérer les erreurs de manière appropriée
          throw new HttpException('Une erreur est survenue lors de la validation des données de paiement', HttpStatus.INTERNAL_SERVER_ERROR);
        }

  }

  @Post()
  create(@Body() createPaiementDto: CreatePaiementDto) {
    return this.paiementService.create(createPaiementDto);
  }

  @Get()
  findAll() {
    return this.paiementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paiementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiementDto: UpdatePaiementDto) {
    return this.paiementService.update(+id, updatePaiementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paiementService.remove(+id);
  }
}
