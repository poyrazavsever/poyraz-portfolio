import { Link } from "@/i18n/routing";
import { Card, Typography } from "poyraz-ui/atoms";
import { VOLUNTEER_COMMUNITY_ITEMS } from "@/data/volunteer-community";
import { useTranslations, useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";

export function VolunteerCommunityContent() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      <Link
        href="/about"
        className="inline-flex w-fit items-center rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {t("backToAbout")}
      </Link>

      <div className="grid gap-3">
        {VOLUNTEER_COMMUNITY_ITEMS.map((item) => (
          <Card key={item.id} className="rounded-sm border-border p-4">
            <Typography variant="large" className="text-base leading-tight">
              {item.title}
            </Typography>

            <Typography variant="small" className="mt-2 text-muted-foreground">
              <span className="font-semibold text-foreground">{t("timelineLabel")}</span> {getLocalizedValue(item.timeline, locale)}
            </Typography>

            {item.link ? (
              <Typography variant="small" className="mt-1 text-muted-foreground">
                <span className="font-semibold text-foreground">{t("linkLabel")}</span>{" "}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:underline"
                >
                  {item.link.replace("https://", "")}
                </Link>
              </Typography>
            ) : null}

            <Typography variant="small" className="mt-1 text-muted-foreground">
              <span className="font-semibold text-foreground">{t("focusLabel")}</span> {getLocalizedValue(item.focus, locale)}
            </Typography>
          </Card>
        ))}
      </div>
    </section>
  );
}
