import React, { useState } from "react";
import { Heading } from "@/shared/ui/heading";
import { useRouter } from "next/router";
import { SearchForm } from "@/modules/search/ui/search-form";
import { messages } from "@/shared/constants";
import { getSeoTitle, useSeoDataFromPathname } from "@/shared/lib/seo";
import { FullLoader } from "@/shared/ui/loaders";
import { PostItem } from "@/modules/post/ui/post-item";
import { Button } from "@/shared/ui/buttons";
import { useSearch } from "@/modules/search/model";
import { NextSeo } from "next-seo";

const limit = 18;

export const SearchList = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const q = router.query.q || "";
  const { posts, loading, getPosts, addPosts } = useSearch({
    query: q as string,
    limit,
  });

  if (q !== query) {
    getPosts();
    setQuery(q as string);
  }

  const title = getSeoTitle({ path: "search", title: query });
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
        title={`Поиск: ${query}`}
      />
      <div className="mb-5">
        <SearchForm defaultValue={query} />
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
