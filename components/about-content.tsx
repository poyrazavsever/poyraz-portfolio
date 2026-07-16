"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Button, ButtonIcon, ButtonLabel, Card, Typography } from "poyraz-ui/atoms";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "poyraz-ui/molecules";
import { Link, useRouter } from "@/i18n/routing";
import { BOOKMARKS } from "@/data/bookmarks";
import { certificates } from "@/data/certificates";
import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";
import { getLocalizedValue } from "@/lib/locale";

type TimelineItem = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description?: string;
};

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Typography
        variant="h3"
        component="h2"
        className="tracking-[-0.035em]"
      >
        {title}
      </Typography>
      {action}
    </div>
  );
}

function TimelineList({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative space-y-4 before:absolute before:top-3 before:bottom-3 before:left-3 before:w-px before:bg-border">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative grid grid-cols-[1.5rem_1fr] gap-3"
        >
          <span className="mt-1 size-6 rounded-full border border-border bg-background p-1">
            <span className="block size-full rounded-full bg-primary" />
          </span>

          <div className="border-b border-border pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Typography variant="large" className="text-base leading-tight">
                  {item.title}
                </Typography>
                <Typography
                  variant="small"
                  className="mt-0.5 text-muted-foreground"
                >
                  {item.subtitle}
                </Typography>
              </div>

              <Typography
                variant="display"
                className="shrink-0 text-right font-medium text-primary"
              >
                {item.period}
              </Typography>
            </div>

            {item.description ? (
              <Typography
                variant="small"
                className="mt-3 leading-relaxed text-muted-foreground"
              >
                {item.description}
              </Typography>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutContent() {
  const t = useTranslations("About");
  const locale = useLocale();
  const router = useRouter();

  const educationItems: TimelineItem[] = EDUCATION.map((item) => ({
    id: item.id,
    title: getLocalizedValue(item.title, locale),
    subtitle: item.institution,
    period: getLocalizedValue(item.period, locale),
  }));

  const experienceItems: TimelineItem[] = EXPERIENCE.map((item) => ({
    id: item.id,
    title: getLocalizedValue(item.role, locale),
    subtitle: item.company,
    period: getLocalizedValue(item.period, locale),
  }));

  return (
    <section className="flex h-full flex-col gap-12 overflow-y-auto overflow-x-hidden">
      <section className="space-y-3">
        <SectionHeading
          title={t("title")}
          action={
            <Button
              type="button"
              size="sm"
              radius="sm"
              effect="swap"
              swapTarget="both"
              onClick={() => router.push("/contact")}
            >
              <ButtonLabel>{t("contactCta")}</ButtonLabel>
              <ButtonIcon>
                <Icon icon="mdi:arrow-right" width={15} height={15} />
              </ButtonIcon>
            </Button>
          }
        />

        <Typography
          variant="p"
          className="max-w-3xl text-sm leading-7 text-muted-foreground"
        >
          {t("aboutText")}
        </Typography>
      </section>

      <section className="space-y-10">
        <div className="space-y-3">
          <SectionHeading title={t("educationTitle")} />
          <TimelineList items={educationItems} />
        </div>

        <div className="space-y-3">
          <SectionHeading title={t("experienceTitle")} />
          <TimelineList items={experienceItems} />
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeading
          title={t("certificatesTitle")}
          action={
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  size="sm"
                  radius="sm"
                  effect="swap"
                  swapTarget="both"
                >
                  <ButtonLabel>{t("allCertificates")}</ButtonLabel>
                  <ButtonIcon>
                    <Icon icon="mdi:arrow-right" width={15} height={15} />
                  </ButtonIcon>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full max-w-xl p-4">
                <SheetTitle>{t("allCertificates")}</SheetTitle>
                <div className="mt-4 grid max-h-[90dvh] gap-3 overflow-y-auto pr-1">
                  {certificates.map((item) => (
                    <Card
                      key={`${getLocalizedValue(item.name, locale)}-${getLocalizedValue(item.date, locale)}`}
                      className="rounded-sm border-border p-3"
                    >
                      <div className="flex gap-3">
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm border border-border">
                          <Image
                            src={item.image}
                            alt={getLocalizedValue(item.name, locale)}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Typography variant="large" className="leading-tight">
                            {getLocalizedValue(item.name, locale)}
                          </Typography>
                          <Typography
                            variant="small"
                            className="text-muted-foreground"
                          >
                            {item.organization}
                          </Typography>
                          <Typography variant="small" className="text-primary">
                            {getLocalizedValue(item.date, locale)}
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          }
        />

        <div className="relative overflow-hidden py-1">
          <div className="flex w-max items-stretch gap-3">
            {certificates.slice(0, 8).map((item) => (
              <Card
                key={`${getLocalizedValue(item.name, locale)}-${getLocalizedValue(item.date, locale)}`}
                className="w-56 shrink-0 overflow-hidden rounded-sm border-border p-0"
              >
                <div className="relative aspect-4/3 overflow-hidden border-b border-border">
                  <Image
                    src={item.image}
                    alt={getLocalizedValue(item.name, locale)}
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <Typography variant="large" className="line-clamp-2 text-sm leading-tight">
                    {getLocalizedValue(item.name, locale)}
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-1 text-muted-foreground"
                  >
                    {item.organization}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background via-background/80 to-transparent"
          />
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Link href="/about/references" className="block">
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <Typography variant="large" className="text-base leading-tight">
              {t("referencesTitle")}
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              {t("referencesDesc")}
            </Typography>
          </Card>
        </Link>

        <Link href="/about/volunteer-community" className="block">
          <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
            <Typography variant="large" className="text-base leading-tight">
              {t("volunteerTitle")}
            </Typography>
            <Typography variant="small" className="mt-1 text-muted-foreground">
              {t("volunteerDesc")}
            </Typography>
          </Card>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="cursor-pointer text-left"
              aria-label="Yer imlerini aç"
            >
              <Card className="h-full rounded-sm border-border p-4 transition-colors hover:border-zinc-700">
                <Typography variant="large" className="text-base leading-tight">
                  {t("bookmarksTitle")}
                </Typography>
                <Typography variant="small" className="mt-1 text-muted-foreground">
                  {t("bookmarksDesc")}
                </Typography>
              </Card>
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xl p-4">
            <SheetTitle>{t("bookmarksTitle")}</SheetTitle>
            <div className="mt-4 grid max-h-[90dvh] gap-3 overflow-y-auto pr-1">
              {BOOKMARKS.map((item) => (
                <Card key={item.id} className="rounded-sm border-border p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Typography variant="large" className="leading-tight">
                      {item.title}
                    </Typography>
                    <Badge variant="outline" className="rounded-sm">
                      {item.tag}
                    </Badge>
                  </div>
                  <Typography variant="small" className="mt-1 text-muted-foreground">
                    {getLocalizedValue(item.description, locale)}
                  </Typography>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm text-primary hover:underline"
                  >
                    {item.href.replace("https://", "")}
                  </Link>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
