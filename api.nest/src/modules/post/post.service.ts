import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostMeta } from './post-meta.entity';
import type { ImageWithSizes } from '../../types';
import { TaxonomyService } from '../taxonomy/taxonomy.service';
import type { PostResponse, PostType } from './post.interface';
import { BasePostParams, PostsByTaxonomySlug } from './post.interface';
import type { TaxonomyResponse } from '../taxonomy/taxonomy.interface';
import { AttachmentService } from '../attachment/attachment.service';
import { AddPollReply, PostSearchQueryParamsDTO } from './post.dto';
import { formatISODate, formatISOTime } from '../../utils/date';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostMeta)
    private readonly metaRepository: Repository<PostMeta>,
    private readonly taxonomyService: TaxonomyService,
    private readonly attachmentService: AttachmentService,
  ) {}

  // home page posts
  async getIndexPosts() {
    const mainPosts: any = await this.getPosts({
      postType: 'post',
      limit: 5,
      isResponseIds: true,
      sticky: true,
      relations: { taxonomy: true },
    });

    const mainNews = mainPosts?.data;
    const mainNewsIds = mainPosts?.postsIds || undefined;

    const lastNews = await this.getPosts({
      postType: 'post',
      limit: 9,
      excludeIds: mainNewsIds,
      relations: { taxonomy: true },
    });

    const articles = await this.getPosts({
      limit: 5,
      sticky: true,
      postType: 'article',
    });

    const interestNews = await this.getPostsInterest();

    return {
      mainNews,
      lastNews,
      interestNews,
      articles,
    };
  }

  getOnePostById({ postId }: { postId: number }) {
    return this.postRepository.findOneBy({ ID: postId });
  }

  async getPostById({
    postId,
    withMeta = false,
  }: {
    postId: number;
    withMeta?: boolean;
  }) {
    let query = this.postRepository.createQueryBuilder('post');
    query = query.where('ID=:postId AND post_status = "publish"', {
      postId,
    });

    const post: any = await query.getRawOne();

    if (post && Object.keys(post).length) {
      if (withMeta) {
        const metas = await this.getPostMetaByIds(post.post_ID);
        const attachments = await this.getPostsAttachmentByIds([post.post_ID]);
        return this.responseData({ posts: [post], metas, attachments })[0];
      }

      return this.responseData({ posts: [post] })[0];
    }

    throw new NotFoundException('post not found');
  }

  async getOneLastPostByType({ postType }: { postType: PostType }) {
    let query = this.postRepository.createQueryBuilder('post');
    query = query
      .where('post_type=:postType AND post_status = "publish"', {
        postType,
      })
      .orderBy('post_date');

    const post: any = await query.getRawOne();

    if (post && Object.keys(post).length) {
      const metas = await this.getPostMetaByIds(post.post_ID);
      return this.responseData({ posts: [post], metas })[0];
    }

    throw new NotFoundException('post not found');
  }

  async getPostBySlug({
    slug,
    slugTaxonomy,
    withRelatedPosts = false,
    postTypeRelated = 'post',
  }: {
    slug: string;
    slugTaxonomy?: string;
    withRelatedPosts?: boolean;
    postTypeRelated?: PostType;
  }) {
    let query = this.postRepository.createQueryBuilder('post');

    if (slugTaxonomy) {
      const taxonomies = await this.taxonomyService.getTaxonomies();
      const taxonomy = taxonomies.find(
        (tax) => tax.terms.slug === slugTaxonomy,
      );
      const taxonomyId = taxonomy?.term_taxonomy_id;

      if (taxonomyId) {
        query = query.innerJoinAndSelect(
          'post.post_taxonomy',
          'taxonomyRel',
          'taxonomyRel.term_taxonomy_id=:taxonomyId',
          { taxonomyId },
        );
      } else {
        throw new NotFoundException('post not found');
      }
    }

    query = query
      .leftJoin('post.user', 'user')
      .addSelect(['user.display_name']);

    query = query.where('post_name=:slug AND post_status = "publish"', {
      slug,
    });

    const post: any = await query.getRawOne();

    if (post && Object.keys(post).length) {
      const metas = await this.getPostMetaByIds(post.post_ID);
      const attachments = await this.getPostsAttachmentByIds([post.post_ID]);
      const taxonomies = await this.getTaxonomiesByPostsIds(
        [post.post_ID],
        true,
      );

      const response = {
        post: this.responseData({
          posts: [post],
          metas,
          attachments,
          taxonomies,
          type: 'full',
        })[0],
        relatedPosts: null,
      };

      // add post count views to meta
      await this.addPostViews(post.post_ID);

      // related posts, exclude current post
      if (withRelatedPosts) {
        response.relatedPosts = await this.getPosts({
          excludeIds: [post.post_ID],
          limit: 4,
          postType: postTypeRelated,
          relations: { taxonomy: true },
        });
      }

      return response;
    }

    throw new NotFoundException('post not found');
  }

  async getPosts({
    taxonomyId,
    limit = 20,
    offset = 0,
    postType,
    sticky,
    excludeIds,
    includeIds,
    isResponseIds,
    relations = { taxonomy: undefined, user: undefined, content: undefined },
  }: BasePostParams & {
    taxonomyId?: number;
    isResponseIds?: boolean;
  }) {
    // : Promise<PostResponse[] | { data: PostResponse[]; postsIds: number[] }>
    let query = this.postRepository.createQueryBuilder('post');
    if (taxonomyId) {
      query = query.innerJoinAndSelect(
        'post.post_taxonomy',
        'taxonomyRel',
        'taxonomyRel.term_taxonomy_id=:taxonomyId',
        { taxonomyId },
      );
    }

    if (sticky) {
      query = query.leftJoinAndSelect(
        'post.meta',
        'metaSticky',
        'metaSticky.meta_key="sticky"',
      );
    }

    if (relations?.user) {
      query = query.leftJoin('post.user', 'user').addSelect([
        'user.display_name',
        // 'user.user_login',
        // 'user.user_nicename',
      ]);
    }

    // postType
    if (postType) {
      if (postType === 'attachment') {
        query = query.where('post_type=:postType', {
          postType,
        });
      } else {
        query = query.where('post_status = "publish" AND post_type=:postType', {
          postType,
        });
      }
    } else {
      query = query.where('post_status = "publish"', {
        postType,
      });
    }

    if (excludeIds?.length > 0) {
      query = query.andWhere('ID NOT IN (:excludeIds)', {
        excludeIds,
      });
    }

    if (includeIds?.length > 0) {
      query = query.andWhere('ID IN (:includeIds)', {
        includeIds,
      });
    }

    if (sticky) {
      query = query
        .orderBy('metaSticky.meta_value', 'DESC')
        .addOrderBy('post_date', 'DESC');
    } else {
      query = query.orderBy('post_date', 'DESC');
    }

    const posts = await query.offset(offset).limit(limit).getRawMany();
    // return posts;

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const attachments = await this.getPostsAttachmentByIds(postsIds);

      let taxonomies = [];
      if (relations.taxonomy) {
        taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      }
      // return taxonomies;

      const response = this.responseData({
        posts,
        metas,
        taxonomies,
        attachments,
        type: relations.content ? 'full' : 'short',
      });

      return isResponseIds ? { data: response, postsIds } : response;
    }

    return null;
  }

  async getPostsByTaxonomySlug({ ...params }: PostsByTaxonomySlug) {
    if (!params.slug) return null;
    const taxonomies = await this.taxonomyService.getTaxonomies();
    const taxonomy = taxonomies.find(
      (tax) =>
        tax.terms.slug === params.slug && tax.taxonomy === params.taxonomyType,
    );

    if (!taxonomy) throw new NotFoundException('posts not found');

    return await this.getPosts({ taxonomyId: taxonomy.term_id, ...params });
  }

  // get post meta fields, and children _thumbnail_id - preview image
  private getPostMetaByIds(postIds: number[]) {
    if (postIds?.length) {
      return (
        this.metaRepository
          .createQueryBuilder('meta')
          // thumbnail meta
          .where('meta.post_id IN (:postIds)', { postIds })
          .getRawMany()
      );
    }
    return null;
  }

  private getPostsAttachmentByIds(postIds: number[]) {
    if (postIds?.length) {
      return this.metaRepository
        .createQueryBuilder('meta')
        .select(
          `meta.*, pa.post_content AS meta_description, pa.post_excerpt AS meta_caption,
          pa.post_mime_type AS meta_mime_type, pa.post_name AS meta_file_name, pa.post_parent AS meta_post_id`,
        )
        .leftJoinAndSelect(Post, 'pa', 'pa.ID=meta.meta_value')
        .leftJoinAndSelect(PostMeta, 'pam', 'pam.post_id=pa.ID')
        .where('meta.post_id IN (:postIds)', { postIds })
        .andWhere('meta.meta_key = "_thumbnail_id"')
        .getRawMany();
    }
    return null;
  }

  async getPostGalleryImagesByIds(ids: number[]) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .where('ID IN (:ids)', { ids })
      .getRawMany();

    const attachments = await this.postRepository
      .createQueryBuilder('post')
      .select(
        `ID as post_id, post_content AS meta_description, post_excerpt AS meta_caption, 
        post_mime_type AS post_mime_type, post_name AS meta_file_name`,
      )
      .leftJoinAndSelect('post.meta', 'pam')
      .where('ID IN (:ids)', { ids })
      .getRawMany();

    // return attachments;

    // metas, taxonomies
    if (posts?.length) {
      return this.responseData({
        posts,
        attachments,
      });
    }

    throw new NotFoundException('gallery attachments not found');
  }

  // search
  async search({ q, offset = 0, limit = 20 }: PostSearchQueryParamsDTO) {
    const search = q
      .replace(/([^\w\u0430-\u044f\d\s\-,]+)/gi, '')
      .trim()
      .slice(0, 60)
      .toLowerCase();

    const query = this.postRepository
      .createQueryBuilder('post')
      .where('post_status="publish"')
      .andWhere('(post_type="post" OR post_type="article")')
      .andWhere(
        '(post_title LIKE LOWER(:q) OR post_excerpt LIKE LOWER(:q) OR post_content LIKE LOWER(:q))',
        {
          q: `%${search}%`,
        },
      )
      .orderBy('post_date', 'DESC');

    const posts = await query.offset(offset).limit(limit).getRawMany();

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const attachments = await this.getPostsAttachmentByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData({ posts, metas, attachments, taxonomies });
    }

    throw new NotFoundException('posts not found');
  }

  private async getTaxonomiesByPostsIds(postIds: number[], terms = false) {
    if (Array.isArray(postIds) && postIds.length) {
      let query = this.postRepository
        .createQueryBuilder('post')
        .select('post.ID')
        .innerJoinAndSelect(
          'post.post_taxonomy',
          'taxonomyRel',
          'taxonomyRel.object_id = post.ID',
        );

      if (terms) {
        query = query
          .leftJoinAndSelect('taxonomyRel.taxonomy', 'taxonomy')
          .leftJoinAndSelect('taxonomy.terms', 'terms');
      }

      query = query.where('taxonomyRel.object_id IN (:postIds)', { postIds });

      return query.getRawMany();
    }

    return null;
  }

  private responseData({
    posts,
    metas,
    taxonomies,
    attachments,
    type = 'short',
  }: {
    posts: any[];
    metas?: any[];
    taxonomies?: any[];
    attachments?: any[];
    type?: 'short' | 'full';
  }): PostResponse[] {
    const data = posts.map((post) => {
      const taxonomyId: number[] = post.taxonomyRel_term_taxonomy_id
        ? [Number(post.taxonomyRel_term_taxonomy_id)]
        : [];
      const newPost: PostResponse = {
        id: Number(post.post_ID),
        guid: post.post_guid,
        slug: post.post_post_name,
        type: post.post_post_type,
        title: post.post_post_title,
        content: type === 'full' ? post.post_post_content : '',
        excerpt: post.post_post_excerpt,
        commentStatus: post.post_comment_status,
        commentCount: Number(post.post_comment_count),
        status: post.post_post_status,
        createdAt: post.post_post_date,
        createdDate: formatISODate(post.post_post_date),
        createdTime: formatISOTime(post.post_post_date),
        updatedAt: post.post_post_modified,
        taxonomyId,
        taxonomies: null,
        user: post.user_display_name ?? null,
        sticky: false,
        preview: <ImageWithSizes>{},
        meta: {},
        seo: {
          focusKeyword: null,
          description: null,
        },
        comments: null,
      };

      // meta fields
      if (metas?.length) {
        for (let i = metas.length - 1; i >= 0; --i) {
          const meta = metas[i];
          if (meta.meta_post_id === post.post_ID && meta.meta_meta_value) {
            // sticky
            if (meta.meta_meta_key === 'sticky') {
              newPost.sticky = !!Number(meta.meta_meta_value);
            }

            // yoast seo
            if (meta.meta_meta_key === '_yoast_wpseo_focuskw') {
              newPost.seo.focusKeyword = meta.meta_meta_value;
            }

            if (meta.meta_meta_key === '_yoast_wpseo_metadesc') {
              newPost.seo.description = meta.meta_meta_value;
            }

            // if first letter not _ then this additional meta field
            if (!meta.meta_meta_key.startsWith('_')) {
              newPost.meta = {
                ...newPost.meta,
                [meta.meta_meta_key]: meta.meta_meta_value,
              };
            }
          }

          // remove current item
          if (meta.meta_post_id === post.post_ID) {
            metas.splice(i, 1);
          }
        }
      }

      // taxonomies
      const { taxonomies: postTaxonomies, taxonomyIds } =
        this.getTaxonomiesFromPostData(post.post_ID, taxonomies);

      newPost.taxonomies = postTaxonomies;
      newPost.taxonomyId = [...newPost.taxonomyId, ...taxonomyIds];

      // post attachment - preview
      if (attachments?.length) {
        for (let i = attachments.length - 1; i >= 0; --i) {
          const attachment = attachments[i];

          if (attachment.post_id === post.post_ID) {
            // attachment_metadata
            if (
              attachment.pam_meta_key === '_wp_attachment_metadata' &&
              attachment.pam_meta_value
            ) {
              newPost.preview = {
                ...this.attachmentService.unserializeImageMeta(
                  attachment.pam_meta_value,
                  'wp-content/uploads',
                ),
                description: attachment.meta_description,
                caption: attachment.meta_caption,
              };
            }
            // remove current item
            attachments.splice(i, 1);
          }
        }
      }

      //exist last comment
      if (post.lastComment_comment_ID) {
        newPost.comments = [
          {
            id: Number(post.lastComment_comment_ID),
            postId: Number(post.lastComment_comment_post_ID),
            author: post.lastComment_comment_author,
            createdAt: post.lastComment_comment_date,
            createdDate: formatISODate(post.lastComment_comment_date),
            createdTime: formatISOTime(post.lastComment_comment_date),
            content: null,
          },
        ];
      }

      return newPost;
    });

    return data;
  }

  private getTaxonomiesFromPostData = (postId: number, taxonomies: any[]) => {
    const categories: TaxonomyResponse[] = [];
    const geography: TaxonomyResponse[] = [];
    const tags: TaxonomyResponse[] = [];
    const taxonomyIds: number[] = [];

    // taxonomies fields
    if (postId && taxonomies?.length) {
      for (let i = taxonomies.length - 1; i >= 0; --i) {
        const taxonomy = taxonomies[i];
        if (taxonomy.post_ID === postId) {
          if (taxonomy.taxonomy_taxonomy) {
            const newTaxonomy: TaxonomyResponse = {
              id: Number(taxonomy.terms_term_id) ?? null,
              taxonomyId: Number(taxonomy.taxonomy_term_taxonomy_id),
              taxonomy: taxonomy.taxonomy,
              description: taxonomy.taxonomy_description ?? null,
              parent: Number(taxonomy.taxonomy_parent) ?? null,
              name: taxonomy.terms_name ?? null,
              slug: taxonomy.terms_slug ?? null,
            };

            if (taxonomy.taxonomy_taxonomy === 'category') {
              categories.push(newTaxonomy);
            }

            if (taxonomy.taxonomy_taxonomy === 'post_geography') {
              geography.push(newTaxonomy);
            }

            if (taxonomy.taxonomy_taxonomy === 'post_tag') {
              tags.push(newTaxonomy);
            }
          }

          if (taxonomy.taxonomyRel_term_taxonomy_id) {
            taxonomyIds.push(Number(taxonomy.taxonomyRel_term_taxonomy_id));
          }

          // remove current item
          taxonomies.splice(i, 1);
        }
      }
    }

    return {
      taxonomies: {
        categories,
        geography,
        tags,
      },
      taxonomyIds,
    };
  };

  private async addPostViews(postId: number) {
    const metaViews = await this.metaRepository
      .createQueryBuilder('meta')
      .select()
      .where('meta.post_id=:postId AND meta.meta_key="views"', { postId })
      .getOne();

    if (metaViews) {
      await this.metaRepository.update(
        { post_id: postId, meta_key: 'views' },
        {
          meta_value: String(Number(metaViews.meta_value) + 1),
        },
      );
    } else {
      await this.metaRepository.insert({
        meta_key: 'views',
        post_id: postId,
        meta_value: String(1),
      });
    }
    return metaViews;
  }

  async addPostPollReply(body: AddPollReply) {
    const { postId, pollId, pollKey } = body;
    const postPollFieldName = 'poll_results';

    // exist post
    if (
      !(await this.postRepository.findOneBy({
        ID: postId,
        post_status: 'publish',
      }))
    ) {
      throw new BadRequestException('Post not found');
    }

    // exist poll and poll key
    const poll = await this.postRepository
      .createQueryBuilder('post')
      // .select('post.ID')
      .innerJoinAndSelect(
        'post.meta',
        'meta',
        'meta.post_id = post.ID AND meta.meta_key=:pollKey',
        { pollKey },
      )
      .where('ID=:pollId AND post_type="poll" AND post_status="publish"', {
        pollId,
      })
      .getOne();

    if (!poll) {
      throw new BadRequestException('Poll or poll key not found');
    }

    const metaPost = await this.metaRepository
      .createQueryBuilder('meta')
      .select()
      .where('meta.post_id=:postId AND meta.meta_key=:postPollFieldName', {
        postId,
        postPollFieldName,
      })
      .getOne();

    // exist meta results value
    if (metaPost) {
      const pollValues = JSON.parse(metaPost.meta_value);

      let updatedPollValues: Record<string, number>;

      // exist in metaResults pollId
      if (pollValues[pollId]) {
        const count = pollValues[pollId][pollKey]
          ? Number(pollValues[pollId][pollKey]) + 1
          : 1;

        updatedPollValues = {
          ...pollValues,
          [pollId]: {
            ...pollValues[pollId],
            [pollKey]: count,
          },
        };
      } else {
        updatedPollValues = {
          ...pollValues,
          [pollId]: {
            [pollKey]: 1,
          },
        };
      }

      await this.metaRepository.update(
        {
          post_id: postId,
          meta_key: postPollFieldName,
        },
        {
          meta_value: JSON.stringify(updatedPollValues),
        },
      );

      return {
        post_id: postId,
        results: updatedPollValues[pollId],
      };
    } else {
      const pollValues = {
        [pollId]: {
          [pollKey]: 1,
        },
      };
      await this.metaRepository.insert({
        post_id: postId,
        meta_key: postPollFieldName,
        meta_value: JSON.stringify(pollValues),
      });
      return {
        post_id: postId,
        results: pollValues[pollId],
      };
    }
  }

  // top posts
  async getPostsTop() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.meta', 'meta', 'meta.meta_key="views"')
      .where('post_status = "publish" AND post_type="post"')
      .andWhere('post_date > NOW() - INTERVAL 7 DAY')
      .orderBy('cast(meta.meta_value as unsigned)', 'DESC')
      .limit(5)
      .getRawMany();

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const attachments = await this.getPostsAttachmentByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData({ posts, metas, attachments, taxonomies });
    }

    throw new NotFoundException('posts not found');
  }

  // commented posts
  async getPostsCommented() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect(
        'post.comment',
        'lastComment',
        'lastComment.comment_ID=(SELECT wp_comments.comment_ID FROM wp_comments WHERE wp_comments.comment_post_ID = post.ID ORDER BY wp_comments.comment_date DESC LIMIT 1)',
      )
      .where('post_status = "publish" AND post_type="post"')
      .andWhere('post_date > NOW() - INTERVAL 7 DAY')
      .orderBy('lastComment.comment_date', 'DESC')
      .limit(5)
      .getRawMany();

    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData({ posts, metas, taxonomies });
    }

    throw new NotFoundException('posts not found');
  }

  // interest posts
  async getPostsInterest() {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.meta', 'meta', 'meta.meta_key="interest"')
      .where('post_status = "publish" AND post_type="post"')
      .orderBy('meta.meta_value+0.0', 'DESC')
      .addOrderBy('post_date', 'DESC')
      .limit(4)
      .getRawMany();

    // metas, taxonomies
    if (posts?.length) {
      const postsIds = posts.map((post) => Number(post.post_ID));
      const metas = await this.getPostMetaByIds(postsIds);
      const attachments = await this.getPostsAttachmentByIds(postsIds);
      const taxonomies = await this.getTaxonomiesByPostsIds(postsIds, true);
      return this.responseData({ posts, metas, attachments, taxonomies });
    }

    throw new NotFoundException('posts not found');
  }
}
