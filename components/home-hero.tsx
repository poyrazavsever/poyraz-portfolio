"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import {
  Button,
  ButtonIcon,
  ButtonLabel,
  TextEffect,
  Typography,
} from "poyraz-ui/atoms";
import { NewsCard } from "poyraz-ui/molecules";
import { getResumeHref } from "@/lib/links";

type HomeHeroProps = {
  news: {
    id: string;
    category: string;
    title: string;
    date: string;
    image: string;
    href: string;
  }[];
};

export function HomeHero({ news }: HomeHeroProps) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const router = useRouter();

  return (
    <section>
      <div className="relative grid min-h-[150px] overflow-hidden border-b border-border py-4 sm:grid-cols-[1fr_180px] sm:py-5">
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

        <div className="hero-image-cycle absolute right-0 bottom-0 hidden h-full w-44 overflow-hidden sm:block">
          <Image
            src="/images/hero1.png"
            alt="Poyraz Avsever"
            width={220}
            height={220}
            sizes="180px"
            priority
            className="hero-image-cycle-frame hero-image-cycle-primary absolute right-0 bottom-0 h-auto w-36 object-contain"
          />
          <Image
            src="/images/hero2.png"
            alt=""
            width={220}
            height={220}
            sizes="180px"
            aria-hidden="true"
            className="hero-image-cycle-frame hero-image-cycle-secondary absolute right-0 bottom-0 h-auto w-36 object-contain"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-px w-36 bg-border"
          />
        </div>
      </div>

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
            {news.map((item) => (
              <NewsCard
                key={item.id}
                className="w-72 shrink-0 rounded-sm border-border"
                category={item.category}
                title={item.title}
                date={item.date}
                image={item.image}
                href={item.href}
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
