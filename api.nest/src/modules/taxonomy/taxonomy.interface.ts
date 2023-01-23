export type TypeTaxonomy = 'category' | 'post_geography' | 'post_tag';

export interface TaxonomyResponse {
  id: number;
  taxonomyId: number;
  taxonomy: TypeTaxonomy;
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
