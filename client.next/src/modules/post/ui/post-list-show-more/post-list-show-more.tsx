import React, { Fragment, useEffect, useState } from "react";
import { useSettings } from "@/contexts/settings-context";
import { FullLoader } from "@/shared/ui/loaders";
import { messages } from "@/shared/constants";
import { PostItemInside } from "@/modules/post/ui/post-item-inside";
import { DynamicAdvert } from "@/widgets/advert";
import { PostItem } from "@/modules/post/ui/post-item";
import { Button } from "@/shared/ui/buttons";
import type { PostProps, PostType } from "@/shared/types";
import { getPosts } from "@/shared/api/posts";
import { useCommonPosts } from "@/shared/api/settings";

interface Props {
  initPosts: PostProps[];
  initCount: number;
  limit?: number;
  postType: PostType;
  isFirstFull?: boolean;
}

export const PostListShowMore = ({
  initPosts = [],
  limit = 13,
  postType,
  isFirstFull = true,
  initCount = 0,
}: Props) => {
  const [posts, setPosts] = useState(initPosts);
  const [countPosts, setCountPost] = useState<number>(initCount);
  const [loading, setLoading] = useState(false);
  const { common } = useCommonPosts();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, count } = await getPosts({
        postType,
        limit,
        offset: posts.length,
        relations: { taxonomy: true },
      });
      data?.length > 0 && setPosts((prev) => [...prev, ...data]);
      count && setCountPost(count);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPosts(initPosts);
    setCountPost(initCount);
  }, [initPosts]);

  return (
    <>
      <div className="relative flex flex-wrap -m-2">
        {loading && <FullLoader />}
        {!loading && posts.length === 0 && (
          <div className="p-2">{messages.post.notFound}</div>
        )}
        {posts.map((post, index) => {
          const isFirst = index % limit === 0;

          return isFirstFull && isFirst ? (
            <Fragment key={post.id}>
              <PostItemInside
                post={post}
                titleTag="h2"
                className="h-[260px] sm:h-[320px] lg:h-[460px] m-2 mb-6"
              />

              {/* advert */}
              {common?.advert &&
                index === 0 &&
                !!Number(common.advert.advert_block_1_visible) && (
                  <DynamicAdvert
                    className="mb-5"
                    type={common.advert.advert_block_1_type}
                    size="1000x120"
                    imageUrl={common.advert.advert_block_1_image_url}
                    href={common.advert.advert_block_1_href}
                    htmlCode={common.advert.advert_block_1_html_code}
                  />
                )}
            </Fragment>
          ) : (
            <PostItem
              key={post.id}
              post={post}
              className="p-2 sm:w-1/2 lg:w-1/3"
            />
          );
        })}
      </div>

      {/*
      show more button, news.length % limit - condition for detect last news,
      if not a full array, then last news
      */}
      {posts?.length > 0 &&
        posts.length % limit === 0 &&
        posts.length < countPosts && (
          <div className="mt-3 text-center">
            <Button variant="outline" onClick={fetchPosts}>
              Показать еще
            </Button>
          </div>
        )}
    </>
  );
};
