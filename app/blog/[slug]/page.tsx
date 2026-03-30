import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import { getBlogDetailBySlug } from "@/data/blog-detail";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${SITE_URL}/blog/${post.slug}`}
        image={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
      />
      <BlogDetailContent post={post} />
    </>
  );
}
