"use client";

import { ReferenceCards } from "@/components/reference-cards";

export function ReferencesSection() {
  return (
    <section className="space-y-8 pt-0 sm:pt-12">
      <div className="relative overflow-hidden rounded-sm">
        <ReferenceCards className="flex w-max gap-3" />
        <div
          aria-hidden="true"
          className="pointer-events-none opacity-95 absolute top-0 right-0 h-full w-48 bg-linear-to-l from-white via-white/80 to-transparent"
        />
      </div>
    </section>
  );
}
