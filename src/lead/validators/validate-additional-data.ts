import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { validateSync } from 'class-validator';
import { AdditionalDataCampaignDto1 } from '../dto/additional-data-campaign-1.dto';
import { AdditionalDataCampaignDto2 } from '../dto/additional-data-campaign-2.dto';

@ValidatorConstraint({ async: false })
export class ValidateAdditionalDataConstraint implements ValidatorConstraintInterface {
  
  validate(value: any, args: ValidationArguments) {
    const campaignId = (args.object as any).campaignId;

    // Choisir le DTO approprié en fonction de campaignId
    if (campaignId === 1) {
      // Valider contre AdditionalDataCampaignADto
      const validationErrors = validateSync(Object.assign(new AdditionalDataCampaignDto1(), value));
      if (validationErrors.length > 0) {
        console.log('Validation errors for Campaign A:', validationErrors);
      }
      return validationErrors.length === 0;  // Renvoie false si des erreurs sont présentes
    } else if (campaignId === 2) {
      // Valider contre AdditionalDataCampaignBDto
      const validationErrors = validateSync(Object.assign(new AdditionalDataCampaignDto2(), value));
      if (validationErrors.length > 0) {
        console.log('Validation errors for Campaign B:', validationErrors);
      }
      return validationErrors.length === 0;  // Renvoie false si des erreurs sont présentes
    }
    
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid additional data for the given campaign';
  }
}


export function ValidateAdditionalData(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateAdditionalDataConstraint,
    });
  };
}
