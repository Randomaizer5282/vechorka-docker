import React from "react";
import { Heading } from "@/shared/ui/heading";
import { useRouter } from "next/router";
import { messages } from "@/shared/constants";
import { getSeoTitle, useSeoDataFromPathname } from "@/shared/lib/seo";
import { FullLoader } from "@/shared/ui/loaders";
import { PostItem } from "@/modules/post/ui/post-item";
import { Button } from "@/shared/ui/buttons";
import type { PostProps } from "@/shared/types";
import { useTags } from "@/modules/tag/ui/use-tags";
import { NextSeo } from "next-seo";
import { TaxonomyProps } from "@/shared/types";

interface Props {
  initPosts: PostProps[];
  taxonomy: TaxonomyProps;
}

const limit = 12;

export const TagList = ({ initPosts = [], taxonomy }: Props) => {
  const router = useRouter();
  const tagSlug = router.query.slug || "";
  const termName = taxonomy?.terms?.name;
  const { posts, loading, addPosts } = useTags({
    initPosts,
    tagSlug: tagSlug as string,
    limit,
  });

  const title = getSeoTitle({ path: "tag", title: termName });
  const { description, url } = useSeoDataFromPathname();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url,
        }}
      />
      <Heading
        className="text-grey-500 mb-5"
        tag="h1"
        title={`Публикации по тегу: ${termName ?? ""}`}
      />

      <div className="relative flex flex-wrap -m-2">
        {loading && <FullLoader />}
        {!loading && posts.length === 0 && (
          <div className="p-2">{messages.post.notFound}</div>
        )}
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            className="p-2 sm:w-1/2 lg:w-1/3"
          />
        ))}
      </div>

      {/* show more button */}
      {posts?.length > 0 && posts.length % limit === 0 && (
        <div className="mt-3 text-center">
          <Button variant="outline" onClick={addPosts}>
            Показать еще
          </Button>
        </div>
      )}
    </>
  );
};
