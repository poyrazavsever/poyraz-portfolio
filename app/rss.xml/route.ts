import { getAllBlogArticles } from "@/data/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";
const FEED_PATH = "/rss.xml";
const FEED_TITLE = "Poyraz Avsever Blog";
const FEED_DESCRIPTION =
  "Poyraz Avsever'in blog yazilari, yazilim notlari ve teknik icerikleri.";

function toAbsoluteUrl(pathOrUrl: string) {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    return new URL(pathOrUrl, SITE_URL).toString();
  }
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRssDate(value: string | undefined) {
  if (!value) return new Date().toUTCString();
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return new Date().toUTCString();
  return new Date(timestamp).toUTCString();
}

export async function GET() {
  const articles = await getAllBlogArticles();
  const feedUrl = toAbsoluteUrl(FEED_PATH);
  const siteUrl = toAbsoluteUrl("/");

  const lastBuildDate = toRssDate(articles[0]?.date);

  const items = articles
    .map((article) => {
      const link = toAbsoluteUrl(article.href);
      const pubDate = toRssDate(article.date);
      const title = escapeXml(article.title);
      const description = escapeXml(article.excerpt || article.title);
      const category = escapeXml(article.category || "General");
      const author = escapeXml(article.author || "Poyraz Avsever");

      return [
        "    <item>",
        `      <title>${title}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <description>${description}</description>`,
        `      <category>${category}</category>`,
        `      <author>hello@poyrazavsever.com (${author})</author>`,
        `      <pubDate>${pubDate}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${siteUrl}</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    "    <language>tr-TR</language>",
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    "    <generator>Next.js RSS Route</generator>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
