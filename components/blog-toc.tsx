"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "poyraz-ui/atoms";

type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

function parseHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const raw = match[2].replace(/\*\*/g, "").replace(/\*/g, "").trim();
    const id = raw
      .toLowerCase()
      .replace(/[^a-zçğıöşü0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (id && raw) {
      headings.push({ id, text: raw, level });
    }
  }

  return headings;
}

type BlogTocProps = {
  markdown: string;
  onNavigate?: () => void;
};

export function BlogToc({ markdown, onNavigate }: BlogTocProps) {
  const headings = useMemo(() => parseHeadings(markdown), [markdown]);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleClick = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    onNavigate?.();
  }, [onNavigate]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0.1 },
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as Element[];

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="İçindekiler" className="space-y-1">
      <Typography variant="small" className="mb-2 font-semibold text-foreground">
        İçindekiler
      </Typography>
      {headings.map((heading, index) => (
        <button
          key={`${heading.id}-${index}`}
          type="button"
          onClick={() => handleClick(heading.id)}
          className={[
            "block w-full cursor-pointer truncate border-l-2 text-left text-xs leading-relaxed transition-colors",
            heading.level === 3 ? "pl-5" : "pl-3",
            activeId === heading.id
              ? "border-red-600 text-red-600"
              : "border-transparent text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
}
