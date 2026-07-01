import fs from "fs";
import crypto from "crypto"; // для генерации SHA1
import { PostProps } from "@/shared/types";
import { config } from "@/shared/config";
import { stripText } from "@/shared/lib/string";
import { formatDateGmt } from "@/shared/lib/date";
import * as path from "path";

export const generateYandexRss = async (posts?: PostProps[]) => {
  // Строки для двух версий RSS
  let oldItems = ""; // для rss-news.xml (старый формат)
  let dzenItems = ""; // для rss-dzen.xml (новый формат)

  if (posts?.length) {
    posts.forEach(
      ({ title, slug, preview, createdAt, excerpt, content, taxonomies }) => {
        const taxonomy = taxonomies?.categories[0] || "";
        const url = `${config.siteUrl}/news/${
          taxonomy && taxonomy.slug ? `${taxonomy.slug}/` : ""
        }${slug}`;

        const imgUrl = preview?.url
          ? `${process.env.UPLOAD_HOST}/${preview.url}`
          : "";
        const imgMimeType = preview?.mimeType || "";

        // ---------- Старый формат (без изменений) ----------
        oldItems += `
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

        // ---------- Новый формат для Дзена ----------
        // GUID = SHA1 от URL
        // const guid = crypto.createHash('sha1').update(url).digest('hex');
        const guid = crypto.createHash("sha1").update(url).digest("hex");

        let dzenItem = `
          <item>
            <title>${stripText(title)}</title>
            <link>${url}</link>
            <pdalink>${url}</pdalink>
            <description>${excerpt ? stripText(excerpt) : ""}</description>
            <pubDate>${formatDateGmt(createdAt)}</pubDate>
            <guid>${guid}</guid>
            <category>native-draft</category>`;

        // Полный текст (обёрнут в CDATA, чтобы не ломать XML)
        if (content) {
          dzenItem += `<content:encoded><![CDATA[${content}]]></content:encoded>`;
        }

        // Обложка (если есть)
        if (imgUrl) {
          dzenItem += `<enclosure url="${imgUrl}" type="${imgMimeType}"/>`;
        }

        dzenItem += `</item>`;
        dzenItems += dzenItem;
      }
    );
  }

  // ---------- Старый RSS (rss-news.xml) ----------
  const oldRss = `<?xml version="1.0" encoding="utf-8"?>
  <rss xmlns:yandex="http://news.yandex.ru" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
    <channel>
      <yandex:logo>${config.siteUrl}/images/logo.png</yandex:logo>
      <title>${stripText(config.seo.title)}</title>
      <link>${config.siteUrl}</link>
      <language>ru</language>
      <description>${stripText(config.seo.description)}</description>
      ${oldItems}
    </channel>
  </rss>`;

  // ---------- Новый RSS для Дзена (rss-dzen.xml) ----------
  const dzenRss = `<?xml version="1.0" encoding="utf-8"?>
  <rss xmlns:yandex="http://news.yandex.ru"
       xmlns:media="http://search.yahoo.com/mrss/"
       xmlns:content="http://purl.org/rss/1.0/modules/content/"
       version="2.0">
    <channel>
      <yandex:logo>${config.siteUrl}/images/logo.png</yandex:logo>
      <title>${stripText(config.seo.title)}</title>
      <link>${config.siteUrl}</link>
      <language>ru</language>
      <description>${stripText(config.seo.description)}</description>
      ${dzenItems}
    </channel>
  </rss>`;

  // Запись обоих файлов
  const publicDir = process.cwd();
  const oldPath = path.join(publicDir, "public", "rss-news.xml");
  const dzenPath = path.join(publicDir, "public", "rss-dzen.xml");

  try {
    fs.writeFileSync(oldPath, oldRss, { mode: 0o755 });
    fs.writeFileSync(dzenPath, dzenRss, { mode: 0o755 });
    console.log("RSS файлы успешно обновлены: rss-news.xml и rss-dzen.xml");
  } catch (error) {
    console.log("Ошибка записи RSS:", error);
  }
};
