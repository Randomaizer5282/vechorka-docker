import { getGeneralSettings } from "@/shared/api/settings";
import { getPostsByTaxonomySlug } from "@/shared/api/posts";
import { TagList } from "@/modules/tag/ui/tag-list";
import { TagLayout } from "@/shared/ui/layouts/tag-layout";
import type { PostProps, TaxonomyProps } from "@/shared/types";
import type { GetServerSideProps } from "next";
import { getTaxonomyBySlug } from "@/shared/api/taxonomies";

interface Props {
  posts: PostProps[];
  taxonomy: TaxonomyProps;
}

const TagPage = ({ posts, taxonomy }: Props) => {
  return <TagLayout left={<TagList initPosts={posts} taxonomy={taxonomy} />} />;
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
      taxonomyType: ["post_tag"],
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

  let taxonomy = null;
  try {
    const data = await getTaxonomyBySlug(slug, {
      taxonomyType: ["post_tag"],
    });
    taxonomy = data;
  } catch (error) {
    // console.log("tag", error);
  }

  return {
    props: {
      posts,
      taxonomy,
      settings,
      taxonomies,
    },
  };
};

export default TagPage;
