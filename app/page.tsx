import { Icon } from "@iconify/react";
import Link from "next/link";
import { AnnouncementBar } from "poyraz-ui/organisms";
import { HomeHero } from "@/components/home-hero";
import { ReferencesSection } from "@/components/references-section";

export default function Home() {
  return (
    <section className="flex h-full flex-col gap-4 overflow-hidden">
      <AnnouncementBar
        variant="branded"
        icon={<Icon icon="mdi:sparkles" width={16} height={16} />}
        action={
          <Link
            href="https://ui.poyrazavsever.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold underline"
          >
            Learn More -&gt;
          </Link>
        }
      >
        New components added this week!
      </AnnouncementBar>

      <HomeHero />
      <ReferencesSection />
    </section>
  );
}
