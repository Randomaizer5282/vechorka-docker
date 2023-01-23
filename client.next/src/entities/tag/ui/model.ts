import { useCallback, useEffect, useState } from "react";
import { PostProps } from "@/shared/types";
import { getPostsByTaxonomySlug } from "@/shared/api/posts";

interface Props {
  initPosts?: PostProps[];
  limit: number;
  tagSlug: string;
}

export const useTags = ({ initPosts = [], tagSlug, limit }: Props) => {
  const [posts, setPosts] = useState<PostProps[]>(initPosts);
  const [loading, setLoading] = useState(false);

  const addPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await getPostsByTaxonomySlug(tagSlug, {
        taxonomyType: "post_tag",
        relations: { taxonomy: true },
        limit,
        offset: posts.length,
      });

      fetchedPosts?.length > 0 &&
        setPosts((prev) => [...prev, ...fetchedPosts]);
    } catch (error) {
      console.log("tag", error);
    }
    setLoading(false);
  }, [limit, posts.length, tagSlug]);

  useEffect(() => {
    setPosts(initPosts);
  }, [initPosts]);

  return { posts, loading, addPosts };
};
