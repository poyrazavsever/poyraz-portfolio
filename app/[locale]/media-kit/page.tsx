import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaKitContent } from "@/components/media-kit-content";
import type { MediaKitLocale } from "@/data/media-kit";
import { createPageMetadata } from "@/lib/seo";
import { getYouTubeChannelStats } from "@/lib/youtube-channel-stats";

type MediaKitPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MediaKitPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  return createPageMetadata({
    locale: isTurkish ? "tr" : "en",
    title: isTurkish ? "Medya Kiti" : "Media Kit",
    description: isTurkish
      ? "Poyraz Avsever sponsorluk ve marka iş birlikleri medya kiti."
      : "Poyraz Avsever media kit for sponsorships and brand partnerships.",
    path: "/media-kit",
  });
}

export default async function MediaKitPage({ params }: MediaKitPageProps) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  const youtubeStats = await getYouTubeChannelStats();

  return (
    <MediaKitContent
      locale={locale as MediaKitLocale}
      youtubeStats={youtubeStats}
    />
  );
}
