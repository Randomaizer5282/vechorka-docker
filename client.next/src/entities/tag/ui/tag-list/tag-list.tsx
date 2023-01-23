import React from "react";
import { Heading } from "@/shared/ui/heading";
import { useRouter } from "next/router";
import { messages } from "@/shared/constants";
import { SEO, useSeoFromPathname } from "@/shared/ui/SEO/SEO";
import { FullLoader } from "@/shared/ui/loaders";
import { PostItem } from "@/entities/post/ui/post-item";
import { Button } from "@/shared/ui/buttons";
import type { PostProps } from "@/shared/types";
import { useSettings } from "@/app/contexts/settings-context";
import { useTags } from "@/entities/tag/ui/model";
import { NavTags } from "@/shared/ui/navigation/nav-tags";

interface Props {
  initPosts: PostProps[];
}

const limit = 12;

export const TagList = ({ initPosts = [] }: Props) => {
  const router = useRouter();
  const tagSlug = router.query.slug || "";
  const { posts, loading, addPosts } = useTags({
    initPosts,
    tagSlug: tagSlug as string,
    limit,
  });

  const { taxonomies } = useSettings();
  const { title, description, url } = useSeoFromPathname();
  const taxonomy = taxonomies.tags.find((t) => t.slug === tagSlug);

  return (
    <>
      <SEO
        title={`${title} ${taxonomy?.name ?? ""}`}
        description={description}
        openGraph={{
          title: `${title} ${taxonomy?.name ?? ""}`,
          description,
          url,
        }}
      />
      <Heading
        className="text-grey-500 mb-5"
        tag="h1"
        title={`Публикации по тегу: ${taxonomy?.name ?? ""}`}
      />

      <div className="mb-5">
        <NavTags />
      </div>

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
