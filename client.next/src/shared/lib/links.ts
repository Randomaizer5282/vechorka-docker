import type { PostType } from "@/shared/types";

export const getUrlFromParams = (
  postType: PostType,
  categorySlug?: string,
  postSlug?: string
) => {
  let url = "";

  if (postType === "post") {
    url = "news";
  } else {
    url = postType;
  }

  return `/${url}${categorySlug ? `/${categorySlug}` : ""}${
    postSlug ? `/${postSlug}` : ""
  }`;
};
