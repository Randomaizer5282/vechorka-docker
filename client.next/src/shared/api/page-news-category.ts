import { getGeneralSettings } from "@/shared/api/settings";
import {
  getPosts,
  getPostsByTaxonomySlug,
  NewsPosts,
} from "@/shared/api/posts";
import type { GetServerSidePropsResult } from "next";

export const getPageNewsCategory = async ({
  slugTaxonomy,
}: {
  slugTaxonomy?: string;
}): Promise<GetServerSidePropsResult<any>> => {
  const posts: NewsPosts = {
    news: { data: [], count: 0 },
  };

  if (!slugTaxonomy) {
    return {
      notFound: true,
    };
  }

  //news by slug
  try {
    // all news
    if (slugTaxonomy === "news") {
      const fetchedNews = await getPosts({
        postType: "post",
        limit: 13,
        relations: { taxonomy: true },
      });

      if (fetchedNews?.data?.length) {
        posts.news = fetchedNews;
      }
      // from taxonomy news
    } else {
      // find taxonomy in categories and geography
      // const taxonomy = [...taxonomies.categories, ...taxonomies.geography].find(
      //   (t) => t.slug === slugTaxonomy
      // );

      const fetchedNews = await getPostsByTaxonomySlug(slugTaxonomy, {
        postType: "post",
        taxonomyType: ["category", "post_geography"],
        limit: 13,
        relations: { taxonomy: true },
      });

      if (fetchedNews?.data?.length) {
        posts.news = fetchedNews;
      }
    }
  } catch (error) {
    // console.log("news category taxonomy slug", error);
  }

  if (!posts.news?.data?.length) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies } = await getGeneralSettings({
    withTaxonomies: true,
  });

  return {
    props: {
      posts,
      settings,
      taxonomies,
    },
  };
};
