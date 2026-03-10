import Link from "next/link";
import { TestimonialCard } from "poyraz-ui/molecules";
import { REFERENCES } from "@/data/references";

type ReferenceCardsProps = {
  className?: string;
};

export function ReferenceCards({ className }: ReferenceCardsProps) {
  return (
    <div className={className}>
      {REFERENCES.map((item) => {
        const card = (
          <TestimonialCard
            quote={item.quote}
            author={item.author}
            role={item.role}
            avatar={item.avatar}
            rating={item.rating}
            className="h-full w-70 shrink-0 rounded-sm"
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
