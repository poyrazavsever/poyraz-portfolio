import { BlogContent } from "@/components/blog-content";
import { getBlogPageData } from "@/data/blog";

type BlogPageProps = {
  searchParams?: Promise<{ page?: string | string[]; category?: string | string[]; search?: string | string[] }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const pageParam = Array.isArray(resolved?.page) ? resolved?.page[0] : resolved?.page;
  const categoryParam = Array.isArray(resolved?.category)
    ? resolved?.category[0]
    : resolved?.category;
  const searchParam = Array.isArray(resolved?.search) ? resolved?.search[0] : resolved?.search;
  const page = Number(pageParam ?? "1");
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const data = await getBlogPageData(currentPage, 12, categoryParam, searchParam);

  return <BlogContent data={data} />;
}
