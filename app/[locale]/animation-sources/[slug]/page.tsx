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

  return {
    title: source.title,
    description: source.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: source.title,
      description: source.excerpt,
      url,
      type: "article",
      publishedTime: source.date,
      authors: [source.author],
      images: [
        {
          url: source.coverImage,
          width: 720,
          height: 720,
          alt: source.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: source.title,
      description: source.excerpt,
      images: [source.coverImage],
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
