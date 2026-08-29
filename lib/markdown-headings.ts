export type MarkdownHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function cleanMarkdownHeading(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .trim();
}

export function slugifyMarkdownHeading(text: string) {
  return cleanMarkdownHeading(text)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];

  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const text = cleanMarkdownHeading(match[2]);
    const id = slugifyMarkdownHeading(text);
    if (!id || !text) continue;

    headings.push({
      id,
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}
