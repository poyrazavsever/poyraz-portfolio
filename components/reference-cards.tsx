
import { CustomTestimonialCard } from "@/components/custom-testimonial-card";
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

  return (
    <div className={className}>
      {REFERENCES.map((item) => {
        const card = (
          <CustomTestimonialCard
            quote={getLocalizedValue(item.quote, locale)}
            author={item.author}
            role={getLocalizedValue(item.role, locale)}
            avatar={item.avatar}
            rating={item.rating}
            lineClamp={lineClamp}
            className={`h-full ${cardClassName || "w-70 shrink-0"}`}
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
            className="block h-full transition-transform hover:scale-[1.02]"
          >
            {card}
          </a>
        );
      })}
    </div>
  );
}
