import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import { getBlogDetailBySlug, getBlogTranslations } from "@/data/blog-detail";
import { isNewsletterCategory } from "@/data/blog";
import {
  createAlternates,
  getLocalizedUrl,
  type SiteLocale,
} from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post || post.lang !== locale) {
    return {
      title: "Yazı Bulunamadı",
    };
  }

  const siteLocale = locale as SiteLocale;
  const translations = await getBlogTranslations(post);
  const paths = Object.fromEntries(
    translations.map((translation) => [
      translation.lang,
      `/blog/${translation.slug}`,
    ]),
  );
  const url = getLocalizedUrl(siteLocale, `/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: createAlternates(siteLocale, paths),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
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
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogDetailBySlug(slug);

  if (!post || post.lang !== locale) {
    notFound();
  }

  if (isNewsletterCategory(post.category)) {
    const localePrefix = locale === "tr" ? "" : `/${locale}`;
    permanentRedirect(`${localePrefix}/agenda/${post.slug}`);
  }

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={getLocalizedUrl(locale as SiteLocale, `/blog/${post.slug}`)}
        image={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
      />
      <BlogDetailContent post={post} />
    </>
  );
}
