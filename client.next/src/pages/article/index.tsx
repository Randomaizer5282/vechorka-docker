import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { PostLayout } from "@/shared/ui/layouts";
import { PostListShowMore } from "@/entities/post/ui/post-list-show-more";
import type { ListPostProps, PostProps } from "@/shared/types";
import { getPosts, getPostsInterest } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";
import { SEO } from "@/shared/ui/SEO";
import { useSeoFromPathname } from "@/shared/ui/SEO/SEO";

export interface Props {
  posts: {
    articles: PostProps[];
    interestNews: PostProps[];
  };
}

const ArticlesIndexPage: NextPage<Props> = ({ posts }) => {
  const { articles, interestNews } = posts;
  const { title, description, url } = useSeoFromPathname();
  return (
    <>
      <SEO
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
        }}
      />
      <PostLayout
        left={<PostListShowMore initPosts={articles} postType="article" />}
        interestPosts={interestNews}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const posts: ListPostProps = {
    articles: [],
    interestNews: [],
  };

  try {
    const { data } = await getPosts({
      postType: "article",
      limit: 13,
      sticky: true,
      relations: { taxonomy: true },
    });

    if (data?.length) {
      posts.articles = data;
    }
  } catch (error) {
    console.log("articles index", error);
  }

  if (!posts.articles?.length) {
    return {
      notFound: true,
    };
  }

  // global settings
  const { settings, taxonomies, advert } = await getGeneralSettings();

  // interest news
  try {
    posts.interestNews = await getPostsInterest();
  } catch (error) {
    console.log("articles index interest", error);
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

export default ArticlesIndexPage;
