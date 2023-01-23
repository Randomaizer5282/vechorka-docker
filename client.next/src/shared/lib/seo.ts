import { PostBasePath } from "@/shared/types";

export const getSeoTitleByPath = (
  basePath: PostBasePath,
  addedText?: string
) => {
  let title = "";

  if (basePath === "news") {
    title = "Новости";
  }

  if (basePath === "article") {
    title = "Статьи";
  }

  if (basePath === "search") {
    title = "Поиск:";
  }

  if (basePath === "tag") {
    title = "Публикации по тегу:";
  }

  return `${title}${addedText ? ` / ${addedText}` : ""}`;
};
