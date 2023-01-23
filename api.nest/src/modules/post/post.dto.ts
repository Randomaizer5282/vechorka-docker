import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PostType } from './post.interface';
import { Transform } from 'class-transformer';
import { transformToArrayNumber } from '../../utils/pipes';
import { TypeTaxonomy } from '../taxonomy/taxonomy.interface';

export class PostQueryParamsDTO {
  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  offset?: number;

  @IsOptional()
  @IsString()
  postType?: PostType;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  sticky?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  taxonomy?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  user?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  content?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  taxonomyId?: number;

  @IsOptional()
  @Transform(({ value }) => transformToArrayNumber(value))
  @IsArray()
  includeIds?: number[];

  @IsOptional()
  @Transform(({ value }) => transformToArrayNumber(value))
  @IsArray()
  excludeIds?: number[];
}

export class PostByTaxonomyParamsDTO extends PostQueryParamsDTO {
  @IsOptional()
  @IsString()
  taxonomyType?: TypeTaxonomy = 'category';
}

export class PostSearchQueryParamsDTO {
  @IsString()
  q: string;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  offset?: number;
}

export class AddPollReply {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  postId: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  pollId: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  pollKey: string;
}

export class PostQueryGalleryParamsDTO {
  @Transform(({ value }) => transformToArrayNumber(value))
  @IsArray()
  ids?: number[];
}
