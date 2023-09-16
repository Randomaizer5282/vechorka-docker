import React from "react";
import type { GetServerSideProps } from "next";
import type { PostProps } from "@/shared/types";
import { PostLayout } from "@/shared/ui/layouts";
import { PostDetail } from "@/modules/post/ui/post-detail";
import { getPostBySlug } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";
import { PostRelated } from "@/widgets/post-related";

interface Props {
  posts: { post: PostProps | null; relatedPosts: PostProps[] | null };
}

const ArticlesDetailPage = ({ posts }: Props) => {
  return (
    <>
      <PostLayout
        left={posts.post ? <PostDetail post={posts.post} showComment /> : null}
        showNewsWidgets={false}
      />
      {posts.relatedPosts && (
        <PostRelated title="Статьи из раздела" posts={posts.relatedPosts} />
      )}
      {/*{interestNews.length > 0 && (*/}
      {/*  <PostRelated title="Интересное" posts={interestNews} />*/}
      {/*)}*/}
    </>
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

export default ArticlesDetailPage;
