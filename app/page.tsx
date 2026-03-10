import { HomeHero } from "@/components/home-hero";
import { ReferencesSection } from "@/components/references-section";

export default function Home() {
  return (
    <section className="flex h-full flex-col gap-4 overflow-hidden">
      <HomeHero />
      <ReferencesSection />
    </section>
  );
}
