import { ImageWithSizes } from '../../types';
import { TaxonomiesProps } from '../taxonomy/taxonomy.interface';

export type PostType = 'post' | 'page' | 'article' | 'video';

export interface BasePostParams {
  limit?: number;
  offset?: number;
  postType?: PostType;
  sticky?: boolean;
  excludeIds?: number[];
  relations?: {
    taxonomy?: boolean;
    user?: boolean;
  };
}

export interface PostResponse {
  id: number;
  guid: string;
  slug: string;
  type: PostType;
  title: string;
  content: string;
  excerpt: string;
  commentStatus: string;
  commentCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  taxonomyId: number[];
  taxonomies: TaxonomiesProps;
  user: string;
  sticky: boolean;
  views?: number;
  preview: ImageWithSizes;
  meta: { [key: string]: any };
  seo: {
    focusKeyword: string;
    description: string;
  };
}
