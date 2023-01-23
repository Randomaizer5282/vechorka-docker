import React from "react";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { getUrlFromParams } from "@/shared/lib/links";
import cn from "clsx";
import { Heading } from "@/shared/ui/heading";
import type { HeadingTagType } from "@/shared/ui/heading";
import type { PostProps } from "@/shared/types";

interface Props {
  post: PostProps;
  className?: string;
  titleTag: HeadingTagType;
}

export const PostItemSimple = ({ post, className, titleTag }: Props) => {
  const { title, slug, createdDate, meta, taxonomies, commentCount, type } =
    post;
  const views = meta?.views || null;
  const categories = taxonomies?.categories;
  const categorySlug = categories?.length ? categories[0].slug : "";
  const href = getUrlFromParams(type, categorySlug, slug);

  return (
    <div className={cn("flex", className)}>
      <div>
        {/* title */}
        {title && <Heading title={title} href={href} tag={titleTag} />}

        {/* meta info */}
        <PostMeta
          className="mt-2"
          date={createdDate}
          views={views}
          commentCount={commentCount}
        />
      </div>
    </div>
  );
};
