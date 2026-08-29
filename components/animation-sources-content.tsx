import { Card, Typography } from "poyraz-ui/atoms";
import { NewsCard } from "poyraz-ui/molecules";
import { Link } from "@/i18n/routing";
import type { AnimationSource } from "@/data/animation-sources";

type AnimationSourcesContentProps = {
  sources: AnimationSource[];
  labels: {
    title: string;
    description: string;
    empty: string;
    itemCount: string;
  };
};

export function AnimationSourcesContent({
  sources,
  labels,
}: AnimationSourcesContentProps) {
  return (
    <section className="space-y-5">
      <header className="border-b border-border pb-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl">
            <Typography variant="h2">{labels.title}</Typography>
            <Typography variant="p" className="mt-1 text-sm text-muted-foreground">
              {labels.description}
            </Typography>
          </div>
          <Typography variant="small" className="text-muted-foreground">
            {labels.itemCount}
          </Typography>
        </div>
      </header>

      {sources.length > 0 ? (
        <div className="space-y-3">
          {sources.map((source) => (
            <Link
              key={`${source.lang}-${source.slug}`}
              href={`/animation-sources/${source.slug}`}
              data-animation-source-card
              className="block min-w-0"
            >
              <NewsCard
                image={source.coverImage}
                category={source.platform}
                title={source.title}
                date={source.date}
                className="w-full rounded-sm border-border [&>div]:min-h-32 [&>div>div:first-child]:w-32 sm:[&>div>div:first-child]:w-40 [&_h3]:text-base"
              />
            </Link>
          ))}
        </div>
      ) : (
        <Card className="rounded-sm border-border p-6 text-center">
          <Typography variant="p" className="text-muted-foreground">
            {labels.empty}
          </Typography>
        </Card>
      )}
    </section>
  );
}
