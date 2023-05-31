import { Fragment, PropsWithChildren } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSettings } from "@/app/contexts/settings-context";
import type { PostBasePath } from "@/shared/types";

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

export const useSeoFromPathname = () => {
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
    title = getSeoTitleByPath(basePath as PostBasePath, taxonomy?.name);
    description = taxonomy?.description;
  } else if (basePath === "news") {
    const taxonomy = settings.taxonomies.allCategories.find(
      (tax) => tax.slug === basePath
    );
    title = getSeoTitleByPath(basePath as PostBasePath);
    description = taxonomy?.description;
  } else {
    title = getSeoTitleByPath(basePath as PostBasePath);
  }

  return {
    title,
    description,
    url: `${settings.siteUrl}/${basePath}${
      categorySlug ? `/${categorySlug}` : ""
    }`,
  };
};

interface OgImage {
  url?: string;
  width?: string;
  height?: string;
  alt?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    type?: string;
    locale?: string;
    description?: string;
    site_name?: string;
    url?: string;
    image?: OgImage;
  };
}

export const SEO = ({
  title,
  description,
  keywords,
  openGraph,
  robots,
  children,
}: SEOProps & PropsWithChildren) => {
  const router = useRouter();
  const settings = useSettings();

  const getTitle = (pageTitle?: string) => {
    const siteTitle = settings?.title || "";

    // home page
    if (router.pathname === "/") {
      return pageTitle || siteTitle;
    }
    // other pages
    return pageTitle ? `${pageTitle} / ${siteTitle}` : siteTitle;
  };

  const ogImage = openGraph?.image || settings?.openGraph?.image;

  // The `key` property makes the tag is only rendered once,
  return (
    <Head>
      <title key="title">{getTitle(title)}</title>
      <meta
        key="description"
        name="description"
        content={description || settings?.description || ""}
      />
      <meta
        key="keywords"
        name="keywords"
        content={keywords || settings?.keywords || ""}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.type || settings?.openGraph?.type}
      />
      <meta key="og:title" property="og:title" content={getTitle(title)} />
      <meta
        key="og:description"
        property="og:description"
        content={
          openGraph?.description ||
          description ||
          settings?.openGraph?.description ||
          settings?.description ||
          ""
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name || settings?.openGraph?.site_name || ""}
      />
      <meta
        key="og:url"
        property="og:url"
        content={
          openGraph?.url || settings?.openGraph?.url || settings?.siteUrl || ""
        }
      />
      <meta
        key="og:locale"
        property="og:locale"
        content={settings?.openGraph?.locale || ""}
      />
      {ogImage ? (
        <Fragment key="og:image">
          {ogImage.url && (
            <meta
              key="twitter:card"
              name="twitter:card"
              content="summary_large_image"
            />
          )}
          {ogImage.url && (
            <meta
              key="og:image:url"
              property="og:image"
              content={ogImage.url}
            />
          )}
          {ogImage.width && (
            <meta
              key="og:image:width"
              property="og:image:width"
              content={ogImage.width}
            />
          )}
          {ogImage.height && (
            <meta
              key="og:image:height"
              property="og:image:height"
              content={ogImage.height}
            />
          )}
          {ogImage.alt && (
            <meta
              key="og:image:alt"
              property="og:image:alt"
              content={ogImage.alt}
            />
          )}
        </Fragment>
      ) : null}
      <meta key="robots" name="robots" content={robots || "index,follow"} />
      {children}
    </Head>
  );
};
