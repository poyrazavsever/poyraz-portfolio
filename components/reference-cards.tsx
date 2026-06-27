import { Link } from "@/i18n/routing";
import { TestimonialCard } from "poyraz-ui/molecules";
import { REFERENCES } from "@/data/references";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";

type ReferenceCardsProps = {
  className?: string;
  cardClassName?: string;
};

export function ReferenceCards({ className, cardClassName }: ReferenceCardsProps) {
  const locale = useLocale();

  return (
    <div className={className}>
      {REFERENCES.map((item) => {
        const card = (
          <TestimonialCard
            quote={getLocalizedValue(item.quote, locale)}
            author={item.author}
            role={getLocalizedValue(item.role, locale)}
            avatar={item.avatar}
            rating={item.rating}
            className={`h-full rounded-sm ${cardClassName || "w-70 shrink-0"}`}
          />
        );

        if (!item.profileHref) {
          return <div key={item.id}>{card}</div>;
        }

        return (
          <Link
            key={item.id}
            href={item.profileHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.author} LinkedIn profili`}
            className="block"
          >
            {card}
          </Link>
        );
      })}
    </div>
  );
}
