import React, { FC, useCallback, useState } from "react";
import { ScrollTabs } from "@/shared/ui/scroll-tabs";
import { FullLoader } from "@/shared/ui/loaders";
import { Button } from "@/shared/ui/buttons";
import type { ListPostProps, PostProps, PostType } from "@/shared/types";
import type { TaxonomyProps } from "@/shared/types";
import router from "next/router";
import { PostItem } from "@/entities/post/ui/post-item";
import { getPosts } from "@/shared/api/posts";
import { messages } from "@/shared/constants";
import { getUrlFromParams } from "@/shared/lib/links";
import cn from "clsx";
import { DynamicAdvert } from "@/widgets/advert";
import { useSettings } from "@/app/contexts/settings-context";

interface Props {
  initPosts: ListPostProps;
  tabs: TaxonomyProps[];
  limit?: number;
  limitMore?: number;
  excludeIds?: string;
  excludeInSlug?: string;
  initCount: number;
}

const LinkToCategory = ({
  categorySlug,
  postType,
}: {
  categorySlug?: string;
  postType: PostType;
}) => {
  const href = getUrlFromParams(postType, categorySlug);
  return (
    <Button variant="outline" onClick={() => router.push(href)}>
      Смотреть все
    </Button>
  );
};

export const NewsCategoriesTabbed: FC<Props> = ({
  initPosts,
  tabs,
  limit = 9,
  limitMore = 3,
  excludeIds,
  excludeInSlug,
  initCount = 0,
}) => {
  const [posts, setPosts] = useState<ListPostProps>(initPosts || {});
  const [activeTab, setActiveTab] = useState<TaxonomyProps>(tabs[0] || {});
  const [countPosts, setCountPost] = useState<number>(initCount);
  const [loading, setLoading] = useState(false);
  const { advert } = useSettings();

  const activePosts: PostProps[] =
    activeTab && posts[activeTab.slug] ? posts[activeTab.slug] : [];

  console.log(countPosts);
  console.log(activePosts.length);

  const changeActiveTab = useCallback(
    async (tab: TaxonomyProps) => {
      if (!posts[tab.slug] && tab.taxonomyId) {
        setLoading(true);
        try {
          const { data, count } = await getPosts({
            postType: "post",
            taxonomyId: tab.taxonomyId,
            limit,
            excludeIds:
              excludeIds && excludeInSlug && tab.slug === excludeInSlug
                ? excludeIds
                : undefined,
            relations: { taxonomy: true },
          });

          if (data?.length) {
            setPosts((prev) => ({ ...prev, [tab.slug]: data }));
          }

          count && setCountPost(count);
        } catch (e) {
          console.log("error: last posts");
        }
        setLoading(false);
      }
      setActiveTab(tab);
    },
    [limit, posts]
  );

  const handleShowMore = async () => {
    if (activeTab) {
      setLoading(true);
      try {
        const { data } = await getPosts({
          postType: "post",
          taxonomyId: activeTab.taxonomyId,
          offset: activePosts?.length ?? 0,
          limit,
          excludeIds:
            excludeIds && excludeInSlug && activeTab.slug === excludeInSlug
              ? excludeIds
              : undefined,
          relations: { taxonomy: true },
        });

        if (data?.length) {
          setPosts((prev) => ({
            ...prev,
            [activeTab.slug]: [...prev[activeTab.slug], ...data],
          }));
        }
      } catch (e) {
        console.log("error: last posts");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* tabs */}
      <ScrollTabs
        tabs={tabs}
        active={activeTab}
        onChange={(tab) => changeActiveTab(tab)}
      />

      {/* advert */}
      {advert && !!Number(advert.advert_block_1_visible) && (
        <DynamicAdvert
          className="mb-5"
          type={advert.advert_block_1_type}
          size="1000x120"
          imageUrl={advert.advert_block_1_image_url}
          href={advert.advert_block_1_href}
          htmlCode={advert.advert_block_1_html_code}
        />
      )}

      {/* posts */}
      <div className="relative flex flex-wrap -m-2">
        {loading && <FullLoader />}
        {activePosts.length > 0 ? (
          activePosts.map((post, index) => {
            const isFirst = index % limit === 0;
            return (
              <PostItem
                key={post.id}
                post={post}
                className={cn(
                  "p-2",
                  isFirst ? "lg:w-1/3" : "sm:w-1/2 lg:w-1/3"
                )}
                imageClassName={isFirst ? "sm:h-[320px] lg:h-[190px]" : ""}
              />
            );
          })
        ) : (
          <div className="p-2">{messages.post.notFound}</div>
        )}
      </div>

      {/* show more button */}
      {activePosts.length > 0 && (
        <div className="mt-3 text-center">
          {/* show button from condition limitMore */}
          {activePosts.length % limit === 0 &&
          activePosts.length < limitMore * limit &&
          activePosts.length < countPosts ? (
            <Button variant="outline" onClick={handleShowMore}>
              Показать еще
            </Button>
          ) : (
            activeTab.slug && (
              <LinkToCategory
                categorySlug={
                  activeTab.slug === "news" ? undefined : activeTab.slug
                }
                postType="post"
              />
            )
          )}
        </div>
      )}
    </>
  );
};
