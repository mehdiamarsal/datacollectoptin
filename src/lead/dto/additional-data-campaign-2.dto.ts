import { IsString, IsNotEmpty, validateSync } from 'class-validator';

export class AdditionalDataCampaignDto2 {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  // Méthode de validation
  validate(data: any) {
    const errors = validateSync(Object.assign(new AdditionalDataCampaignDto2(), data));
    return errors.length === 0;
  }
}