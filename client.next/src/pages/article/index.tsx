import React from "react";
import { PostLayout } from "@/shared/ui/layouts";
import { PostListShowMore } from "@/modules/post/ui/post-list-show-more";
import { type ArticlePosts, getPosts } from "@/shared/api/posts";
import { getGeneralSettings } from "@/shared/api/settings";
import { SEO } from "@/shared/ui/SEO";
import { useSeoFromPathname } from "@/shared/ui/SEO/SEO";
import { type GetStaticProps } from "next";

export interface Props {
  posts: ArticlePosts;
}

const ArticlesIndexPage = ({ posts }: Props) => {
  const { articles } = posts;
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
        left={
          <PostListShowMore
            initPosts={articles.data}
            initCount={articles.count}
            postType="article"
          />
        }
      />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  const posts: ArticlePosts = {
    articles: { data: [], count: 0 },
  };

  try {
    const fetchedArticles = await getPosts({
      postType: "article",
      limit: 13,
      sticky: true,
      relations: { taxonomy: true },
    });

    if (fetchedArticles?.data?.length) {
      posts.articles = fetchedArticles;
    }
  } catch (error) {
    console.log("articles index", error);
  }

  if (!posts.articles?.data?.length) {
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

export default ArticlesIndexPage;
