import { useCallback, useState } from "react";
import type { PostProps } from "@/shared/types";
import { searchPosts } from "@/shared/api/search";

interface Props {
  initPosts?: PostProps[];
  limit: number;
  query: string;
}

export const useSearch = ({ initPosts = [], query, limit }: Props) => {
  const [posts, setPosts] = useState<PostProps[]>(initPosts);
  const [loading, setLoading] = useState(false);

  const addPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await searchPosts(query, {
        limit,
        offset: posts.length,
      });
      fetchedPosts?.length > 0 &&
        setPosts((prev) => [...prev, ...fetchedPosts]);
    } catch (error) {
      console.log("search", error);
    }
    setLoading(false);
  }, [limit, posts.length, query]);

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPosts = await searchPosts(query, {
        limit,
      });
      fetchedPosts?.length > 0 ? setPosts(fetchedPosts) : setPosts([]);
    } catch (error) {
      setPosts([]);
      console.log("search", error);
    }
    setLoading(false);
  }, [limit, query]);

  return { posts, loading, getPosts, addPosts };
};
