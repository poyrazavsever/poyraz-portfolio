import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimationSourcesContent } from "@/components/animation-sources-content";
import { listAnimationSources } from "@/data/animation-sources";
import {
  createAlternates,
  getAbsoluteUrl,
  getLocalizedUrl,
  type SiteLocale,
} from "@/lib/seo";

type AnimationSourcesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AnimationSourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AnimationSources" });
  const siteLocale = locale as SiteLocale;
  const url = getLocalizedUrl(siteLocale, "/animation-sources");
  const socialImageUrl = getAbsoluteUrl("/og.png");

  return {
    title: t("title"),
    description: t("description"),
    alternates: createAlternates(siteLocale, {
      tr: "/animation-sources",
      en: "/animation-sources",
    }),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: "Poyraz Avsever",
      type: "website",
      locale: locale === "en" ? "en_US" : "tr_TR",
      images: [
        {
          url: socialImageUrl,
          type: "image/png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@poyrazavsever",
      images: [{ url: socialImageUrl, alt: t("title") }],
    },
  };
}

export default async function AnimationSourcesPage({
  params,
}: AnimationSourcesPageProps) {
  const { locale } = await params;
  const [sources, t] = await Promise.all([
    listAnimationSources(locale),
    getTranslations({ locale, namespace: "AnimationSources" }),
  ]);

  return (
    <AnimationSourcesContent
      sources={sources}
      emptyLabel={t("empty")}
    />
  );
}
