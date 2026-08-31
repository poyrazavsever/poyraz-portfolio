"use client";

import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import {
  Button,
  ButtonIcon,
  ButtonLabel,
  TextEffect,
  Typography,
} from "poyraz-ui/atoms";
import { getResumeHref } from "@/lib/links";
import { HomeNewsCard } from "@/components/home-news-card";

type HomeHeroProps = {
  children?: ReactNode;
  news: {
    id: string;
    category: string;
    title: string;
    date: string;
    image: string;
    href: string;
  }[];
};

export function HomeHero({ children, news }: HomeHeroProps) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const router = useRouter();

  return (
    <section>
      <div className="relative min-h-[150px] overflow-hidden border-b border-border py-4 sm:py-5">
        <div className="flex max-w-2xl flex-col justify-center gap-2">
          <Typography
            variant="h2"
            component="h1"
            className="leading-none tracking-[-0.045em] font-secondary font-semibold text-foreground text-2xl"
          >
            Poyraz{" "}
            <TextEffect
              effect="hand-drawn"
              tone="primary"
              className="tracking-[-0.04em]"
            >
              Avsever
            </TextEffect>
          </Typography>

          <Typography
            variant="small"
            className="max-w-xl text-xs leading-5 text-muted-foreground sm:text-sm"
          >
            {t("heroDescription")}
          </Typography>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              type="button"
              size="sm"
              radius="sm"
              effect="swap"
              swapTarget="both"
              onClick={() => router.push("/contact")}
            >
              <ButtonLabel>{t("hireMe")}</ButtonLabel>
              <ButtonIcon>
                <Icon icon="mdi:arrow-right" width={15} height={15} />
              </ButtonIcon>
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              radius="sm"
              effect="swap"
              swapTarget="both"
              onClick={() => window.open(getResumeHref(locale), "_blank", "noopener,noreferrer")}
            >
              <ButtonIcon>
                <Icon icon="mdi:download" width={15} height={15} />
              </ButtonIcon>
              <ButtonLabel>{t("downloadCv")}</ButtonLabel>
            </Button>
          </div>
        </div>

      </div>

      {children}

      <section className="space-y-3 pt-12 md:pt-14">
        <div className="flex items-center justify-between gap-4">
          <Typography
            variant="h3"
            component="h2"
            className="tracking-[-0.035em]"
          >
            {t("readMyPosts")}
          </Typography>

          <Button
            type="button"
            size="sm"
            radius="sm"
            effect="swap"
            swapTarget="both"
            onClick={() => router.push("/blog")}
          >
            <ButtonLabel>{t("allPosts")}</ButtonLabel>
            <ButtonIcon>
              <Icon icon="mdi:arrow-right" width={15} height={15} />
            </ButtonIcon>
          </Button>
        </div>

        <div className="relative overflow-hidden py-1">
          <div className="flex w-max items-stretch gap-3">
            {news.map((item, index) => (
              <HomeNewsCard
                key={item.id}
                category={item.category}
                title={item.title}
                date={item.date}
                image={item.image}
                href={item.href}
                priority={index === 0}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background via-background/80 to-transparent"
          />
        </div>
      </section>
    </section>
  );
}
