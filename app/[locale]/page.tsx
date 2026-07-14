import { HomeHero } from "@/components/home-hero";
import { HomeVideosSection } from "@/components/home-videos-section";
import { ReferencesSection } from "@/components/references-section";
import { SponsorsSection } from "@/components/sponsors-section";
import { getHomeBlogNews } from "@/data/blog";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeNews = await getHomeBlogNews(locale, 6);

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <HomeHero news={homeNews} />
      <ReferencesSection />
      <HomeVideosSection />
      <SponsorsSection />
    </section>
  );
}
