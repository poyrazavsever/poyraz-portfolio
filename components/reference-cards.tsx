
import { TestimonialCard } from "poyraz-ui/molecules";
import { REFERENCES } from "@/data/references";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";

type ReferenceCardsProps = {
  className?: string;
  cardClassName?: string;
  lineClamp?: boolean;
};

export function ReferenceCards({ className, cardClassName, lineClamp }: ReferenceCardsProps) {
  const locale = useLocale();
  const hoverClassName =
    "transition-colors duration-200 group-hover:border-red-600/40 group-hover:bg-muted/30 group-hover:shadow-sm";

  return (
    <div className={className}>
      {REFERENCES.map((item) => {
        const quoteText = getLocalizedValue(item.quote, locale);

        const card = (
          <TestimonialCard
            quote={quoteText}
            author={item.author}
            role={getLocalizedValue(item.role, locale)}
            avatar={item.avatar}
            rating={item.rating}
            className={`flex flex-col rounded-sm ${lineClamp ? "[&_p]:line-clamp-3" : ""} ${hoverClassName} ${cardClassName || "w-70 shrink-0"}`}
          />
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
