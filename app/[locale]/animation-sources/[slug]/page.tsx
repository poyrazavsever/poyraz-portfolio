import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimationSourceDetailContent } from "@/components/animation-source-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import {
  getAnimationSourceBySlug,
  listAnimationSources,
} from "@/data/animation-sources";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";

type AnimationSourceDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function getLocalizedPath(locale: string, slug: string) {
  const localePrefix = locale === "tr" ? "" : `/${locale}`;
  return `${localePrefix}/animation-sources/${slug}`;
}

export async function generateStaticParams() {
  const sources = await listAnimationSources();
  return sources.map((source) => ({
    locale: source.lang,
    slug: source.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: AnimationSourceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const source = await getAnimationSourceBySlug(slug, locale);

  if (!source) {
    return { title: locale === "en" ? "Source not found" : "Kaynak bulunamadı" };
  }

  const url = `${SITE_URL}${getLocalizedPath(locale, source.slug)}`;
  const socialImageUrl = new URL(source.coverImage, SITE_URL).toString();
  const turkishUrl = `${SITE_URL}${getLocalizedPath("tr", source.slug)}`;
  const englishUrl = `${SITE_URL}${getLocalizedPath("en", source.slug)}`;

  return {
    title: source.title,
    description: source.excerpt,
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": turkishUrl,
        "en-US": englishUrl,
        "x-default": turkishUrl,
      },
    },
    openGraph: {
      title: source.title,
      description: source.excerpt,
      url,
      siteName: "Poyraz Avsever",
      type: "article",
      locale: locale === "en" ? "en_US" : "tr_TR",
      alternateLocale: locale === "en" ? ["tr_TR"] : ["en_US"],
      publishedTime: source.date,
      authors: [source.author],
      images: [
        {
          url: socialImageUrl,
          type: "image/gif",
          width: 480,
          height: 480,
          alt: source.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: source.title,
      description: source.excerpt,
      creator: "@poyrazavsever",
      images: [
        {
          url: socialImageUrl,
          alt: source.title,
        },
      ],
    },
  };
}

export default async function AnimationSourceDetailPage({
  params,
}: AnimationSourceDetailPageProps) {
  const { locale, slug } = await params;
  const source = await getAnimationSourceBySlug(slug, locale);

  if (!source) notFound();

  const url = `${SITE_URL}${getLocalizedPath(locale, source.slug)}`;

  return (
    <>
      <ArticleJsonLd
        title={source.title}
        description={source.excerpt}
        url={url}
        image={source.coverImage}
        datePublished={source.date}
        authorName={source.author}
      />
      <AnimationSourceDetailContent source={source} />
    </>
  );
}
