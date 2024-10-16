import { IsString, IsNotEmpty, validateSync, IsDateString } from 'class-validator';

export class AdditionalDataCampaignDto3 {
//3 Auto
@IsDateString()
@IsNotEmpty()
dateMiseEnCirculation: string; // Date de mise en circulation au format ISO

@IsString()
@IsNotEmpty()
marqueVoiture: string; // Marque de voiture

@IsString()
@IsNotEmpty()
modeleVoiture: string; // Modèle de voiture
  // Méthode de validation
  validate(data: any) {
    const errors = validateSync(Object.assign(new AdditionalDataCampaignDto3(), data));
    return errors.length === 0;
  }
}