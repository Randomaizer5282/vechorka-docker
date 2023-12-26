export const taxonomyTypes = [
  'category',
  'post_geography',
  'post_tag',
] as const;
export type TaxonomyType = (typeof taxonomyTypes)[number];

export interface TaxonomyResponse {
  id: number;
  taxonomyId: number;
  taxonomy: TaxonomyType;
  description: string;
  parent: number;
  count?: number;
  name: string;
  slug: string;
}

export interface TaxonomiesProps {
  categories: TaxonomyResponse[];
  geography: TaxonomyResponse[];
  tags: TaxonomyResponse[];
}
