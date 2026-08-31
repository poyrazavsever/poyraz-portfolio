import { GalleryContent } from "@/components/gallery-content";
import { GALLERY_IMAGES } from "@/data/gallery";
import { getStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({
    locale,
    page: "gallery",
    path: "/gallery",
  });
}

export default function GalleryPage() {
  return <GalleryContent images={GALLERY_IMAGES} />;
}
