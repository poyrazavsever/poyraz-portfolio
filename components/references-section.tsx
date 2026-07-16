"use client";

import { Icon } from "@iconify/react";
import { ReferenceCards } from "@/components/reference-cards";
import { useRouter } from "@/i18n/routing";
import { Button, ButtonIcon, ButtonLabel, Typography } from "poyraz-ui/atoms";
import { useTranslations } from "next-intl";

export function ReferencesSection() {
  const t = useTranslations("Home");
  const router = useRouter();

  return (
    <section className="space-y-3 pt-12 md:pt-14">
      <div className="flex items-center justify-between gap-4">
        <Typography
          variant="h3"
          component="h2"
          className="tracking-[-0.035em]"
        >
          {t("reviewsAndReferences")}
        </Typography>

        <Button
          type="button"
          size="sm"
          radius="sm"
          effect="swap"
          swapTarget="both"
          onClick={() => router.push("/about/references")}
        >
          <ButtonLabel>{t("allReferences")}</ButtonLabel>
          <ButtonIcon>
            <Icon icon="mdi:arrow-right" width={15} height={15} />
          </ButtonIcon>
        </Button>
      </div>

      <div className="relative overflow-hidden py-1">
        {/* We use two sets of cards for seamless infinite marquee effect */}
        <div className="flex w-max items-start gap-4 animate-marquee pause-on-hover">
          <ReferenceCards className="flex items-start gap-4 shrink-0" lineClamp={true} showRating={false} cardClassName="w-80" />
          <ReferenceCards className="flex items-start gap-4 shrink-0" lineClamp={true} showRating={false} cardClassName="w-80" />
        </div>
        
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-background to-transparent"
        />
      </div>
    </section>
  );
}
