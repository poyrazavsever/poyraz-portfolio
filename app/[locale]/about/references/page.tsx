import { ReferencesDetailContent } from "@/components/references-detail-content";
import { getStaticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({
    locale,
    page: "references",
    path: "/about/references",
  });
}

export default function AboutReferencesPage() {
  return <ReferencesDetailContent />;
}
