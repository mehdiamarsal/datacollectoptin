import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Campaign } from '../campaign/campaign.entity';
import { Civilite } from './dto/lead.dto'; 
@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;


  @Column()
  cp: string;

  @Column()
  ville: string;

  
  @Column()
  adresse: string;

  @Column({
    type: 'enum',
    enum: Civilite,
    default: Civilite.MR,  // Valeur par défaut si nécessaire
  })
  civilite: Civilite;

  @Column({
    type: 'int',  // On enregistre comme un entier
  })
  regime: number;


  @Column({
    type: 'int',  // On enregistre comme un entier
  })
  idApporteur: number;


  @Column({
    type: 'int',  // Profession sera stocké comme un nombre
  })
  profession: number;


  
  @Column('json', { nullable: true })
  additionalData: Record<string, any>;

  @ManyToOne(() => Campaign, (campaign) => campaign.leads, { onDelete: 'CASCADE' })
  campaign: Campaign;
}
