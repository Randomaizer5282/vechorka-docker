import React from "react";
import { PostLayout } from "@/shared/ui/layouts";
import { PostListShowMore } from "@/entities/post/ui/post-list-show-more";
import { getPageNewsCategory } from "@/shared/api/page-news-category";
import type { GetServerSideProps } from "next";
import { SEO, useSeoFromPathname } from "@/shared/ui/SEO/SEO";
import { type NewsPosts } from "@/shared/api/posts";

export interface NewsCategoryProps {
  posts: NewsPosts;
}

const NewsCategoryPage = ({ posts }: NewsCategoryProps) => {
  const { news, interestNews } = posts;
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
            initPosts={news.data}
            initCount={news.count}
            postType="post"
          />
        }
        interestPosts={interestNews}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let category = params?.category;
  // news slug taxonomy is exist in base, example news/news - is work, condition for exclude this category
  category = category && category === "news" ? undefined : (category as string);

  return await getPageNewsCategory({ slugTaxonomy: category });
};

export default NewsCategoryPage;
