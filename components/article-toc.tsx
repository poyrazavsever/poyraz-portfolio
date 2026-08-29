"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "poyraz-ui/atoms";
import { parseMarkdownHeadings } from "@/lib/markdown-headings";

type ArticleTocProps = {
  markdown: string;
  title: string;
  onNavigate?: () => void;
};

export function ArticleToc({ markdown, title, onNavigate }: ArticleTocProps) {
  const headings = useMemo(() => parseMarkdownHeadings(markdown), [markdown]);
  const [activeId, setActiveId] = useState("");
  const rafRef = useRef(0);

  const handleClick = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      onNavigate?.();
    },
    [onNavigate],
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((heading) => ({
        id: heading.id,
        element: document.getElementById(heading.id),
      }))
      .filter((item): item is { id: string; element: HTMLElement } =>
        Boolean(item.element),
      );

    if (headingElements.length === 0) return;

    const updateActive = () => {
      let current = headingElements[0].id;

      for (const item of headingElements) {
        if (item.element.getBoundingClientRect().top <= 120) {
          current = item.id;
          continue;
        }
        break;
      }

      setActiveId(current);
    };

    const observer = new IntersectionObserver(
      () => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateActive);
      },
      {
        rootMargin: "-120px 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    for (const item of headingElements) {
      observer.observe(item.element);
    }

    const timer = window.setTimeout(updateActive, 200);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(timer);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label={title}
      className="max-h-[calc(100vh-7rem)] space-y-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
    >
      <Typography variant="small" className="mb-2 font-semibold text-foreground">
        {title}
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
