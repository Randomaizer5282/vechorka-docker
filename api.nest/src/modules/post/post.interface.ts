import { ImageWithSizes } from '../../types';
import { TaxonomiesProps, TypeTaxonomy } from '../taxonomy/taxonomy.interface';
import { CommentResponse } from '../comment/comment.interface';

export type PostType =
  | 'post'
  | 'page'
  | 'article'
  | 'video'
  | 'attachment'
  | 'employee'
  | 'advert';

export interface BasePostParams {
  limit?: number;
  offset?: number;
  postType?: PostType;
  sticky?: boolean;
  excludeIds?: number[];
  includeIds?: number[];
  relations?: {
    taxonomy?: boolean;
    user?: boolean;
    content?: boolean;
  };
}

export interface PostsByTaxonomySlug extends BasePostParams {
  slug: string;
  taxonomyType?: TypeTaxonomy;
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
  createdDate?: string;
  createdTime?: string;
  createdDateGmt?: string;
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
  comments?: CommentResponse[];
}
