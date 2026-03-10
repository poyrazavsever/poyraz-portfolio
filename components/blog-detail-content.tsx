"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import type { BlogDetail } from "@/data/blog-detail";

type BlogDetailContentProps = {
  post: BlogDetail;
};

function MermaidBlock({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let mounted = true;

    const renderChart = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "loose" });
        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        if (mounted) {
          setSvg(rendered);
          setError("");
        }
      } catch {
        if (mounted) {
          setError("Mermaid diagram could not be rendered.");
        }
      }
    };

    void renderChart();
    return () => {
      mounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <Card className="rounded-sm border-border p-3">
        <Typography variant="small" className="text-red-600">
          {error}
        </Typography>
      </Card>
    );
  }

  if (!svg) {
    return (
      <Card className="rounded-sm border-border p-3">
        <Typography variant="small" className="text-muted-foreground">
          Rendering diagram...
        </Typography>
      </Card>
    );
  }

  return (
    <Card className="overflow-x-auto rounded-sm border-border p-3">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </Card>
  );
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const progressWidth = useMemo(() => `${Math.min(100, Math.max(0, progress))}%`, [progress]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const scrollable = el.scrollHeight - el.clientHeight;
    if (scrollable <= 0) {
      setProgress(100);
      return;
    }

    setProgress((el.scrollTop / scrollable) * 100);
  };

  return (
    <div
      ref={scrollerRef}
      onScroll={handleScroll}
      className="relative h-full overflow-y-auto rounded-sm border border-border"
    >
      <div className="sticky top-0 z-20 h-1 w-full bg-border">
        <div
          className="h-full bg-red-600 transition-[width] duration-100"
          style={{ width: progressWidth }}
        />
      </div>

      <article className="space-y-5 p-5 md:p-6">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to blog
        </Link>

        <header className="space-y-3">
          <Badge className="rounded-sm">{post.category}</Badge>
          <Typography variant="h2" className="leading-tight">
            {post.title}
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            {post.author} - {post.date} - {post.readTime}
          </Typography>
          <Typography variant="p" className="text-muted-foreground">
            {post.excerpt}
          </Typography>
        </header>

        <Card className="relative aspect-[16/8] overflow-hidden rounded-sm border-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Card>

        <section className="space-y-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <Typography variant="h3" className="mt-6">
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography variant="large" className="mt-4 text-foreground">
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <Typography variant="p" className="text-sm leading-relaxed">
                  {children}
                </Typography>
              ),
              li: ({ children }) => (
                <li className="ml-5 list-disc text-sm leading-relaxed text-foreground">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-red-600 pl-3 text-sm text-muted-foreground">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="my-3 overflow-x-auto rounded-sm border border-border">
                  <table className="min-w-full border-collapse text-sm">{children}</table>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-muted/40">{children}</thead>,
              tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
              th: ({ children }) => (
                <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 align-top text-foreground">{children}</td>
              ),
              code: ({ className, children }) => {
                const match = /language-(\w+)/.exec(className ?? "");
                const codeText = String(children).replace(/\n$/, "");
                const language = match?.[1] ?? "";

                if (!match) {
                  return (
                    <code className="rounded-sm bg-muted px-1.5 py-0.5 text-[13px]">
                      {children}
                    </code>
                  );
                }

                if (language === "mermaid") {
                  return <MermaidBlock chart={codeText} />;
                }

                return (
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      borderRadius: "0.25rem",
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                    showLineNumbers
                  >
                    {codeText}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {post.markdown}
          </ReactMarkdown>
        </section>
      </article>
    </div>
  );
}
