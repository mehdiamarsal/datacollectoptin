import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { LeadService } from '../lead.service';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
    constructor(private leadService: LeadService) {}
  
    async validate(email: string, args: ValidationArguments) {
      const lead = await this.leadService.findOneByEmail(email);
      return !lead; // Retourne vrai si l'email n'existe pas, sinon faux
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Email $value already exists. Choose another email.';
    }
  }
  
  // Autre validateur pour le téléphone
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsUniquePhoneConstraint implements ValidatorConstraintInterface {
    constructor(private leadService: LeadService) {}
  
    async validate(phone: string, args: ValidationArguments) {
      const lead = await this.leadService.findOneByPhone(phone);
      return !lead; // Retourne vrai si le téléphone n'existe pas, sinon faux
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Phone number $value already exists. Choose another phone number.';
    }
  }
  
  // Décorateurs pour les utiliser dans le DTO
  export function IsUniqueEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUniqueEmailConstraint,
      });
    };
  }
  
  export function IsUniquePhone(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUniquePhoneConstraint,
      });
    };
  }
  