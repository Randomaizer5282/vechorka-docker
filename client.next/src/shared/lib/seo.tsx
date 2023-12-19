import { useRouter } from "next/router";
import { useSettings } from "@/contexts/settings-context";
import { config } from "@/shared/config";

export type PostBasePath = "news" | "article" | "search" | "tag" | "newspaper";

export const getSeoTitle = ({
  title,
  path,
}: {
  title?: string;
  path?: PostBasePath;
}) => {
  let category = "";
  const seoTitle = [];

  if (path === "news") {
    category = "Новости";
  }

  if (path === "article") {
    category = "Статьи";
  }

  if (path === "search") {
    category = "Поиск";
  }

  if (path === "newspaper") {
    category = "Архив номеров";
  }

  if (path === "tag") {
    category = "Публикации по тегу";
  }

  if (title) {
    seoTitle.push(title);
  }

  if (category) {
    seoTitle.push(category);
  }

  seoTitle.push(config.seo.title);

  return seoTitle.join(" | ");
};

export const useSeoDataFromPathname = () => {
  const settings = useSettings();
  const router = useRouter();
  const basePath = router.pathname.split("/")[1];
  const categorySlug = router.query.category;

  let title;
  let description;

  if (categorySlug) {
    const taxonomy = [
      ...settings.taxonomies.categories,
      ...settings.taxonomies.geography,
    ].find((tax) => tax.slug === categorySlug);
    title = getSeoTitle({
      title: taxonomy?.name,
      path: basePath as PostBasePath,
    });
    description = taxonomy?.description;
  } else if (basePath === "news") {
    const taxonomy = settings.taxonomies.allCategories.find(
      (tax) => tax.slug === basePath
    );
    title = getSeoTitle({
      path: basePath as PostBasePath,
    });
    description = taxonomy?.description;
  } else {
    title = getSeoTitle({
      path: basePath as PostBasePath,
    });
  }

  return {
    title,
    description,
    url: `${settings.siteUrl}/${basePath}${
      categorySlug ? `/${categorySlug}` : ""
    }`,
  };
};
