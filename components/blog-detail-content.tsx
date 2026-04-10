"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import type { BlogDetail } from "@/data/blog-detail";
import { BlogToc } from "@/components/blog-toc";
import { GiscusComments } from "@/components/giscus-comments";

type BlogDetailContentProps = {
  post: BlogDetail;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/[^a-zçğıöşü0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}

function MermaidBlock({ chart }: { chart: string }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
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
          setError("Mermaid diyagramı oluşturulamadı.");
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
          Diyagram hazırlanıyor...
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

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || "";
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "";
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "Announcements";
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "";

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [tocOpen, setTocOpen] = useState(false);

  const closeToc = useCallback(() => setTocOpen(false), []);

  useEffect(() => {
    const update = () => {
      const bar = progressBarRef.current;
      if (!bar) return;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight <= 0 ? 100 : (window.scrollY / docHeight) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  const showGiscus = GISCUS_REPO && GISCUS_REPO_ID && GISCUS_CATEGORY_ID;

  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-border/70">
        <div ref={progressBarRef} className="h-full w-0 bg-red-600" />
      </div>

      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <article className="space-y-5 rounded-sm border border-border p-5 md:p-8">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {"<- Blog'a dön"}
            </Link>

            <header className="space-y-3">
              <Badge className="rounded-sm">{post.category}</Badge>
              <Typography variant="h2" className="leading-tight">
                {post.title}
              </Typography>
              <Typography variant="small" className="text-muted-foreground">
                {post.author} · {post.date} · {post.readTime}
              </Typography>
              <Typography variant="p" className="text-muted-foreground">
                {post.excerpt}
              </Typography>
            </header>

            <Card className="relative aspect-16/8 overflow-hidden rounded-sm border-border">
              <img
                src={post.coverImage}
                alt={post.title}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </Card>

            <section className="space-y-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return (
                      <Typography variant="h2" className="mt-10 mb-3 border-b border-border pb-3" id={id}>
                        {children}
                      </Typography>
                    );
                  },
                  h2: ({ children }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return (
                      <Typography variant="h3" className="mt-8 mb-2 border-b border-border pb-2" id={id}>
                        {children}
                      </Typography>
                    );
                  },
                  h3: ({ children }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return (
                      <Typography variant="large" className="mt-6 mb-1 text-foreground" id={id}>
                        {children}
                      </Typography>
                    );
                  },
                  h4: ({ children }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return (
                      <Typography variant="p" className="mt-4 mb-1 font-semibold text-foreground" id={id}>
                        {children}
                      </Typography>
                    );
                  },
                  p: ({ node, children, ...props }) => {
                    const hasImg = node?.children?.some((c: any) => c.tagName === "img");
                    if (hasImg) {
                      return (
                        <div className="text-sm leading-7 text-foreground/85 [&:not(:first-child)]:mt-6" {...props}>
                          {children}
                        </div>
                      );
                    }
                    return (
                      <Typography variant="p" className="text-sm leading-7 text-foreground/85" {...props}>
                        {children}
                      </Typography>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="my-2 space-y-1.5 pl-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-2 space-y-1.5 pl-1 list-decimal list-inside">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2 text-sm leading-7 text-foreground/85">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-red-600 underline decoration-red-600/30 underline-offset-2 transition-colors hover:decoration-red-600"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <Card className="my-4 rounded-sm border-l-3 border-l-red-600 border-border bg-muted/30 px-4 py-3">
                      <div className="text-sm text-muted-foreground [&_p]:text-muted-foreground">
                        {children}
                      </div>
                    </Card>
                  ),
                  hr: () => (
                    <div className="my-6 border-t border-border" />
                  ),
                  table: ({ children }) => (
                    <Card className="my-4 overflow-hidden rounded-sm border-border">
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">{children}</table>
                      </div>
                    </Card>
                  ),
                  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
                  tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
                  th: ({ children }) => (
                    <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2.5 align-top text-sm text-foreground">{children}</td>
                  ),
                  img: ({ src, alt }) => (
                    <Card className="my-4 overflow-hidden rounded-sm border-border">
                      <img src={src} alt={alt || ""} className="w-full object-cover" />
                      {alt && (
                        <div className="px-3 py-2">
                          <Typography variant="small" className="text-center text-muted-foreground">
                            {alt}
                          </Typography>
                        </div>
                      )}
                    </Card>
                  ),
                  code: ({ className, children }) => {
                    const match = /language-(\w+)/.exec(className ?? "");
                    const codeText = String(children).replace(/\n$/, "");
                    const language = match?.[1] ?? "";

                    if (!match) {
                      return (
                        <code className="rounded-sm border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[13px] text-red-600">
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
                          marginTop: "0.75rem",
                          marginBottom: "0.75rem",
                          fontSize: "0.8125rem",
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

            {showGiscus && (
              <section className="border-t border-border pt-6">
                <Typography variant="h3" className="mb-4">
                  Yorumlar
                </Typography>
                <GiscusComments
                  repo={GISCUS_REPO}
                  repoId={GISCUS_REPO_ID}
                  category={GISCUS_CATEGORY}
                  categoryId={GISCUS_CATEGORY_ID}
                />
              </section>
            )}
          </article>
        </div>

        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-24">
            <BlogToc markdown={post.markdown} />
          </div>
        </aside>
      </div>

      {/* Mobil İçindekiler Butonu */}
      <button
        type="button"
        onClick={() => setTocOpen(true)}
        className="fixed right-4 bottom-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-lg transition-transform hover:scale-105 active:scale-95 lg:hidden"
        aria-label="İçindekiler"
      >
        <Icon icon="mdi:table-of-contents" width={22} height={22} className="text-red-600" />
      </button>

      {/* Mobil İçindekiler Drawer */}
      {tocOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={closeToc}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute right-0 bottom-0 left-0 max-h-[60vh] overflow-y-auto rounded-t-xl border-t border-border bg-background p-5 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <Typography variant="large">İçindekiler</Typography>
              <button
                type="button"
                onClick={closeToc}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon icon="mdi:close" width={18} height={18} />
              </button>
            </div>
            <BlogToc markdown={post.markdown} onNavigate={closeToc} />
          </div>
        </div>
      )}
    </>
  );
}
