import fs from "fs";
import { PostProps } from "@/shared/types";
import { settings } from "@/shared/config";
import { stripText } from "@/shared/lib/string";
import { formatDateGmt } from "@/shared/lib/date";
import * as path from "path";

export const generateYandexRss = async (posts?: PostProps[]) => {
  let feeds = "";

  if (posts?.length) {
    posts.map(
      ({ title, slug, preview, createdAt, excerpt, content, taxonomies }) => {
        const taxonomy = taxonomies?.categories[0] || "";
        const url = `${settings.siteUrl}/news/${
          taxonomy && taxonomy.slug ? `${taxonomy.slug}/` : ""
        }${slug}`;

        const imgUrl = preview?.url
          ? `${process.env.UPLOAD_HOST}/${preview.url}`
          : "";

        const imgMimeType =
          preview?.url && preview?.mimeType ? preview.mimeType : "";

        feeds += `
          <item>
            <title>${stripText(title)}</title>
            <link>${url}</link>
            <pdalink>${url}</pdalink>
            <description>${excerpt ? stripText(excerpt) : ""}</description>
            <category>${
              taxonomy && taxonomy.name ? taxonomy.name : ""
            }</category>
            <enclosure url="${imgUrl}" type="${imgMimeType}"/>
            <pubDate>${formatDateGmt(createdAt)}</pubDate>
            <yandex:full-text>${
              content ? stripText(content) : ""
            }</yandex:full-text>
            <yandex:genre>message</yandex:genre>
          </item>`;
      }
    );
  }

  feeds = `<?xml version="1.0" encoding="utf-8"?>
  <rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
    <channel>
      <yandex:logo>${settings.siteUrl}/images/logo.png</yandex:logo>
      <title>${stripText(settings.title)}</title>
      <link>${settings.siteUrl}</link>
      <language>ru</language>
      <description>${stripText(settings.description)}</description>
      ${feeds}
    </channel>
  </rss>`;

  const pathRss = path.join(process.cwd(), "public", "rss");
  const pathRssNews = path.join(pathRss, "yandex-news.xml");
  try {
    if (!fs.existsSync(pathRss)) {
      fs.mkdirSync(pathRss);
    }

    if (fs.existsSync(pathRssNews)) {
      await fs.promises.unlink(pathRssNews);
    }

    fs.writeFileSync(pathRssNews, feeds);
    fs.chown(pathRssNews, 1001, 1001, console.log);
  } catch (error) {
    console.log("rss fs error:", error);
  }
};
