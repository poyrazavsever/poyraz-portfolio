import { BlogContent } from "@/components/blog-content";
import { getBlogPageData } from "@/data/blog";

type BlogPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const page = Number(resolved?.page ?? "1");
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const data = await getBlogPageData(currentPage, 12);

  return <BlogContent data={data} />;
}
