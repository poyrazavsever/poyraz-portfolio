"use client";

import Link from "next/link";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import {
  ArticleCard,
  NewsCard,
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

function pageHref(page: number, category: string) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (category !== "All") {
    params.set("category", category);
  }

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function categoryHref(category: string) {
  if (category === "All") {
    return "/blog";
  }

  const params = new URLSearchParams();
  params.set("category", category);

  return `/blog?${params.toString()}`;
}

export function BlogContent({ data }: BlogContentProps) {
  const pageNumbers = Array.from({ length: data.totalPages }, (_, index) => index + 1);
  const hasArticles = data.articles.length > 0;

  return (
    <section className="flex h-full flex-col gap-3 overflow-hidden">
      <div className="grid gap-3 md:grid-cols-[1.35fr_1fr]">
        <div className="space-y-2">
          {data.news.map((post) => (
            <NewsCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              date={post.date}
              href={post.href}
              className="rounded-sm border-border"
            />
          ))}
        </div>

        <div className="grid gap-3 md:grid-rows-[auto_1fr]">
          <Card className="rounded-sm border-border p-4">
            <Typography variant="large">Kategoriler</Typography>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.categories.map((category) => (
                <Link key={category} href={categoryHref(category)}>
                  <Badge
                    variant={category === data.selectedCategory ? "default" : "outline"}
                    className="cursor-pointer rounded-sm"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-4">
            <Typography variant="large">Podcast İçerikleri</Typography>
            <div className="mt-3 space-y-3">
              {data.podcastGroups.map((group) => (
                <Card key={group.id} className="rounded-sm border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Typography variant="small" className="font-semibold text-foreground">
                      {group.title}
                    </Typography>
                    <Link
                      href={group.href}
                      className="text-xs text-muted-foreground underline transition-colors hover:text-foreground"
                    >
                      Tümünü Gör
                    </Link>
                  </div>

                  <div className="mt-2 space-y-2">
                    {group.items.map((episode) => (
                      <div key={episode.id} className="rounded-sm border border-border p-2">
                        <Typography variant="small" className="font-medium text-foreground">
                          {episode.title}
                        </Typography>
                        <Typography variant="small" className="mt-0.5 text-muted-foreground">
                          {episode.date}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

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
                  className="rounded-sm border-border [&_h3]:line-clamp-2 [&_h3]:min-h-[2.5rem]"
                  author={{ name: post.author, avatar: "/logo/logo.jpeg" }}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <Card className="rounded-sm border-border p-5">
            <Typography variant="p" className="text-muted-foreground">
              {data.selectedCategory === "All"
                ? "Henüz blog yazısı bulunmuyor."
                : `"${data.selectedCategory}" kategorisinde henüz blog yazısı bulunmuyor.`}
            </Typography>
          </Card>
        )}

        <Pagination className="mx-0 mt-4 justify-start">
          <PaginationContent className="justify-start">
            <PaginationItem>
              <PaginationPrevious
                href={pageHref(Math.max(1, data.currentPage - 1), data.selectedCategory)}
                aria-disabled={data.currentPage <= 1}
              />
            </PaginationItem>

            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={pageHref(page, data.selectedCategory)}
                  isActive={page === data.currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={pageHref(Math.min(data.totalPages, data.currentPage + 1), data.selectedCategory)}
                aria-disabled={data.currentPage >= data.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
