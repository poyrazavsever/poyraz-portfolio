"use client";

import { useState } from "react";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import type { Snippet } from "@/data/snippets";

type SnippetsContentProps = {
  snippets: Snippet[];
  categories: string[];
};

function extractCode(markdown: string) {
  const match = /```\w*\n([\s\S]*?)```/.exec(markdown);
  return match ? match[1].trim() : markdown;
}

export function SnippetsContent({ snippets, categories }: SnippetsContentProps) {
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All"
    ? snippets
    : snippets.filter((s) => s.category === selected);

  return (
    <section className="flex h-full flex-col gap-3 overflow-y-auto">
      <Card className="rounded-sm border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h3">
              Kod <span className="font-secondary text-red-600">Parçacıkları</span>
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              Sıkça kullandığım, tekrar kullanılabilir kod parçacıkları.
            </Typography>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setSelected(cat)}>
                <Badge
                  variant={cat === selected ? "default" : "outline"}
                  className="cursor-pointer rounded-sm"
                >
                  {cat}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <StaggerContainer className="grid gap-3 md:grid-cols-2">
        {filtered.map((snippet) => (
          <StaggerItem key={snippet.slug}>
            <Card className="flex h-full flex-col rounded-sm border-border">
              <div className="flex items-start justify-between gap-2 p-4 pb-2">
                <div>
                  <Typography variant="large" className="text-base leading-tight">
                    {snippet.title}
                  </Typography>
                  <Typography variant="small" className="mt-1 text-muted-foreground">
                    {snippet.description}
                  </Typography>
                </div>
                <Badge variant="outline" className="shrink-0 rounded-sm">
                  {snippet.language}
                </Badge>
              </div>
              <div className="flex-1 px-4 pb-4">
                <SyntaxHighlighter
                  language={snippet.language}
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: "0.25rem",
                    margin: 0,
                    fontSize: "0.8125rem",
                  }}
                  showLineNumbers
                >
                  {extractCode(snippet.markdown)}
                </SyntaxHighlighter>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <Card className="rounded-sm border-border p-5">
          <Typography variant="p" className="text-muted-foreground">
            Bu kategoride henüz snippet bulunmuyor.
          </Typography>
        </Card>
      )}
    </section>
  );
}
