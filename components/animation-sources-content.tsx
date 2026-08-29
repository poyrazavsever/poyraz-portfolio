import Image from "next/image";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sources.map((source) => (
            <Link
              key={`${source.lang}-${source.slug}`}
              href={`/animation-sources/${source.slug}`}
              data-animation-source-card
              className="group min-w-0"
            >
              <Card className="h-full overflow-hidden rounded-sm border-border p-0 transition-colors group-hover:border-red-600/60">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={source.coverImage}
                    alt=""
                    fill
                    unoptimized={source.coverImage.toLowerCase().endsWith(".gif")}
                    sizes="(max-width: 640px) 50vw, 280px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="space-y-2 border-t border-border p-3">
                  <Badge variant="outline" className="rounded-sm">
                    {source.platform}
                  </Badge>
                  <Typography
                    variant="large"
                    data-animation-source-title
                    className="line-clamp-2 min-h-10 text-sm leading-5 sm:text-base"
                  >
                    {source.title}
                  </Typography>
                </div>
              </Card>
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
