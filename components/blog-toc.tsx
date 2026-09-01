"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import {
  Button,
  ButtonIcon,
  ButtonLabel,
  Typography,
} from "poyraz-ui/atoms";

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
  showTitle?: boolean;
};

export function BlogToc({
  markdown,
  onNavigate,
  showTitle = true,
}: BlogTocProps) {
  const t = useTranslations("Blog");
  const headings = useMemo(() => parseHeadings(markdown), [markdown]);
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

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate?.();
  }, [onNavigate]);

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
        root: null,
        rootMargin: "-120px 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    for (const item of headingElements) {
      observer.observe(item.element);
    }

    const timer = setTimeout(updateActive, 200);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label={t("toc")}
      className="max-h-[calc(100dvh-7rem)] space-y-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
    >
      {showTitle ? (
        <Typography
          variant="small"
          className="mb-2 font-semibold text-foreground"
        >
          {t("toc")}
        </Typography>
      ) : null}
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
      <div className="mt-3 border-t border-border pt-3">
        <Button
          type="button"
          variant="outline"
          size="xs"
          radius="sm"
          effect="swap"
          swapTarget="both"
          onClick={handleBackToTop}
          className="w-full justify-between"
        >
          <ButtonLabel>{t("backToTop")}</ButtonLabel>
          <ButtonIcon>
            <Icon icon="mdi:arrow-up" width={14} height={14} />
          </ButtonIcon>
        </Button>
      </div>
    </nav>
  );
}
