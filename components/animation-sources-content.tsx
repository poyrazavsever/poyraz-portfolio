import { Card, Typography } from "poyraz-ui/atoms";
import { NewsCard } from "poyraz-ui/molecules";
import { Link } from "@/i18n/routing";
import type { AnimationSource } from "@/data/animation-sources";

type AnimationSourcesContentProps = {
  sources: AnimationSource[];
  emptyLabel: string;
};

export function AnimationSourcesContent({
  sources,
  emptyLabel,
}: AnimationSourcesContentProps) {
  return (
    <section>
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
            {emptyLabel}
          </Typography>
        </Card>
      )}
    </section>
  );
}
