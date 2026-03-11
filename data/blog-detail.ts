import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type BlogDetail = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  coverImage: string;
  markdown: string;
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function toSafeString(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function normalizeSlug(fileName: string) {
  return fileName.replace(/\.md$/i, "");
}

function mapMarkdownToBlogDetail(fileName: string, raw: string): BlogDetail {
  const parsed = matter(raw);
  const slug = normalizeSlug(fileName);

  return {
    slug,
    title: toSafeString(parsed.data.title, slug),
    category: toSafeString(parsed.data.category, "General"),
    date: toSafeString(parsed.data.date, ""),
    readTime: toSafeString(parsed.data.readTime, ""),
    author: toSafeString(parsed.data.author, "Poyraz Avsever"),
    excerpt: toSafeString(parsed.data.excerpt, ""),
    coverImage: toSafeString(parsed.data.coverImage, "/news/design.svg"),
    markdown: parsed.content.trim(),
  };
}

export async function listBlogDetails(): Promise<BlogDetail[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(BLOG_CONTENT_DIR);
  } catch {
    return [];
  }

  const markdownFiles = files.filter((fileName) => fileName.endsWith(".md"));
  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const targetPath = path.join(BLOG_CONTENT_DIR, fileName);
      const raw = await fs.readFile(targetPath, "utf8");
      return mapMarkdownToBlogDetail(fileName, raw);
    }),
  );

  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getBlogDetailBySlug(slug: string): Promise<BlogDetail | null> {
  const safeSlug = slug.trim().toLowerCase();
  if (!safeSlug) return null;

  const targetPath = path.join(BLOG_CONTENT_DIR, `${safeSlug}.md`);

  try {
    const raw = await fs.readFile(targetPath, "utf8");
    return mapMarkdownToBlogDetail(`${safeSlug}.md`, raw);
  } catch {
    return null;
  }
}
