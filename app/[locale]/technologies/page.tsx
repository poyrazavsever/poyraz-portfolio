import { TechnologiesContent } from "@/components/technologies-content";
import { getStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getStaticPageMetadata({
    locale,
    page: "technologies",
    path: "/technologies",
  });
}

export default function TechnologiesPage() {
  return <TechnologiesContent />;
}
