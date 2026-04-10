"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import {
  ArticleCard,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "poyraz-ui/molecules";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import type { BlogPageData } from "@/data/blog";

type BlogContentProps = {
  data: BlogPageData;
};

function buildHref(params: { page?: number; category?: string; search?: string }) {
  const qs = new URLSearchParams();

  if (params.page && params.page > 1) qs.set("page", String(params.page));
  if (params.category && params.category !== "All") qs.set("category", params.category);
  if (params.search) qs.set("search", params.search);

  const query = qs.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function BlogContent({ data }: BlogContentProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(data.searchQuery);
  const pageNumbers = Array.from({ length: data.totalPages }, (_, i) => i + 1);
  const hasArticles = data.articles.length > 0;

  const submitSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      router.push(buildHref({ category: data.selectedCategory, search: trimmed }));
    },
    [router, data.selectedCategory],
  );

  const clearFilters = useCallback(() => {
    setSearchInput("");
    router.push("/blog");
  }, [router]);

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      {/* Filtre Çubuğu */}
      <Card className="rounded-sm border-border p-4">
        <div className="flex flex-col gap-3">
          {/* Kategoriler */}
          <div className="flex flex-wrap items-center gap-2">
            <Typography variant="small" className="mr-1 text-muted-foreground">
              Kategori:
            </Typography>
            {data.categories.map((category) => (
              <Link
                key={category}
                href={buildHref({ category, search: data.searchQuery })}
              >
                <Badge
                  variant={category === data.selectedCategory ? "default" : "outline"}
                  className="cursor-pointer rounded-sm transition-colors"
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Arama */}
          <div className="relative">
            <Icon
              icon="mdi:magnify"
              width={18}
              height={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="blog-search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitSearch(searchInput);
              }}
              placeholder="Başlık veya içerikte ara..."
              className="w-full rounded-sm border border-border bg-background py-2 pr-10 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-red-600 focus:ring-1 focus:ring-red-600/30 focus:outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  submitSearch("");
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon icon="mdi:close" width={16} height={16} />
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Aktif filtre göstergesi */}
      {(data.searchQuery || data.selectedCategory !== "All") && (
        <div className="flex items-center gap-2">
          <Typography variant="small" className="text-muted-foreground">
            {data.articles.length} sonuç
            {data.searchQuery ? ` · "${data.searchQuery}"` : ""}
            {data.selectedCategory !== "All" ? ` · ${data.selectedCategory}` : ""}
          </Typography>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex cursor-pointer items-center gap-1 rounded-sm border border-border px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon icon="mdi:filter-remove-outline" width={14} height={14} />
            Temizle
          </button>
        </div>
      )}

      {/* Yazı Kartları */}
      <div className="space-y-3">
        {hasArticles ? (
          <StaggerContainer className="grid gap-3 md:grid-cols-3">
            {data.articles.map((post) => (
              <StaggerItem key={post.id}>
                <ArticleCard
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  href={post.href}
                  className="rounded-sm border-border [&_h3]:line-clamp-2 [&_h3]:min-h-[2.5rem] [&_p]:line-clamp-3"
                  author={{ name: post.author, avatar: "/logo/logo.jpeg" }}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <Card className="rounded-sm border-border p-8 text-center">
            <Icon
              icon="mdi:file-search-outline"
              width={40}
              height={40}
              className="mx-auto mb-3 text-muted-foreground/50"
            />
            <Typography variant="p" className="text-muted-foreground">
              {data.searchQuery
                ? `"${data.searchQuery}" aramasına uygun sonuç bulunamadı.`
                : data.selectedCategory === "All"
                  ? "Henüz blog yazısı bulunmuyor."
                  : `"${data.selectedCategory}" kategorisinde henüz blog yazısı bulunmuyor.`}
            </Typography>
            {(data.searchQuery || data.selectedCategory !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon icon="mdi:filter-remove-outline" width={16} height={16} />
                Filtreleri Temizle
              </button>
            )}
          </Card>
        )}

        {/* Sayfalama */}
        {data.totalPages > 1 && (
          <Pagination className="mx-0 mt-4 justify-start">
            <PaginationContent className="justify-start">
              <PaginationItem>
                <PaginationPrevious
                  href={buildHref({
                    page: Math.max(1, data.currentPage - 1),
                    category: data.selectedCategory,
                    search: data.searchQuery,
                  })}
                  aria-disabled={data.currentPage <= 1}
                />
              </PaginationItem>

              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={buildHref({
                      page,
                      category: data.selectedCategory,
                      search: data.searchQuery,
                    })}
                    isActive={page === data.currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={buildHref({
                    page: Math.min(data.totalPages, data.currentPage + 1),
                    category: data.selectedCategory,
                    search: data.searchQuery,
                  })}
                  aria-disabled={data.currentPage >= data.totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
