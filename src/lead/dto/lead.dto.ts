import { IsString, IsNotEmpty, IsObject, Validate, IsEnum, IsEmail, Length, Matches, IsNumber, IsIn } from 'class-validator';
import { AdditionalDataCampaignDto1 } from './additional-data-campaign-1.dto';
import { AdditionalDataCampaignDto2 } from './additional-data-campaign-2.dto';
import { AdditionalDataCampaignDto3} from './additional-data-campaign-3.dto';
import { ValidateAdditionalData } from '../validators/validate-additional-data';
import { IsUniqueEmail, IsUniquePhone } from '../validators/unique-validator';
export enum Civilite {
  MR = 'Mr',
  MME = 'Mme',
}

export enum Profession {
  EMPLOYE_OUVRIER = 1,
  CADRE = 2,
  COMMERCANT = 3,
  FONCTIONNAIRE = 4,
  ENSEIGNANT = 5,
  AGRICULTEUR = 6,
  ARTISAN = 7,
  CHEF_ENTREPRISE = 8,
  PROFESSION_LIBERALE = 9,
  ETUDIANT = 11,
  RETRAITE = 12,
  SANS_PROFESSION = 13,
  RECHERCHE_EMPLOI = 14,
  AUTRE = 15,
  AUTOENTREPRENEUR = 16,
}


export class LeadDto {
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  dob: string;


  
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsUniqueEmail({ message: 'Email already exists' })
  email: string;

 
  @Length(10, 10, { message: 'Le numéro de téléphone doit contenir exactement 10 caractères' })
  @Matches(/^0[0-9]{9}$/, { message: 'Le numéro de téléphone doit commencer par 0 et contenir 10 chiffres' })
  @IsString()
  @IsNotEmpty()
  @IsUniquePhone({ message: 'Phone number already exists' })
  phone: string;























  
  @IsString()
  @IsNotEmpty()
  adresse: string;


  @IsString()
  @IsNotEmpty()
  ville: string;


  @IsString()
  @IsNotEmpty()
  cp: string;



  @IsEnum(Profession, { message: 'Profession doit être une valeur valide entre 1 et 16' })
  profession: Profession;

 

    @IsNotEmpty()
  campaignId: number;

  @IsNotEmpty()
  idApporteur: number;
  

  @IsEnum(Civilite, {
    message: 'Civilité doit être Mr ou Mme',
  })
  civilite: Civilite;

  // Utiliser le validateur personnalisé ici
  @ValidateAdditionalData({
    message: 'Invalid additional data for the given campaign',
  })
  @IsObject()
  additionalData: AdditionalDataCampaignDto1 | AdditionalDataCampaignDto2| AdditionalDataCampaignDto3;
}
