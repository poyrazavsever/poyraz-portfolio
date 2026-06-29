import { Link } from "@/i18n/routing";
import { ReferenceCards } from "@/components/reference-cards";
import { useTranslations } from "next-intl";

export function ReferencesDetailContent() {
  const t = useTranslations("About");

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      <Link
        href="/about"
        className="inline-flex w-fit items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {t("backToAbout")}
      </Link>

      <ReferenceCards
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>a]:mb-4 [&>a]:break-inside-avoid [&>div]:mb-4 [&>div]:break-inside-avoid"
        cardClassName="w-full"
        lineClamp={false}
      />
    </section>
  );
}
