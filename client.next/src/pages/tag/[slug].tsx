import { getGeneralSettings } from "@/shared/api/settings";
import { getPostsByTaxonomySlug, getPostsInterest } from "@/shared/api/posts";
import { TagList } from "@/entities/tag/ui/tag-list";
import { TagLayout } from "@/shared/ui/layouts/tag-layout";
import type { PostProps } from "@/shared/types";
import type { GetServerSideProps } from "next";

interface Props {
  posts: PostProps[];
  interestNews: PostProps[];
}

const TagPage = ({ posts, interestNews }: Props) => {
  return (
    <TagLayout
      left={<TagList initPosts={posts} />}
      interestPosts={interestNews}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

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
    console.log("tag", error);
  }

  if (!posts) {
    return {
      notFound: true,
    };
  }

  // interest news
  let interestNews: PostProps[] = [];
  try {
    interestNews = await getPostsInterest();
  } catch (error) {
    console.log("tag interest", error);
  }

  return {
    props: {
      posts,
      interestNews,
      settings,
      taxonomies,
      advert,
    },
  };
};

export default TagPage;
