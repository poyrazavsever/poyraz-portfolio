import { marked } from "marked";
import { isNewsletterCategory } from "@/data/blog";
import { listBlogDetails, type BlogDetail } from "@/data/blog-detail";
import { SITE_URL, getLocalizedUrl } from "@/lib/seo";

const FEED_PATH = "/substack-import.xml";
const FEED_TITLE = "Poyraz Avsever — Türkçe Blog Arşivi";
const FEED_DESCRIPTION =
  "Poyraz Avsever'in Türkçe, newsletter dışındaki uzun biçimli blog yazıları.";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapCdata(value: string) {
  return `<![CDATA[${value.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

function toRssDate(value: string | undefined) {
  const timestamp = value ? Date.parse(value) : Number.NaN;
  return Number.isNaN(timestamp)
    ? new Date(0).toUTCString()
    : new Date(timestamp).toUTCString();
}

function toAbsoluteContentUrl(value: string) {
  try {
    return new URL(value, `${SITE_URL}/`).toString();
  } catch {
    return value;
  }
}

function stripDuplicateTitle(markdown: string, title: string) {
  const lines = markdown.trimStart().split("\n");
  const firstLine = lines[0]?.trim() ?? "";
  const markdownTitle = firstLine
    .replace(/^#\s+/, "")
    .replace(/[*_`]/g, "")
    .trim();

  if (firstLine.startsWith("# ") && markdownTitle === title.trim()) {
    return lines.slice(1).join("\n").trimStart();
  }

  return markdown;
}

function renderPostHtml(post: BlogDetail) {
  const markdown = stripDuplicateTitle(post.markdown, post.title);
  const html = marked.parse(markdown, {
    async: false,
    gfm: true,
  });

  return html.replace(
    /\b(src|href)=("|')\/(?!\/)(.*?)\2/gi,
    (_match, attribute: string, quote: string, path: string) =>
      `${attribute}=${quote}${toAbsoluteContentUrl(`/${path}`)}${quote}`,
  );
}

function getImageMimeType(url: string) {
  const pathname = (() => {
    try {
      return new URL(url, `${SITE_URL}/`).pathname.toLowerCase();
    } catch {
      return url.toLowerCase();
    }
  })();

  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".gif")) return "image/gif";
  if (pathname.endsWith(".avif")) return "image/avif";
  return "image/jpeg";
}

export async function GET() {
  const posts = (await listBlogDetails("tr"))
    .filter((post) => !isNewsletterCategory(post.category))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const feedUrl = new URL(FEED_PATH, `${SITE_URL}/`).toString();

  const items = posts
    .map((post) => {
      const link = getLocalizedUrl("tr", `/blog/${post.slug}`);
      const image = toAbsoluteContentUrl(post.coverImage);

      return [
        "    <item>",
        `      <title>${wrapCdata(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${wrapCdata(post.excerpt || post.title)}</description>`,
        `      <content:encoded>${wrapCdata(renderPostHtml(post))}</content:encoded>`,
        `      <dc:creator>${wrapCdata(post.author)}</dc:creator>`,
        `      <category>${wrapCdata(post.category || "General")}</category>`,
        `      <pubDate>${toRssDate(post.date)}</pubDate>`,
        `      <enclosure url="${escapeXml(image)}" length="0" type="${getImageMimeType(image)}" />`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${wrapCdata(FEED_TITLE)}</title>`,
    `    <link>${escapeXml(SITE_URL)}</link>`,
    `    <description>${wrapCdata(FEED_DESCRIPTION)}</description>`,
    "    <language>tr-TR</language>",
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${toRssDate(posts[0]?.date)}</lastBuildDate>`,
    "    <generator>Next.js Substack Import Feed</generator>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
