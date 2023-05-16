import React from "react";
import { HomeLayout } from "@/shared/ui/layouts";
import { NewsCategoriesTabbed } from "@/widgets/news-categories-tabbed";
import { ArticleLast } from "@/widgets/article-last";
import { getGeneralSettings } from "@/shared/api/settings";
import { getHomePosts, getPosts } from "@/shared/api/posts";
import type { TaxonomiesProps, TaxonomyProps } from "@/shared/types";
import type { ListPostProps, PostProps } from "@/shared/types";
import { menuAllNewsItem, menuMainNewsItem } from "@/shared/config";
import { NewsCategoriesGridTabbed } from "@/widgets/news-categories-grid-tabbed";
import { PostRelated } from "@/widgets/post-related";
import { GetStaticProps } from "next";
import { generateYandexRss } from "@/shared/lib/yandex-rss";

interface HomeProps {
  posts: {
    mainNews: PostProps[];
    lastNews: PostProps[];
    interestNews: PostProps[];
    articles: PostProps[];
  };
  taxonomies: TaxonomiesProps;
}

const HomePage = ({ posts, taxonomies }: HomeProps) => {
  const { mainNews, lastNews, interestNews, articles } = posts;
  const geographyTabs = [
    menuMainNewsItem as TaxonomyProps,
    ...taxonomies?.geography,
  ];
  const categoriesTabs = [
    menuAllNewsItem as TaxonomyProps,
    ...taxonomies?.categories,
  ];

  const mainNewsIds = mainNews.map((post) => post.id).join(",");

  return (
    <>
      {mainNews && geographyTabs && (
        <NewsCategoriesGridTabbed
          initPosts={{ news: mainNews }}
          tabs={geographyTabs}
          defaultActiveSlug="news"
        />
      )}
      <HomeLayout
        left={
          <>
            {lastNews && (
              <NewsCategoriesTabbed
                initPosts={{ news: lastNews }}
                tabs={categoriesTabs}
                excludeIds={mainNewsIds}
                excludeInSlug="news"
              />
            )}
            {articles && <ArticleLast posts={articles} />}
          </>
        }
      />
      {/*<VideoLastSliderDynamic />*/}
      {interestNews && <PostRelated title="Интересное" posts={interestNews} />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let posts: ListPostProps = {
    mainNews: [],
    lastNews: [],
    interestNews: [],
    articles: [],
  };

  try {
    posts = await getHomePosts();
  } catch (error) {
    console.log("error: posts/index: ", error);
  }

  const { settings, taxonomies, advert } = await getGeneralSettings();

  try {
    const { data } = await getPosts({
      postType: "post",
      limit: 20,
      relations: { taxonomy: true, content: true },
    });
    generateYandexRss(data);
  } catch (error) {
    console.log("error: get rss posts: ", error);
  }

  return {
    props: {
      posts,
      taxonomies,
      settings,
      advert,
    },
    revalidate: 60,
  };
};

export default HomePage;
