import { Transform } from 'class-transformer';
import { transformToTaxonomyArray } from '../../../utils/transformers/array-taxonomy.transformer';
import { IsArray } from 'class-validator';
import { TaxonomyType } from '../taxonomy.interface';

export class TaxonomyGetTermDto {
  @Transform(({ value }) => transformToTaxonomyArray(value))
  @IsArray({ message: 'Not valid taxonomy type' })
  taxonomyType: TaxonomyType[];
}
