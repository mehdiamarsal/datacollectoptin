import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lead } from '../lead/lead.entity';  // Import de Lead

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column({ type: 'int', default: 0 })
  capping: number;


  @Column({ type: 'varchar', length: 10, nullable: true })
  etat: string;
  
  @OneToMany(() => Lead, (lead) => lead.campaign)
  leads: Lead[];
}
