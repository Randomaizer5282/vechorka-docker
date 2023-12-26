import {
  TaxonomyType,
  taxonomyTypes,
} from '../../modules/taxonomy/taxonomy.interface';

export const transformToTaxonomyArray = (value) => {
  if (typeof value === 'string') {
    const input = value.split(',');
    const arr = [];
    input?.forEach((val) => {
      if (taxonomyTypes.includes(val as TaxonomyType)) {
        arr.push(val);
      }
    });
    return arr.length ? arr : value;
  }

  return value;
};
