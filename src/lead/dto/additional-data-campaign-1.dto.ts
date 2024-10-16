import { IsNumber, IsString, IsNotEmpty, validateSync, IsIn } from 'class-validator';

//1 mutuelle



export class AdditionalDataCampaignDto1 {
   // Validation du régime

   //1 pour TNS
   //Et
   //2 pour mutuelle générale


   @IsNotEmpty()
   @IsNumber({}, { message: 'Régime doit être un nombre' })
   @IsIn([1, 2], { message: 'Régime doit être 1 (TNS), 2 mutuelle générale' })
   regime: number;

  // Méthode de validation
  validate(data: any) {
    const errors = validateSync(Object.assign(new AdditionalDataCampaignDto1(), data));
    return errors.length === 0;
  }
}
