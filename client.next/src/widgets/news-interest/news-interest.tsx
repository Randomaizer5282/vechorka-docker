import React, { FC } from "react";
import type { PostProps } from "@/shared/types";
import { ImagePreview } from "@/shared/ui/image-preview";
import { PostCategoryLink } from "@/entities/post/ui/components/post-category-link";
import { PostMeta } from "@/entities/post/ui/components/post-meta";
import { getLink } from "@/shared/lib/links";
import { Heading } from "@/shared/ui/heading";

interface Props {
  posts: PostProps[];
  urlPrefix: string;
}

export const NewsInterest: FC<Props> = ({ posts, urlPrefix }) => {
  if (!posts || !posts.length) return null;

  return (
    <div className="mt-6 md:mt-12">
      <h2 className="mb-7 text-grey-500">Интересное</h2>
      <div className="flex flex-wrap -m-3 sm:-m-2">
        {posts.map(({ id, title, preview, slug, createdAt, taxonomies }) => {
          const categories = taxonomies?.categories;
          const categorySlug =
            categories && categories[0] ? categories[0].slug : "";
          const href = getLink(urlPrefix, categorySlug, slug);

          return (
            <div key={id} className="w-full sm:w-1/2 md:flex-1 p-3 sm:p-2">
              {/* image */}
              <div className="h-[190px] lg:h-[260px] xl:h-[320px]">
                <ImagePreview url={preview?.url} href={href} />
              </div>

              <div className="flex flex-wrap items-center justify-between mt-3">
                {/* category */}
                {categories && (
                  <PostCategoryLink
                    className="mr-2"
                    urlPrefix={urlPrefix}
                    categories={categories}
                  />
                )}
                {/* meta */}
                <PostMeta date={createdAt} />
              </div>

              {/* title */}
              {title && (
                <Heading
                  title={title}
                  href={href}
                  tag="h4"
                  className="mt-3 block"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
