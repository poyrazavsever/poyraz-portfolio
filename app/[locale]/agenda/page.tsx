import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BlogContent } from "@/components/blog-content";
import { getAgendaPageData } from "@/data/blog";
import { createPageMetadata } from "@/lib/seo";

type AgendaPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    page?: string | string[];
    search?: string | string[];
  }>;
};

export async function generateMetadata({ params }: AgendaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Agenda" });

  return createPageMetadata({
    locale: locale === "en" ? "en" : "tr",
    title: t("title"),
    description: t("description"),
    path: "/agenda",
  });
}

export default async function AgendaPage({ params, searchParams }: AgendaPageProps) {
  const { locale } = await params;
  const resolved = searchParams ? await searchParams : undefined;
  const pageParam = Array.isArray(resolved?.page) ? resolved.page[0] : resolved?.page;
  const searchParam = Array.isArray(resolved?.search)
    ? resolved.search[0]
    : resolved?.search;
  const page = Number(pageParam ?? "1");
  const currentPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const data = await getAgendaPageData(locale, currentPage, 12, searchParam);

  return <BlogContent data={data} section="agenda" />;
}
