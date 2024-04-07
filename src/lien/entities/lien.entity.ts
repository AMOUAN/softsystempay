import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lien {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    reference: string;
  
    @Column()
    orderId: string;
  
    @Column()
    montant: string;
  
    @Column()
    numero: string;
  
    @Column()
    token: string;

    @Column()
    externalId: string;
    
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
   
}
