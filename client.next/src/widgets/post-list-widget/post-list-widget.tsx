import React, { useEffect, useRef, useState } from "react";
import cn from "clsx";
import type { PostProps } from "@/shared/types";
import { getUrlFromParams } from "@/shared/lib/links";
import { useIntersectionObserver } from "@/shared/lib/hooks/useIntersectionObserver";

interface Props {
  title: string;
  className?: string;
  fetchCallback: () => Promise<PostProps[]>;
  view: ({
    post,
    href,
  }: {
    post: PostProps;
    href: string;
  }) => React.ReactElement;
}

export const PostListWidget = ({
  title,
  className,
  fetchCallback,
  view,
}: Props) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchCallback();
        setPosts(fetchedData);
      } catch (error) {}
    };
    isVisible && fetchData();
  }, [fetchCallback, isVisible]);

  return (
    <div ref={ref}>
      {posts?.length > 0 && (
        <div className={cn(className, "p-6 bg-grey-100")}>
          {title && (
            <div className="pb-4 border-b border-b-grey-200">
              <h4 className="text-grey-500">{title}</h4>
            </div>
          )}
          <div className="divide-y divide-grey-200">
            {posts.map((post) => {
              const categories = post.taxonomies?.categories;
              const categorySlug = categories?.length ? categories[0].slug : "";
              const href = getUrlFromParams(post.type, categorySlug, post.slug);

              return (
                <div key={post.id} className="flex py-4">
                  {view({ post, href })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
