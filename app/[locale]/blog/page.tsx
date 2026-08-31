import { BlogContent } from "@/components/blog-content";
import { getBlogPageData } from "@/data/blog";
import { getStaticPageMetadata } from "@/lib/seo";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string | string[]; category?: string | string[]; search?: string | string[] }>;
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  return getStaticPageMetadata({ locale, page: "blog", path: "/blog" });
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const resolved = searchParams ? await searchParams : undefined;
  const pageParam = Array.isArray(resolved?.page) ? resolved?.page[0] : resolved?.page;
  const categoryParam = Array.isArray(resolved?.category)
    ? resolved?.category[0]
    : resolved?.category;
  const searchParam = Array.isArray(resolved?.search) ? resolved?.search[0] : resolved?.search;
  const page = Number(pageParam ?? "1");
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const data = await getBlogPageData(locale, currentPage, 12, categoryParam, searchParam);

  return <BlogContent data={data} />;
}
