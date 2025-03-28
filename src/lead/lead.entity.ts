import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { Campaign } from '../campaign/campaign.entity';
import { Civilite } from './dto/lead.dto'; 
@Entity()

@Unique(['email']) // Ajout d'une contrainte unique sur l'email
@Unique(['phone']) // Ajout d'une contrainte unique sur le téléphone
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;


  @Column({ unique: true }) 

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
