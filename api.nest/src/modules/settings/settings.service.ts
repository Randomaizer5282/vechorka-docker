import { Injectable } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { TaxonomyService } from '../taxonomy/taxonomy.service';

@Injectable()
export class SettingsService {
  constructor(
    private postService: PostService,
    private taxonomyService: TaxonomyService,
  ) {}

  async getCommon(query) {
    const { withTaxonomies, withInterest, withTop, withCommented, withAdvert } =
      query;

    const taxonomies =
      typeof withTaxonomies !== 'undefined'
        ? await this.taxonomyService.getAllTaxonomiesGroup()
        : null;
    const interest =
      typeof withInterest !== 'undefined'
        ? await this.postService.getPostsInterest()
        : null;
    const top =
      typeof withTop !== 'undefined'
        ? await this.postService.getPostsTop()
        : null;
    const commented =
      typeof withCommented !== 'undefined'
        ? await this.postService.getPostsCommented()
        : null;
    const advert =
      typeof withAdvert !== 'undefined'
        ? await this.postService.getOneLastPostByType({
            postType: 'advert',
          })
        : null;

    return {
      taxonomies,
      interest,
      top,
      commented,
      advert: advert?.meta || null,
    };
  }
}
