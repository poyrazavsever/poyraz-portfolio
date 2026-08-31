import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import { getBlogDetailBySlug, getBlogTranslations } from "@/data/blog-detail";
import { isNewsletterCategory } from "@/data/blog";
import {
  createAlternates,
  getLocalizedUrl,
  type SiteLocale,
} from "@/lib/seo";

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

  const siteLocale = locale as SiteLocale;
  const translations = await getBlogTranslations(post);
  const paths = Object.fromEntries(
    translations.map((translation) => [
      translation.lang,
      `/agenda/${translation.slug}`,
    ]),
  );
  const url = getLocalizedUrl(siteLocale, `/agenda/${post.slug}`);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: createAlternates(siteLocale, paths),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      siteName: "Poyraz Avsever",
      locale: locale === "en" ? "en_US" : "tr_TR",
      alternateLocale:
        translations.length > 1
          ? [locale === "en" ? "tr_TR" : "en_US"]
          : undefined,
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
      creator: "@poyrazavsever",
    },
  };
}

export default async function AgendaDetailPage({ params }: AgendaDetailPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post || post.lang !== locale || !isNewsletterCategory(post.category)) {
    notFound();
  }

  const url = getLocalizedUrl(
    locale as SiteLocale,
    `/agenda/${post.slug}`,
  );

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={url}
        image={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
        locale={locale as SiteLocale}
      />
      <BlogDetailContent post={post} section="agenda" />
    </>
  );
}
