import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimationSourceDetailContent } from "@/components/animation-source-detail-content";
import { ArticleJsonLd } from "@/components/json-ld";
import {
  getAnimationSourceBySlug,
  listAnimationSources,
} from "@/data/animation-sources";
import {
  createAlternates,
  getAbsoluteUrl,
  getLocalizedUrl,
  type SiteLocale,
} from "@/lib/seo";

type AnimationSourceDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

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

  const siteLocale = locale as SiteLocale;
  const path = `/animation-sources/${source.slug}`;
  const url = getLocalizedUrl(siteLocale, path);
  const socialImageUrl = getAbsoluteUrl(source.coverImage);

  return {
    title: source.title,
    description: source.excerpt,
    alternates: createAlternates(siteLocale, { tr: path, en: path }),
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
          type: "image/webp",
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

  const url = getLocalizedUrl(
    locale as SiteLocale,
    `/animation-sources/${source.slug}`,
  );

  return (
    <>
      <ArticleJsonLd
        title={source.title}
        description={source.excerpt}
        url={url}
        image={source.coverImage}
        datePublished={source.date}
        authorName={source.author}
        locale={locale === "en" ? "en" : "tr"}
      />
      <AnimationSourceDetailContent source={source} />
    </>
  );
}
