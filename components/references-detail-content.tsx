import Link from "next/link";
import { ReferenceCards } from "@/components/reference-cards";

export function ReferencesDetailContent() {
  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      <Link
        href="/about"
        className="inline-flex w-fit items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {"<- Hakkımda'ya dön"}
      </Link>

      <ReferenceCards
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
        cardClassName="w-full"
      />
    </section>
  );
}
