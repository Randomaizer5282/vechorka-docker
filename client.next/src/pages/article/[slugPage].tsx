import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PostDetail } from "@/modules/post/ui/post-detail";
import { getPostBySlug } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";

interface Props {
  posts: { post: PostProps; relatedPosts: PostProps[] | null };
}

const ArticleDetailPage = ({ posts }: Props) => {
  return (
    <PostLayout
      left={posts.post ? <PostDetail post={posts.post} showComment /> : null}
      relatedPosts={posts.relatedPosts}
      showNewsWidgets={false}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slugPage as string;

  let posts = { post: null, relatedPosts: null };

  try {
    posts = await getPostBySlug(slug, {
      postType: "article",
      withRelatedPosts: true,
    });
  } catch (error) {
    console.log("article detail post", error);
  }

  if (!posts || !posts.post) {
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
      settings,
      taxonomies,
      posts,
    },
  };
};

export default ArticleDetailPage;
