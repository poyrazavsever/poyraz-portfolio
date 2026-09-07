import "server-only";

export type SubstackPublication = "agenda" | "blog";

const SUBSTACK_PUBLICATIONS: Record<
  SubstackPublication,
  { origin: string; medium: string }
> = {
  agenda: {
    origin: "https://yazilimadair.substack.com",
    medium: "agenda",
  },
  blog: {
    origin: "https://poyrazavsever.substack.com",
    medium: "blog",
  },
};

const TRUSTED_IMAGE_HOSTS = new Set([
  "miro.medium.com",
  "substackcdn.com",
  "substack-post-media.s3.amazonaws.com",
]);

export type SubstackPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  author: string;
  url: string;
  readingMinutes: number;
};

function unwrapCdata(value: string) {
  return value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function decodeXmlEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"',
    nbsp: " ",
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, key: string) => {
    if (key.startsWith("#")) {
      const isHex = key[1]?.toLowerCase() === "x";
      const codePoint = Number.parseInt(key.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : entity;
    }

    return namedEntities[key.toLowerCase()] ?? entity;
  });
}

function getTag(xml: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"),
  );

  return match ? unwrapCdata(match[1]) : "";
}

function stripHtml(value: string) {
  return decodeXmlEntities(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function getEnclosureUrl(xml: string) {
  const enclosure = xml.match(/<enclosure\b[^>]*>/i)?.[0] ?? "";
  const url = enclosure.match(/\burl=(?:"([^"]+)"|'([^']+)')/i);
  const value = decodeXmlEntities(url?.[1] ?? url?.[2] ?? "");

  try {
    const imageUrl = new URL(value);
    const isTrustedHost = TRUSTED_IMAGE_HOSTS.has(imageUrl.hostname);
    return imageUrl.protocol === "https:" && isTrustedHost ? imageUrl.toString() : "";
  } catch {
    return "";
  }
}

function getSafeSubstackUrl(value: string, publication: SubstackPublication) {
  const config = SUBSTACK_PUBLICATIONS[publication];

  try {
    const url = new URL(decodeXmlEntities(value));
    if (url.protocol !== "https:" || url.origin !== config.origin) {
      return null;
    }

    url.searchParams.set("utm_source", "poyrazavsever.com");
    url.searchParams.set("utm_medium", config.medium);
    return url.toString();
  } catch {
    return null;
  }
}

function getReadingMinutes(html: string) {
  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function parseSubstackFeed(
  xml: string,
  publication: SubstackPublication,
): SubstackPost[] {
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return itemBlocks.flatMap((item) => {
    const url = getSafeSubstackUrl(getTag(item, "link"), publication);
    const title = decodeXmlEntities(getTag(item, "title"));
    const publishedAt = getTag(item, "pubDate");

    if (!url || !title || !publishedAt) return [];

    const content = getTag(item, "content:encoded");
    const excerpt = stripHtml(getTag(item, "description"));
    const slug = new URL(url).pathname.split("/").filter(Boolean).at(-1) ?? url;

    return [
      {
        id: `substack-${slug}`,
        title,
        excerpt,
        image: getEnclosureUrl(item) || "/news/design.svg",
        publishedAt,
        author: decodeXmlEntities(getTag(item, "dc:creator")) || "Poyraz Avsever",
        url,
        readingMinutes: getReadingMinutes(content || excerpt),
      },
    ];
  });
}

export async function getSubstackPosts(
  publication: SubstackPublication = "agenda",
) {
  const config = SUBSTACK_PUBLICATIONS[publication];
  const response = await fetch(`${config.origin}/feed`, {
    headers: {
      Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
    },
    next: { revalidate: 30 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Substack RSS request failed with ${response.status}`);
  }

  return parseSubstackFeed(await response.text(), publication);
}
