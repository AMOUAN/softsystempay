import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';
export class CreateUserDto {


    @IsNotEmpty({ message: 'La référence client est requise' })
    logo: string;
    
    @IsNotEmpty({ message: 'Le montant   est requis' })
    @IsNumber()
    @IsPositive()
    nameEntreprise: string;
  
    @IsNotEmpty({ message: 'Le Currency  est requis' })
    @MaxLength(3)
    adresseEntreprise: string;


    @IsNotEmpty({ message: 'La référence client est requise' })
    telephoneEntreprise: string;

    @IsNotEmpty({ message: 'Le montant   est requis' })
    @IsNumber()
    @IsPositive()
    nameGerant: string;
  
    @IsNotEmpty({ message: 'Le Currency  est requis' })
    @MaxLength(3)
    telephoneGerant: string;

    @IsNotEmpty({ message: 'L error_url  est requise' })
    @MaxLength(100)
    CniPassport: string;


    
      @IsNotEmpty({ message: 'La référence client est requise' })
      client_reference: string;
    
      @IsNotEmpty({ message: 'Le montant   est requis' })
      @IsNumber()
      @IsPositive()
      DFE: string;
    
      @IsNotEmpty({ message: 'Le Currency  est requis' })
      @MaxLength(3)
      Contrat: string;

      @IsNotEmpty({ message: 'L error_url  est requise' })
      @MaxLength(100)
      Username: string;
    
      @IsNotEmpty({ message: 'Le callback_url  est requise' })
      @MaxLength(100)
      reference: string;
    
      @IsNotEmpty({ message: 'Le canal client est requis' })
      password: string;
    
      @IsNotEmpty({ message: 'Le success_url  est requis' })
      @MaxLength(100)
      apiToken: string;
    
      @IsNotEmpty({ message: 'Le orderId est requis' })
      @MaxLength(50)
      role: string;
    
      @IsNotEmpty({ message: 'Le numero  est requise' })
      @MaxLength(13, { message: 'Le numéro doit comporter moins de 13 caractères' })
      total: number;
    
      @IsNotEmpty({ message: 'L objet est requise' })
      @MaxLength(50)
      objet:string;
      
    
    }