import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'ArrayType', async: true })
export class IsExistInArray implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const existArray = validationArguments.constraints[0];
    return false;
  }
}
