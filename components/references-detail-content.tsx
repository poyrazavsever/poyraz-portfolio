import Link from "next/link";
import { ReferenceCards } from "@/components/reference-cards";

export function ReferencesDetailContent() {
  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      <Link
        href="/about"
        className="inline-flex w-fit items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {"<- Back to about"}
      </Link>

      <ReferenceCards className="flex flex-wrap gap-3" />
    </section>
  );
}
