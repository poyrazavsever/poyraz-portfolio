import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnimationSourcesContent } from "@/components/animation-sources-content";
import { listAnimationSources } from "@/data/animation-sources";

type AnimationSourcesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AnimationSourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AnimationSources" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/animation-sources",
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
