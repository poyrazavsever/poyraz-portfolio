import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import { getBlogDetailBySlug } from "@/data/blog-detail";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

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
