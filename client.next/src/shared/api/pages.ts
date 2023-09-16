import { getGeneralSettings } from "@/shared/api/settings";
import { getPostBySlug } from "@/shared/api/posts";
import type { GetStaticPropsResult } from "next";

export const getPage = async ({
  slug,
}: {
  slug?: string;
}): Promise<GetStaticPropsResult<any>> => {
  if (!slug) {
    return {
      notFound: true,
    };
  }

  let posts = { post: null };
  try {
    posts = await getPostBySlug(slug);
  } catch (error) {
    console.log("page", error);
  }

  if (!posts.post) {
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
      post: posts.post,
      settings,
      taxonomies,
    },
  };
};
