import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Snippet = {
  slug: string;
  title: string;
  language: string;
  category: string;
  description: string;
  markdown: string;
};

const SNIPPETS_DIR = path.join(process.cwd(), "content", "snippets");

export async function listSnippets(): Promise<Snippet[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(SNIPPETS_DIR);
  } catch {
    return [];
  }

  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const snippets = await Promise.all(
    mdFiles.map(async (fileName) => {
      const raw = await fs.readFile(path.join(SNIPPETS_DIR, fileName), "utf8");
      const parsed = matter(raw);
      const slug = fileName.replace(/\.md$/i, "");

      return {
        slug,
        title: String(parsed.data.title || slug),
        language: String(parsed.data.language || "text"),
        category: String(parsed.data.category || "General"),
        description: String(parsed.data.description || ""),
        markdown: parsed.content.trim(),
      };
    }),
  );

  return snippets.sort((a, b) => a.title.localeCompare(b.title));
}
