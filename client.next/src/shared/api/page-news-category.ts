import { getGeneralSettings } from "@/shared/api/settings";
import {
  getPosts,
  getPostsByTaxonomySlug,
  getPostsInterest,
} from "@/shared/api/posts";
import type { GetServerSidePropsResult } from "next";
import type { ListPostProps } from "@/shared/types";

export const getPageNewsCategory = async ({
  slugTaxonomy,
}: {
  slugTaxonomy?: string;
}): Promise<GetServerSidePropsResult<any>> => {
  const posts: ListPostProps = {
    news: [],
    interestNews: [],
  };

  if (!slugTaxonomy) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

  //news by slug
  try {
    // all news
    if (slugTaxonomy === "news") {
      const { data } = await getPosts({
        postType: "post",
        limit: 13,
        relations: { taxonomy: true },
      });

      if (data?.length) {
        posts.news = data;
      }
      // from taxonomy news
    } else {
      // find taxonomy in categories and geography
      const taxonomy = [...taxonomies.categories, ...taxonomies.geography].find(
        (t) => t.slug === slugTaxonomy
      );

      const { data } = await getPostsByTaxonomySlug(slugTaxonomy, {
        postType: "post",
        taxonomyType: taxonomy?.taxonomy,
        limit: 13,
        relations: { taxonomy: true },
      });

      if (data?.length) {
        posts.news = data;
      }
    }
  } catch (error) {
    console.log("news category taxonomy slug", error);
  }

  if (!posts.news?.length) {
    return {
      notFound: true,
    };
  }

  // interest news
  try {
    posts.interestNews = await getPostsInterest();
  } catch (error) {
    console.log("category interest", error);
  }

  return {
    props: {
      posts,
      settings,
      taxonomies,
      advert,
    },
  };
};
