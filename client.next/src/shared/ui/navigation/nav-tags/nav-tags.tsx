import React from "react";
import Link from "next/link";
import cn from "clsx";
import { useSettings } from "@/app/contexts/settings-context";
import { useRouter } from "next/router";

interface Props {
  className?: string;
}

export const NavTags = ({ className }: Props) => {
  const { taxonomies } = useSettings();
  const tags = taxonomies?.tags;
  const router = useRouter();

  return (
    <div className={cn(className, "p-3 bg-grey-100")}>
      <div className="mb-3 text-16px font-bold">Теги:</div>
      <div className="flex flex-wrap gap-2 text-13px">
        {tags.map(({ id, name, slug, count }) => {
          if (count && count > 1) {
            return (
              <Link key={id} href={`/tag/${slug}`}>
                <a
                  className={cn(
                    "flex items-center px-3 py-2 text-white hover:text-white hover:bg-blue-300",
                    slug === router.query.slug ? "bg-blue-300" : "bg-blue-100"
                  )}
                >
                  <span>
                    {name} ({count})
                  </span>
                </a>
              </Link>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
