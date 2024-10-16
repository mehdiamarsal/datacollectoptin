import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Campaign } from '../campaign/campaign.entity';
import { Civilite } from './dto/lead.dto'; 
@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  etatEnvoi: string;

  @Column({ type: 'timestamp', nullable: true })
  dateHeureEnvoi: Date;

  @Column('json', { nullable: true })
  additionalData: Record<string, any>;

  @ManyToOne(() => Campaign, (campaign) => campaign.leads, { onDelete: 'CASCADE' })
  campaign: Campaign;
}
