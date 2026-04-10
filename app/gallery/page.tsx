import { GalleryContent } from "@/components/gallery-content";
import { GALLERY_ITEMS } from "@/data/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Poyraz Avsever'in tasarımları, projeleri ve görsel içeriklerinden oluşan galeri portföyü.",
};

export default function GalleryPage() {
  return <GalleryContent items={GALLERY_ITEMS} />;
}
