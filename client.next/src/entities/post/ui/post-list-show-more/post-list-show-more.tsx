import React, { Fragment, useEffect, useState } from "react";
import { useSettings } from "@/app/contexts/settings-context";
import { FullLoader } from "@/shared/ui/loaders";
import { messages } from "@/shared/constants";
import { PostItemInside } from "@/entities/post/ui/post-item-inside";
import { DynamicAdvert } from "@/widgets/advert";
import { PostItem } from "@/entities/post/ui/post-item";
import { Button } from "@/shared/ui/buttons";
import type { PostProps, PostType } from "@/shared/types";
import { getPosts } from "@/shared/api/posts";

interface Props {
  initPosts: PostProps[];
  limit?: number;
  postType: PostType;
  isFirstFull?: boolean;
}

export const PostListShowMore = ({
  initPosts = [],
  limit = 13,
  postType,
  isFirstFull = true,
}: Props) => {
  const [posts, setPosts] = useState(initPosts);
  const [loading, setLoading] = useState(false);
  const { advert } = useSettings();

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
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPosts(initPosts);
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
              {advert &&
                index === 0 &&
                !!Number(advert.advert_block_1_visible) && (
                  <DynamicAdvert
                    className="mb-5"
                    type={advert.advert_block_1_type}
                    size="1000x120"
                    imageUrl={advert.advert_block_1_image_url}
                    href={advert.advert_block_1_href}
                    htmlCode={advert.advert_block_1_html_code}
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
      {posts?.length > 0 && posts.length % limit === 0 && (
        <div className="mt-3 text-center">
          <Button variant="outline" onClick={fetchPosts}>
            Показать еще
          </Button>
        </div>
      )}
    </>
  );
};
