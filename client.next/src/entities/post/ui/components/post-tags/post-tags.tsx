import React from "react";
import Link from "next/link";
import { type TaxonomyProps } from "@/shared/types";

interface Props {
  tags: TaxonomyProps[];
}

export const PostTags = ({ tags }: Props) => {
  return (
    <div className="flex flex-wrap -m-1">
      {tags.map((tag, index) => {
        return (
          <div key={index} className="m-1">
            <Link href={`/tag/${tag.slug}`}>
              <a className="block px-3 py-2 text-14px text-grey-500 hover:text-white bg-grey-100 hover:bg-blue-300">
                {tag.name}
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
