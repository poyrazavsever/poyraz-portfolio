import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimationSourcesContent } from "@/components/animation-sources-content";
import { listAnimationSources } from "@/data/animation-sources";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://poyrazavsever.com";

type AnimationSourcesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AnimationSourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const [t, sources] = await Promise.all([
    getTranslations({ locale, namespace: "AnimationSources" }),
    listAnimationSources(locale),
  ]);
  const localizedPath = locale === "en" ? "/en/animation-sources" : "/animation-sources";
  const url = `${SITE_URL}${localizedPath}`;
  const socialImagePath = sources[0]?.coverImage ?? "/logo/logo.png";
  const socialImageUrl = new URL(socialImagePath, SITE_URL).toString();
  const isGif = socialImagePath.toLowerCase().endsWith(".gif");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": `${SITE_URL}/animation-sources`,
        "en-US": `${SITE_URL}/en/animation-sources`,
      },
    },
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
          type: isGif ? "image/gif" : "image/png",
          width: isGif ? 480 : 1200,
          height: isGif ? 480 : 1200,
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
      labels={{
        title: t("title"),
        description: t("description"),
        empty: t("empty"),
        itemCount: t("itemCount", { count: sources.length }),
      }}
    />
  );
}
