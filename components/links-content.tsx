"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Typography,
} from "poyraz-ui/atoms";
import { Tabs, TabsList, TabsTrigger } from "poyraz-ui/molecules";
import {
  LINK_DIRECTORY,
  LINK_DIRECTORY_CATEGORIES,
  type LinkDirectoryCategory,
} from "@/lib/links";

type CategoryFilter = "all" | LinkDirectoryCategory;

const FILTER_ITEMS: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: "all", label: "Tümü" },
  ...LINK_DIRECTORY_CATEGORIES,
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getCategoryLabel(category: LinkDirectoryCategory) {
  return LINK_DIRECTORY_CATEGORIES.find((item) => item.id === category)?.label ?? "Kategori";
}

export function LinksContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLinks = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

    return LINK_DIRECTORY.filter((item) => {
      const categoryMatch = activeCategory === "all" || item.category === activeCategory;
      if (!categoryMatch) return false;
      if (queryTokens.length === 0) return true;

      const haystack = normalize([
        item.label,
        item.href,
        ...item.keywords,
        getCategoryLabel(item.category),
      ].join(" "));

      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [activeCategory, query]);

  const handleCopy = async (id: string, href: string) => {
    try {
      await navigator.clipboard.writeText(href);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 1400);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section className="flex h-full flex-col gap-3 overflow-y-auto">
      <Card className="rounded-sm border-border p-4">
        <CardHeader className="space-y-1 p-0">
          <CardTitle className="text-xl">Link Merkezi</CardTitle>
          <CardDescription>
            Tüm sosyal medya, sayfa ve kaynak linklerini tek yerden ara, filtrele ve yönet.
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 space-y-3 p-0">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Linklerde ara... (örn: github, medium, /blog)"
              aria-label="Linklerde arama"
            />
            <Badge variant="outline" className="inline-flex h-10 items-center px-3">
              {filteredLinks.length} / {LINK_DIRECTORY.length} sonuç
            </Badge>
          </div>

          <Tabs
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as CategoryFilter)}
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              {FILTER_ITEMS.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {filteredLinks.length === 0 ? (
        <Card className="rounded-sm border-border p-5">
          <Typography variant="small" className="text-muted-foreground">
            Arama kriterine uygun link bulunamadı.
          </Typography>
        </Card>
      ) : (
        <div className="grid gap-2 md:grid-cols-2">
          {filteredLinks.map((item) => (
            <Card
              key={`${item.category}-${item.id}`}
              className="rounded-sm border-border p-3 transition-colors hover:border-zinc-700"
            >
              <CardHeader className="flex-row items-start justify-between gap-3 space-y-0 p-0">
                <div className="flex min-w-0 items-start gap-2">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border text-muted-foreground">
                    <Icon icon={item.icon} width={18} height={18} />
                  </span>
                  <div className="min-w-0">
                    <CardTitle className="truncate text-base">{item.label}</CardTitle>
                    <CardDescription className="truncate text-xs">{item.href}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{getCategoryLabel(item.category)}</Badge>
              </CardHeader>

              <CardContent className="mt-3 flex items-center gap-2 p-0">
                <Button asChild size="sm">
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                  >
                    Aç
                  </Link>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(item.id, item.href)}
                >
                  {copiedId === item.id ? "Kopyalandı" : "Kopyala"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
