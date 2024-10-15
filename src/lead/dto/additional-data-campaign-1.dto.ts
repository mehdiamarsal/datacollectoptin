import { IsNumber, IsString, IsNotEmpty, validateSync } from 'class-validator';



export class AdditionalDataCampaignDto1 {
  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsString()
  @IsNotEmpty()
  targetAudience: string;

  // Méthode de validation
  validate(data: any) {
    const errors = validateSync(Object.assign(new AdditionalDataCampaignDto1(), data));
    return errors.length === 0;
  }
}
