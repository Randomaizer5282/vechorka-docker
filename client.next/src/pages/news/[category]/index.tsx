import React from "react";
import { PostLayout } from "@/shared/ui/layouts";
import { PostListShowMore } from "@/modules/post/ui/post-list-show-more";
import { getPageNewsCategory } from "@/shared/api/page-news-category";
import type { GetServerSideProps } from "next";
import { useSeoDataFromPathname } from "@/shared/lib/seo";
import { type NewsPosts } from "@/shared/api/posts";
import { NextSeo } from "next-seo";

export interface NewsCategoryProps {
  posts: NewsPosts;
}

const NewsCategoryPage = ({ posts }: NewsCategoryProps) => {
  const { news } = posts;
  const { title, description, url } = useSeoDataFromPathname();
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
          type: "website",
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
