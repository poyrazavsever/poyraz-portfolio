import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { getBlogDetailBySlug } from "@/data/blog-detail";
import { getBlogEngagementBySlug } from "@/data/blog-engagement";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogDetailBySlug(slug);
  const engagement = getBlogEngagementBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailContent post={post} engagement={engagement} />;
}
