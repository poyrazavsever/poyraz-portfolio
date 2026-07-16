import { HomeHero } from "@/components/home-hero";
import { HomeProjectsSection } from "@/components/home-projects-section";
import { HomeVideosSection } from "@/components/home-videos-section";
import { ReferencesSection } from "@/components/references-section";
import { getHomeBlogNews } from "@/data/blog";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeNews = await getHomeBlogNews(locale, 6);

  return (
    <section className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
      <HomeHero news={homeNews} />
      <HomeProjectsSection />
      <ReferencesSection />
      <HomeVideosSection />
    </section>
  );
}
