import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    logo: string;
  
    @Column()
    nameEntreprise: string;
  
    @Column()
    adresseEntreprise: string;
  
    @Column()
    telephoneEntreprise: string;
  
    @Column()
    nameGerant: string;
  
    @Column()
    telephoneGerant: string;
  
    @Column()
    CniPassport: string;
  
    @Column()
    RCCM: string;
  
    @Column()
    DFE: string;
  
    @Column()
    Contrat: string;
  
    @Column()
    Username: string;
  
    @Column()
    reference: string;
  
    @Column()
    password: string;
  
    @Column()
    apiToken: string;
  
    @Column()
    role: string;
  
    @Column()
    total: number;
  

}
