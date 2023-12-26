import { getGeneralSettings } from "@/shared/api/settings";
import { getPostsByTaxonomySlug } from "@/shared/api/posts";
import { TagList } from "@/modules/tag/ui/tag-list";
import { TagLayout } from "@/shared/ui/layouts/tag-layout";
import type { PostProps } from "@/shared/types";
import type { GetServerSideProps } from "next";

interface Props {
  posts: PostProps[];
}

const TagPage = ({ posts }: Props) => {
  return <TagLayout left={<TagList initPosts={posts} />} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  // global settings
  const { settings, taxonomies } = await getGeneralSettings({
    withTaxonomies: true,
  });

  let posts = null;

  try {
    const { data } = await getPostsByTaxonomySlug(slug, {
      taxonomyType: "post_tag",
      limit: 12,
      relations: { taxonomy: true },
    });

    if (data?.length) {
      posts = data;
    }
  } catch (error) {
    // console.log("tag", error);
  }

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      settings,
      taxonomies,
    },
  };
};

export default TagPage;
