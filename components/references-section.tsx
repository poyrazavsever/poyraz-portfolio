"use client";

import Link from "next/link";
import { TestimonialCard } from "poyraz-ui/molecules";
import { REFERENCES } from "@/data/references";

export function ReferencesSection() {
  return (
    <section className="space-y-8 md:pt-12">

      <div className="relative overflow-hidden rounded-sm">
        <div className="flex w-max gap-3">
          {REFERENCES.map((item) => {
            const card = (
              <TestimonialCard
                quote={item.quote}
                author={item.author}
                role={item.role}
                avatar={item.avatar}
                rating={item.rating}
                className="h-full w-[280px] shrink-0 rounded-sm"
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
                aria-label={`${item.author} LinkedIn profile`}
                className="block"
              >
                {card}
              </Link>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none opacity-95 absolute top-0 right-0 h-full w-48 bg-linear-to-l from-white via-white/80 to-transparent"
        />
      </div>
    </section>
  );
}
