
import Image from "next/image";
import { Card, CardContent } from "poyraz-ui/atoms";
import { StarRating } from "poyraz-ui/molecules";
import { REFERENCES } from "@/data/references";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";

type ReferenceCardsProps = {
  className?: string;
  cardClassName?: string;
  lineClamp?: boolean;
  showRating?: boolean;
};

export function ReferenceCards({
  className,
  cardClassName,
  lineClamp,
  showRating = true,
}: ReferenceCardsProps) {
  const locale = useLocale();
  const hoverClassName =
    "transition-colors duration-200 group-hover:border-red-600/40 group-hover:bg-muted/30";

  return (
    <div className={className}>
      {REFERENCES.map((item) => {
        const quoteText = getLocalizedValue(item.quote, locale);

        const card = (
          <Card
            className={`group flex h-full flex-col rounded-sm ${hoverClassName} ${cardClassName || "w-70 shrink-0"}`}
          >
            <CardContent className="flex h-full flex-1 flex-col p-5">
              <span className="font-secondary text-4xl leading-none text-primary">
                “
              </span>
              <blockquote
                className={`mt-1 text-sm leading-relaxed text-secondary-foreground ${lineClamp ? "line-clamp-4" : ""}`}
              >
                {quoteText}
              </blockquote>
              {showRating && item.rating != null ? (
                <StarRating rating={item.rating} className="mt-3" />
              ) : null}
              <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                <Image
                  src={item.avatar}
                  alt=""
                  width={36}
                  height={36}
                  sizes="36px"
                  className="size-9 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {item.author}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {getLocalizedValue(item.role, locale)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

        const href = item.documentHref || item.profileHref;

        if (!href) {
          return <div key={item.id} className="h-full">{card}</div>;
        }

        return (
          <a
            key={item.id}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.author} bağlantısı`}
            className="group block h-full"
          >
            {card}
          </a>
        );
      })}
    </div>
  );
}
