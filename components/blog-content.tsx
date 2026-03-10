"use client";

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
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
  BLOG_NEWS,
  RECENT_COMMENTS,
} from "@/data/blog";

export function BlogContent() {
  return (
    <section className="flex h-full flex-col gap-3 overflow-hidden">
      <div className="grid gap-3 md:grid-cols-[1.35fr_1fr]">
        <div className="space-y-2">
          {BLOG_NEWS.map((post) => (
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
            <Typography variant="large">Categories</Typography>
            <div className="mt-3 flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((category, index) => (
                <Badge
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
                  className="rounded-sm"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-4">
            <Typography variant="large">Recent comments</Typography>
            <div className="mt-3 space-y-2">
              {RECENT_COMMENTS.map((comment) => (
                <Card key={comment.id} className="rounded-sm border-border p-3">
                  <Typography variant="small" className="font-semibold text-foreground">
                    {comment.author}
                  </Typography>
                  <Typography variant="small" className="mt-1 text-muted-foreground">
                    {comment.text}
                  </Typography>
                  <Typography variant="small" className="mt-2 text-red-600">
                    {comment.date}
                  </Typography>
                </Card>
              ))}
            </div>
          </Card>

        </div>
      </div>

      <div className="space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
          {BLOG_ARTICLES.map((post) => (
            <ArticleCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              href={post.href}
              className="rounded-sm border-border"
              author={{ name: "Poyraz Avsever", avatar: "/logo/logo.jpeg" }}
            />
          ))}
        </div>

        <Pagination className="mx-0 mt-4 justify-end">
          <PaginationContent className="justify-start">
            <PaginationItem>
              <PaginationPrevious href="/blog" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/blog" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/blog?page=2">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="/blog?page=3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="/blog?page=2" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
