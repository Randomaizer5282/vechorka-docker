import React from "react";
import Link from "next/link";
import cn from "clsx";
import { getUrlFromParams } from "@/shared/lib/links";
import type { PostType, TaxonomyProps } from "@/shared/types";

interface Props {
  categories: TaxonomyProps[];
  className?: string;
  color?: "light" | "dark";
  variant?: "button";
  postType: PostType;
}

export const PostCategoryLink = ({
  categories,
  className,
  color = "dark",
  variant,
  postType,
}: Props) => {
  if (!categories.length) return null;
  return (
    <div
      className={cn(className, "relative flex flex-wrap w-fit text-sm-10", {
        "link-light": color === "light",
      })}
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          href={
            category.slug === "news"
              ? `/${category.slug}`
              : getUrlFromParams(postType, category.slug)
          }
          prefetch={false}
          className={cn("mr-2", {
            "py-2 px-3 mt-1 bg-grey-450 hover:bg-blue-300":
              variant === "button",
          })}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};
