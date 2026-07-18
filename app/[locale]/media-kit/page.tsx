import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaKitContent } from "@/components/media-kit-content";
import type { MediaKitLocale } from "@/data/media-kit";

type MediaKitPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MediaKitPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  return {
    title: isTurkish ? "Medya Kiti" : "Media Kit",
    description: isTurkish
      ? "Poyraz Avsever sponsorluk ve marka iş birlikleri medya kiti."
      : "Poyraz Avsever media kit for sponsorships and brand partnerships.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    alternates: {
      canonical: null,
    },
  };
}

export default async function MediaKitPage({ params }: MediaKitPageProps) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  return <MediaKitContent locale={locale as MediaKitLocale} />;
}
