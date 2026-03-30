import { SnippetsContent } from "@/components/snippets-content";
import { listSnippets } from "@/data/snippets";

export default async function SnippetsPage() {
  const snippets = await listSnippets();
  const categories = ["All", ...new Set(snippets.map((s) => s.category))];

  return <SnippetsContent snippets={snippets} categories={categories} />;
}
