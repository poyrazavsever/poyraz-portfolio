import type { Metadata } from "next";
import { LinksContent } from "@/components/links-content";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Poyraz Avsever'in sosyal medya, portfolyo ve içerik bağlantılarına tek sayfadan ulaş.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Poyraz Avsever | Links",
    description:
      "Poyraz Avsever'in sosyal medya, portfolyo ve içerik bağlantılarına tek sayfadan ulaş.",
    url: "https://poyrazavsever.com/links",
    images: [
      {
        url: "/logo/cover.png",
        width: 1536,
        height: 512,
        alt: "Poyraz Avsever Links sayfası kapak görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poyraz Avsever | Links",
    description:
      "Poyraz Avsever'in sosyal medya, portfolyo ve içerik bağlantılarına tek sayfadan ulaş.",
    images: ["/logo/cover.png"],
  },
};

export default function LinksPage() {
  return <LinksContent />;
}
