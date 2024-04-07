import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paiement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  montant: number;

  @Column()
  status: string;
 

  @Column({ nullable: true })
  client_reference: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  error_url: string;

  @Column({ nullable: true })
  success_url: string;

  @Column({ nullable: true })
  callback_url: string;

  @Column()
  reseau: string;
  
  @Column({ nullable: true })
  objet: string;

  @Column({ nullable: true })
  orderId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    
}
