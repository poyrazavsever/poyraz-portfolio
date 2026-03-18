"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  Input,
  Typography,
} from "poyraz-ui/atoms";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "poyraz-ui/molecules";
import {
  LINK_DIRECTORY,
  LINK_DIRECTORY_CATEGORIES,
  SOCIAL_LINKS,
  TOP_ICON_LINKS,
  type LinkDirectoryCategory,
} from "@/lib/links";

type CategoryFilter = "all" | LinkDirectoryCategory;

const FILTER_ITEMS: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: "all", label: "Tüm kategoriler" },
  ...LINK_DIRECTORY_CATEGORIES,
];

const CATEGORY_LABELS = Object.fromEntries(
  LINK_DIRECTORY_CATEGORIES.map((item) => [item.id, item.label]),
) as Record<(typeof LINK_DIRECTORY_CATEGORIES)[number]["id"], string>;

const CATEGORY_ORDER = {
  resources: 0,
  navigation: 1,
  social: 2,
} as const;

const DIRECTORY_ITEMS = [...LINK_DIRECTORY].sort((left, right) => {
  const categoryCompare = CATEGORY_ORDER[left.category] - CATEGORY_ORDER[right.category];
  if (categoryCompare !== 0) {
    return categoryCompare;
  }

  return left.label.localeCompare(right.label, "tr");
});

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatHref(href: string) {
  if (href.startsWith("mailto:")) {
    return href.replace("mailto:", "");
  }

  if (href.startsWith("/")) {
    return `poyrazavsever.com${href}`;
  }

  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function LinksContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

    return DIRECTORY_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      if (queryTokens.length === 0) {
        return true;
      }

      const haystack = normalize(
        [item.label, item.href, CATEGORY_LABELS[item.category], ...item.keywords].join(" "),
      );

      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [activeCategory, query]);

  return (
    <section className="relative isolate min-h-dvh overflow-hidden px-4 py-8 sm:px-6 sm:py-10">

      <div className="relative mx-auto flex w-full max-w-xl justify-center">
        <Card className="w-full overflow-hidden rounded-[28px] border-border/80 bg-background/95 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur">
          <div className="relative aspect-1878/410 overflow-hidden border-b border-border/70">
            <img
              src="/logo/cover.png"
              alt="Poyraz Avsever kapak görseli"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent" />
          </div>

          <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
            <div className="-mt-14 flex flex-col gap-4">
              <Avatar className="h-24 w-24 rounded-[28px] border-4 border-background bg-background shadow-lg sm:h-28 sm:w-28">
                <AvatarImage src="/logo/logo.jpeg" alt="Poyraz Avsever" />
                <AvatarFallback className="rounded-3xl bg-muted text-lg font-semibold">
                  PA
                </AvatarFallback>
              </Avatar>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Typography variant="h2" className="text-[1.75rem] leading-none sm:text-[2rem]">
                    Poyraz
                  </Typography>
                  <Typography
                    variant="h2"
                    secondaryFont
                    className="text-[1.75rem] leading-none text-red-600 sm:text-[2rem]"
                  >
                    Avsever
                  </Typography>
                </div>

                <Typography variant="small" className="max-w-lg text-sm leading-6 text-muted-foreground">
                  Burada sosyal hesaplarım, portfolyo sayfalarım ve hızlı erişim linklerimin
                  tamamı tek yerde duruyor. Direkt açıp paylaşabilirsin.
                </Typography>
              </div>

              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-red-600/40 hover:text-foreground"
                  >
                    <Icon icon={item.icon} width={18} height={18} />
                  </Link>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {TOP_ICON_LINKS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="block"
                  >
                    <Card className="rounded-2xl border-border bg-muted/35 p-3 transition-all hover:-translate-y-0.5 hover:border-red-600/40 hover:bg-background">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground">
                          <Icon icon={item.icon} width={18} height={18} />
                        </span>
                        <div className="min-w-0">
                          <Typography variant="large" className="truncate text-base">
                            {item.label}
                          </Typography>
                          <Typography
                            variant="small"
                            className="truncate text-xs text-muted-foreground"
                          >
                            {formatHref(item.href)}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <Typography variant="large" className="text-base">
                    Tüm Linkler
                  </Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    Sayfalar, kaynaklar ve sosyal profiller
                  </Typography>
                </div>

                <div className="grid gap-2 sm:grid-cols-[190px_1fr]">
                  <Select
                    value={activeCategory}
                    onValueChange={(value) => setActiveCategory(value as CategoryFilter)}
                  >
                    <SelectTrigger className="h-11 rounded-2xl border-border bg-background px-4 text-sm">
                      <SelectValue placeholder="Kategori seç" />
                    </SelectTrigger>
                    <SelectContent>
                      {FILTER_ITEMS.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Link ara... github, medium, /blog"
                    aria-label="Linklerde arama"
                    className="h-11 rounded-2xl"
                  />
                </div>

                <div className="grid gap-2">
                  {filteredItems.map((item) => (
                    <Link
                      key={`${item.category}-${item.id}`}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="block"
                    >
                      <Card className="rounded-2xl border-border p-3 transition-all hover:-translate-y-0.5 hover:border-red-600/40">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/35 text-muted-foreground">
                            <Icon icon={item.icon} width={18} height={18} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Typography variant="large" className="text-base leading-tight">
                                {item.label}
                              </Typography>
                              <span className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">
                                {CATEGORY_LABELS[item.category]}
                              </span>
                            </div>

                            <Typography
                              variant="small"
                              className="mt-1 truncate text-xs text-muted-foreground"
                            >
                              {formatHref(item.href)}
                            </Typography>
                          </div>

                          <span className="text-muted-foreground">
                            <Icon
                              icon={item.external ? "mdi:arrow-top-right" : "mdi:arrow-right"}
                              width={18}
                              height={18}
                            />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}

                  {filteredItems.length === 0 ? (
                    <Card className="rounded-2xl border-border px-4 py-5">
                      <Typography variant="small" className="text-muted-foreground">
                        Seçili filtreye uygun link bulunamadı.
                      </Typography>
                    </Card>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
