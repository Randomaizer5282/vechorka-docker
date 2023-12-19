import type { NextApiRequest, NextApiResponse } from "next";
import { getStaticPaths } from "../[slug]";

const revalidate = async (res: NextApiResponse, path: string) => {
  console.log(`revalidate ${path}`);
  await res.revalidate(path);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.CLIENT_SECRET) {
    console.log(`CLIENT_SECRET not set`);
    return res.status(401).json({ message: "Bad request: invalid token" });
  }

  const { key, type, slug } = req.query;

  if (!key || key !== process.env.CLIENT_SECRET || !type) {
    return res.status(401).json({ message: "Bad request: query" });
  }

  console.log(`api revalidate: ${type}|${slug}`);
  console.log(type, slug);

  try {
    // page by slug
    if (type === "page" && slug) {
      // this should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await revalidate(res, `/${String(slug)}`);
    }
    // post (news)
    if (type === "post") {
      await revalidate(res, "/");
      await revalidate(res, "/news");
    }
    if (type === "article") {
      await revalidate(res, "/");
      await revalidate(res, "/article");
    }
    if (type === "employee") {
      await revalidate(res, "/about");
    }
    if (type === "newspaper") {
      await revalidate(res, "/newspaper");
    }
    // post_category, update all
    if (
      type === "all" ||
      type === "post_category" ||
      type === "post_geography"
    ) {
      const pagePaths = await getStaticPaths();
      for (const pagePath of pagePaths.paths) {
        await revalidate(res, `/${pagePath.params?.slug}`);
      }

      await revalidate(res, "/");
      await revalidate(res, "/news");
      await revalidate(res, "/article");
      await revalidate(res, "/newspaper");
      await revalidate(res, "/contact");
      await revalidate(res, "/about");
    }

    return res.json({ revalidated: true });
  } catch (e) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(e);
  }

  return res.status(401).json({ message: "Revalidate failed" });
}
