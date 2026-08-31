import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import { getBlogDetailBySlug } from "@/data/blog-detail";
import { isNewsletterCategory } from "@/data/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";

type AgendaDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: AgendaDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post || post.lang !== locale || !isNewsletterCategory(post.category)) {
    return { title: locale === "en" ? "Agenda post not found" : "Gündem yazısı bulunamadı" };
  }

  const url = `${SITE_URL}${locale === "en" ? "/en" : ""}/agenda/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
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

export default async function AgendaDetailPage({ params }: AgendaDetailPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post || post.lang !== locale || !isNewsletterCategory(post.category)) {
    notFound();
  }

  const url = `${SITE_URL}${locale === "en" ? "/en" : ""}/agenda/${post.slug}`;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={url}
        image={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
      />
      <BlogDetailContent post={post} section="agenda" />
    </>
  );
}
