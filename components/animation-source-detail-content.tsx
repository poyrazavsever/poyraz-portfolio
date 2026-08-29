"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "poyraz-ui/molecules";
import { ArticleToc } from "@/components/article-toc";
import type { AnimationSource } from "@/data/animation-sources";
import { Link } from "@/i18n/routing";
import { slugifyMarkdownHeading } from "@/lib/markdown-headings";

type AnimationSourceDetailContentProps = {
  source: AnimationSource;
};

function extractText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText(
      (children as React.ReactElement<{ children?: React.ReactNode }>).props
        .children,
    );
  }
  return "";
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function CopyableCodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const t = useTranslations("AnimationSources");
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const displayLanguage = language || "text";
  const highlighterLanguage = language === "prompt" ? "text" : displayLanguage;

  return (
    <Card className="my-4 overflow-hidden rounded-sm border-border">
      <div className="flex h-9 items-center justify-between border-b border-border bg-muted/40 px-3">
        <span className="text-[11px] font-medium uppercase text-muted-foreground">
          {displayLanguage}
        </span>
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={copied ? t("copied") : t("copy")}
              >
                <Icon
                  icon={copied ? "mdi:check" : "mdi:content-copy"}
                  width={15}
                  height={15}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>{copied ? t("copied") : t("copy")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <SyntaxHighlighter
        language={highlighterLanguage}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "13px",
          lineHeight: "1.65",
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </Card>
  );
}

function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src || !src.startsWith("/")) return null;

  return (
    <Card className="my-4 overflow-hidden rounded-sm border-border">
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={1200}
        unoptimized={src.toLowerCase().endsWith(".gif")}
        sizes="(max-width: 768px) 100vw, 720px"
        className="h-auto w-full object-contain"
      />
      {alt ? (
        <Typography
          variant="small"
          className="block border-t border-border px-3 py-2 text-center text-muted-foreground"
        >
          {alt}
        </Typography>
      ) : null}
    </Card>
  );
}

export function AnimationSourceDetailContent({
  source,
}: AnimationSourceDetailContentProps) {
  const t = useTranslations("AnimationSources");
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const closeToc = useCallback(() => setTocOpen(false), []);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const bar = progressBarRef.current;
      if (!bar) return;

      const scrollableHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        scrollableHeight <= 0 ? 100 : (window.scrollY / scrollableHeight) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-border/70">
        <div ref={progressBarRef} className="h-full w-0 bg-red-600" />
      </div>

      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <article className="space-y-6 rounded-sm border border-border p-5 md:p-8">
            <Link
              href="/animation-sources"
              className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon icon="mdi:arrow-left" width={15} height={15} />
              {t("back")}
            </Link>

            <header className="space-y-3 border-b border-border pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-sm">{source.platform}</Badge>
                {source.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="rounded-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
              <Typography variant="h2">{source.title}</Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                {source.excerpt}
              </Typography>
              <Typography variant="small" className="block text-muted-foreground">
                {source.author} · {source.date}
              </Typography>
            </header>

            <section className="min-w-0 space-y-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <Typography
                      id={slugifyMarkdownHeading(extractText(children))}
                      variant="h2"
                      className="mt-10 mb-3 border-b border-border pb-3"
                    >
                      {children}
                    </Typography>
                  ),
                  h2: ({ children }) => (
                    <Typography
                      id={slugifyMarkdownHeading(extractText(children))}
                      variant="h3"
                      className="mt-8 mb-2 scroll-mt-24 border-b border-border pb-2"
                    >
                      {children}
                    </Typography>
                  ),
                  h3: ({ children }) => (
                    <Typography
                      id={slugifyMarkdownHeading(extractText(children))}
                      variant="large"
                      className="mt-6 mb-1 scroll-mt-24 text-foreground"
                    >
                      {children}
                    </Typography>
                  ),
                  p: ({ node, children }) => {
                    const containsImage = node?.children.some(
                      (child) =>
                        child.type === "element" && child.tagName === "img",
                    );

                    if (containsImage) {
                      return <div className="my-4">{children}</div>;
                    }

                    return (
                      <Typography
                        variant="p"
                        className="text-sm leading-7 text-foreground/85"
                      >
                        {children}
                      </Typography>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="my-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-foreground/85">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-3 list-decimal space-y-1.5 pl-5 text-sm leading-7 text-foreground/85">
                      {children}
                    </ol>
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
                    <Card className="my-4 rounded-sm border-border border-l-red-600 bg-muted/30 px-4 py-3">
                      <div className="text-sm text-muted-foreground">{children}</div>
                    </Card>
                  ),
                  hr: () => <div className="my-6 border-t border-border" />,
                  table: ({ children }) => (
                    <Card className="my-4 overflow-x-auto rounded-sm border-border">
                      <table className="min-w-full border-collapse text-sm">
                        {children}
                      </table>
                    </Card>
                  ),
                  th: ({ children }) => (
                    <th className="border-b border-border bg-muted/50 px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-b border-border px-4 py-2.5 align-top text-sm">
                      {children}
                    </td>
                  ),
                  img: ({ src, alt }) => (
                    <MarkdownImage
                      src={typeof src === "string" ? src : undefined}
                      alt={typeof alt === "string" ? alt : undefined}
                    />
                  ),
                  pre: ({ children }) => <>{children}</>,
                  code: ({ className, children }) => {
                    const match = /language-([\w-]+)/.exec(className ?? "");
                    if (!match) {
                      return (
                        <code className="rounded-sm border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[13px] text-red-600">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <CopyableCodeBlock
                        language={match[1]}
                        code={String(children).replace(/\n$/, "")}
                      />
                    );
                  },
                }}
              >
                {source.markdown}
              </ReactMarkdown>
            </section>
          </article>
        </div>

        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-24">
            <ArticleToc markdown={source.markdown} title={t("toc")} />
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setTocOpen(true)}
        className="fixed right-4 bottom-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-lg transition-transform hover:scale-105 active:scale-95 lg:hidden"
        aria-label={t("toc")}
      >
        <Icon icon="mdi:table-of-contents" width={22} height={22} className="text-red-600" />
      </button>

      {tocOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={closeToc}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute right-0 bottom-0 left-0 max-h-[60vh] overflow-y-auto rounded-t-lg border-t border-border bg-background p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <Typography variant="large">{t("toc")}</Typography>
              <button
                type="button"
                onClick={closeToc}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={t("closeToc")}
              >
                <Icon icon="mdi:close" width={18} height={18} />
              </button>
            </div>
            <ArticleToc
              markdown={source.markdown}
              title={t("toc")}
              onNavigate={closeToc}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
