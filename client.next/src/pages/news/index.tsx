import React from "react";
import { getPageNewsCategory } from "@/shared/api/page-news-category";
import type { NewsCategoryProps } from "@/pages/news/[category]";
import NewsCategoryPage from "@/pages/news/[category]";
import { type GetStaticProps } from "next";

const NewsIndexPage = ({ posts }: NewsCategoryProps) => {
  return <NewsCategoryPage posts={posts} />;
};

// export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  return await getPageNewsCategory({ slugTaxonomy: "news" });
};

export default NewsIndexPage;
