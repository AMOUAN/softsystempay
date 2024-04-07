import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';

export class paiement {

  @IsNotEmpty({ message: 'La référence client est requise' })
  client_reference: string;

  @IsNotEmpty({ message: 'Le montant   est requis' })
  @IsNumber()
  @IsPositive()
  montant: string;

  @IsNotEmpty({ message: 'Le Currency  est requis' })
  @MaxLength(3)
  Currency: string;

  @IsNotEmpty({ message: 'L error_url  est requise' })
  @MaxLength(100)
  error_url: string;

  @IsNotEmpty({ message: 'Le callback_url  est requise' })
  @MaxLength(100)
  callback_url: string;

  @IsNotEmpty({ message: 'Le canal client est requis' })
  canal: string;

  @IsNotEmpty({ message: 'Le success_url  est requis' })
  @MaxLength(100)
  success_url: string;

  @IsNotEmpty({ message: 'Le orderId est requis' })
  @MaxLength(50)
  orderId: string;

  @IsNotEmpty({ message: 'Le numero  est requise' })
  @MaxLength(13, { message: 'Le numéro doit comporter moins de 13 caractères' })
  numero: string;

  @IsNotEmpty({ message: 'L objet est requise' })
  @MaxLength(50)
  objet:string;
  

}