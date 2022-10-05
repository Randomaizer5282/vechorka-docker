import React from "react";
import Link from "next/link";
import { TaxonomyProps } from "@/types";
import cn from "clsx";

interface PostLinkCategoryProps {
  categories: TaxonomyProps[];
  className?: string;
  parentSlug?: string;
  color?: "light" | "dark";
  variant?: "button";
}

export const PostLinkCategory = ({
  categories,
  className,
  parentSlug = "",
  color = "dark",
  variant,
}: PostLinkCategoryProps) => {
  if (!categories.length) return null;

  return (
    <div
      className={cn(
        className,
        "relative flex flex-wrap w-fit space-x-3 text-sm-10 pointer-events-auto",
        {
          "link-light": color === "light",
        }
      )}
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${parentSlug}/${category.slug}`}
          prefetch={false}
        >
          <a
            className={cn({
              "py-2 px-3 bg-grey-450 hover:bg-blue-300": variant === "button",
            })}
          >
            {category.name}
          </a>
        </Link>
      ))}
    </div>
  );
};