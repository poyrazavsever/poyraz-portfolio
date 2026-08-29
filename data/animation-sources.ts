import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type AnimationSourceLocale = "tr" | "en";

export type AnimationSource = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  platform: string;
  tools: string[];
  date: string;
  author: string;
  markdown: string;
  lang: AnimationSourceLocale;
};

const ANIMATION_SOURCES_DIR = path.join(
  process.cwd(),
  "content",
  "animation-sources",
);

function toSafeString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeFileSlug(fileName: string) {
  return fileName.replace(/\.(tr|en)\.md$/i, "").replace(/\.md$/i, "");
}

function normalizeLocale(value: unknown): AnimationSourceLocale {
  return value === "en" ? "en" : "tr";
}

function mapMarkdownToAnimationSource(
  fileName: string,
  raw: string,
): AnimationSource {
  const parsed = matter(raw);
  const fallbackSlug = normalizeFileSlug(fileName);

  return {
    slug: toSafeString(parsed.data.slug, fallbackSlug),
    title: toSafeString(parsed.data.title, fallbackSlug),
    excerpt: toSafeString(parsed.data.excerpt),
    coverImage: toSafeString(
      parsed.data.coverImage,
      "/media/cursor-portrait/poyraz-bottom-right-poster.webp",
    ),
    platform: toSafeString(parsed.data.platform, "Web"),
    tools: toStringArray(parsed.data.tools),
    date: toSafeString(parsed.data.date),
    author: toSafeString(parsed.data.author, "Poyraz Avsever"),
    markdown: parsed.content.trim(),
    lang: normalizeLocale(parsed.data.lang),
  };
}

function toTimestamp(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function listAnimationSources(
  locale?: string,
): Promise<AnimationSource[]> {
  let files: string[];

  try {
    files = await fs.readdir(ANIMATION_SOURCES_DIR);
  } catch {
    return [];
  }

  const sources = await Promise.all(
    files
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const raw = await fs.readFile(
          path.join(ANIMATION_SOURCES_DIR, fileName),
          "utf8",
        );
        return mapMarkdownToAnimationSource(fileName, raw);
      }),
  );

  return sources
    .filter((source) => !locale || source.lang === locale)
    .sort((a, b) => {
      const dateDifference = toTimestamp(b.date) - toTimestamp(a.date);
      return dateDifference || a.title.localeCompare(b.title);
    });
}

export async function getAnimationSourceBySlug(
  slug: string,
  locale: string,
): Promise<AnimationSource | null> {
  const safeSlug = slug.trim().toLowerCase();
  if (!safeSlug) return null;

  const sources = await listAnimationSources(locale);
  return sources.find((source) => source.slug.toLowerCase() === safeSlug) ?? null;
}
