import { api } from "@/shared/api/index";
import { encodeQueryData } from "@/shared/lib/helpers";
import type { TaxonomyType } from "@/shared/types";

interface GetTaxonomyBySlugParams {
  taxonomyType?: TaxonomyType[];
}

export const getTaxonomyBySlug = (
  slug: string,
  params?: GetTaxonomyBySlugParams
) => {
  const queryParams = encodeQueryData(params);
  return api.get(`taxonomies/${slug}${queryParams ? `?${queryParams}` : ""}`);
};
