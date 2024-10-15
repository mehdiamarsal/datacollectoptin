import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lead } from '../lead/lead.entity';  // Import de Lead

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Lead, (lead) => lead.campaign)
  leads: Lead[];
}
