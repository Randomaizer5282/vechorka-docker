import React from "react";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { ImagePreview } from "@/shared/ui/image-preview";
import { getPostsTop } from "@/shared/api/posts";
import { Heading } from "@/shared/ui/heading";
import { PostListWidget } from "@/widgets/post-list-widget";

export interface NewsTopProps {
  className?: string;
}

export const NewsTop = ({ className }: NewsTopProps) => {
  return (
    <PostListWidget
      className={className}
      title="Популярные"
      fetchCallback={() => getPostsTop()}
      view={({ post, href }) => (
        <>
          {/* image */}
          <div className="relative w-[60px] min-h-[70px]">
            <ImagePreview
              url={post.preview?.sizes?.thumbnail?.url || post.preview?.url}
              href={href}
            />
          </div>
          {/* content */}
          <div className="flex-1 pl-3">
            {/* meta */}
            <PostMeta
              className="justify-between"
              date={post.createdDate}
              // views={post.meta?.views}
            />
            {/* title */}
            {post.title && (
              <Heading
                title={post.title}
                href={href}
                tag="h6"
                className="pt-2 text-line-clamp-3"
              />
            )}
          </div>
        </>
      )}
    />
  );
};
