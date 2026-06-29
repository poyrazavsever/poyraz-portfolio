"use client";

import { ReferenceCards } from "@/components/reference-cards";

export function ReferencesSection() {
  return (
    <section className="space-y-8 pt-0 sm:pt-12">
      <div className="relative overflow-hidden rounded-sm py-4">
        {/* We use two sets of cards for seamless infinite marquee effect */}
        <div className="flex w-max gap-4 animate-marquee pause-on-hover">
          <ReferenceCards className="flex gap-4 shrink-0" lineClamp={true} cardClassName="w-80" />
          <ReferenceCards className="flex gap-4 shrink-0" lineClamp={true} cardClassName="w-80" />
        </div>
        
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent"
        />
      </div>
    </section>
  );
}
