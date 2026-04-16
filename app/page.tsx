import { HomeHero } from "@/components/home-hero";
import { HomeVideosSection } from "@/components/home-videos-section";
import { ReferencesSection } from "@/components/references-section";
import { getHomeBlogNews } from "@/data/blog";

export default async function Home() {
  const homeNews = await getHomeBlogNews(3);

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <HomeHero news={homeNews} />
      <ReferencesSection />
      <HomeVideosSection />
    </section>
  );
}
