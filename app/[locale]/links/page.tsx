import { LinksContent } from "@/components/links-content";
import { getStaticPageMetadata } from "@/lib/seo";

type LinksPageProps = {
  searchParams?: Promise<{
    category?: string | string[];
    query?: string | string[];
  }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getStaticPageMetadata({ locale, page: "links", path: "/links" });
}

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LinksPage({ searchParams }: LinksPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialCategory = firstParam(resolvedSearchParams?.category);
  const initialQuery = firstParam(resolvedSearchParams?.query);

  return (
    <LinksContent
      key={`${initialCategory ?? "all"}-${initialQuery ?? ""}`}
      initialCategory={initialCategory}
      initialQuery={initialQuery}
    />
  );
}
