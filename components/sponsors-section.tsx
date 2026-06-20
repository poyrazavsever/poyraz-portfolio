import Image from "next/image";
import Link from "next/link";
import { Card } from "poyraz-ui/atoms";
import { SPONSORS } from "@/data/sponsors";

export function SponsorsSection() {
  if (!SPONSORS || SPONSORS.length === 0) return null;

  return (
    <section>
      <div className="grid grid-cols-2 justify-start gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {SPONSORS.map((sponsor) => {
          const logoContent = (
            <Card className="flex h-20 w-full items-center justify-center rounded-sm border-border bg-card p-4 transition-all hover:bg-accent hover:shadow-sm">
              <div className="relative h-full w-full grayscale transition-all duration-300 hover:grayscale-0">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </Card>
          );

          if (sponsor.websiteUrl) {
            return (
              <Link
                key={sponsor.id}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {logoContent}
              </Link>
            );
          }

          return <div key={sponsor.id}>{logoContent}</div>;
        })}
      </div>
    </section>
  );
}
