"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Badge,
  Button,
  ButtonIcon,
  ButtonLabel,
  Card,
  Typography,
} from "poyraz-ui/atoms";
import { Link } from "@/i18n/routing";
import {
  LEFT_LAYOUT_PROMO_SLIDES,
  RIGHT_LAYOUT_PROMO_SLIDES,
  type LayoutPromoCardDefinition,
  type LayoutPromoSlide,
} from "@/data/layout-promos";
import { SPONSORS } from "@/data/sponsors";
import { getLocalizedValue } from "@/lib/locale";

export type LayoutContentPromo = {
  title: string;
  href: string;
};

type PromoRailSide = "left" | "right";

function RailButton({
  href,
  label,
  icon = "mdi:arrow-right",
  variant = "outline",
  external = false,
}: {
  href: string;
  label: string;
  icon?: string;
  variant?: "default" | "outline" | "secondary";
  external?: boolean;
}) {
  const content = (
    <>
      <ButtonLabel>{label}</ButtonLabel>
      <ButtonIcon>
        <Icon icon={icon} width={14} height={14} />
      </ButtonIcon>
    </>
  );

  return (
    <Button
      asChild
      variant={variant}
      size="xs"
      radius="sm"
      effect="swap"
      swapTarget="both"
      className="w-full justify-between"
    >
      {external ? (
        <a href={href} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        <Link href={href}>{content}</Link>
      )}
    </Button>
  );
}

function SponsorLogos() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-1.5">
      {SPONSORS.map((sponsor, index) => (
        <a
          key={sponsor.id}
          href={sponsor.websiteUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={sponsor.name}
          className={`relative flex h-10 items-center justify-center rounded-sm border border-border bg-white p-1.5 transition-colors hover:border-primary/40 ${
            index === SPONSORS.length - 1 && SPONSORS.length % 2 === 1
              ? "col-span-2"
              : ""
          }`}
        >
          <Image
            src={sponsor.logo}
            alt=""
            fill
            sizes="100px"
            className="object-contain p-1.5 grayscale transition duration-300 hover:grayscale-0"
          />
        </a>
      ))}
    </div>
  );
}

function PromoIcon({
  card,
  className,
}: {
  card: LayoutPromoCardDefinition;
  className?: string;
}) {
  return (
    <Icon
      icon={card.icon}
      width={17}
      height={17}
      className={className}
    />
  );
}

function PromoCard({
  card,
  latestAgenda,
  latestPost,
}: {
  card: LayoutPromoCardDefinition;
  latestAgenda: LayoutContentPromo | null;
  latestPost: LayoutContentPromo | null;
}) {
  const t = useTranslations("LayoutPromos");
  const locale = useLocale();
  const liveContent =
    card.contentSource === "latestAgenda"
      ? latestAgenda
      : card.contentSource === "latestPost"
        ? latestPost
        : null;
  const href = liveContent?.href ?? getLocalizedValue(card.href, locale);
  const description = liveContent?.title ?? t(card.descriptionKey);
  const external = card.external ?? false;
  const iconSurface = card.iconSurface ?? "accent";
  const cardClassName =
    card.surface === "primary"
      ? "rounded-sm border-primary/25 bg-primary/5 p-3"
      : "rounded-sm border-border p-3";
  const iconClassName =
    iconSurface === "primary"
      ? "bg-primary text-primary-foreground"
      : iconSurface === "foreground"
        ? "bg-foreground text-background"
        : "bg-accent text-foreground";

  return (
    <Card className={cardClassName}>
      {card.eyebrowKey ? (
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" radius="sm">
            {t(card.eyebrowKey)}
          </Badge>
          <PromoIcon card={card} className="text-primary" />
        </div>
      ) : (
        <div
          className={`flex size-8 items-center justify-center rounded-sm ${iconClassName}`}
        >
          <PromoIcon card={card} />
        </div>
      )}

      <Typography
        variant="large"
        component="h2"
        className="mt-3 text-base leading-5 tracking-[-0.025em]"
      >
        {t(card.titleKey)}
      </Typography>
      <Typography
        variant="small"
        className={`mt-2 text-xs leading-5 text-muted-foreground ${
          liveContent ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </Typography>

      {card.kind === "sponsors" ? <SponsorLogos /> : null}

      <div className="mt-3">
        <RailButton
          href={href}
          label={t(card.ctaKey)}
          icon={external ? "mdi:arrow-top-right" : "mdi:arrow-right"}
          variant={card.buttonVariant}
          external={external}
        />
      </div>
    </Card>
  );
}

function PromoRail({
  side,
  slides,
  latestAgenda = null,
  latestPost = null,
}: {
  side: PromoRailSide;
  slides: readonly LayoutPromoSlide[];
  latestAgenda?: LayoutContentPromo | null;
  latestPost?: LayoutContentPromo | null;
}) {
  const t = useTranslations("LayoutPromos");
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const direction = side === "left" ? -1 : 1;
  const activeCards = slides[activeSlide] ?? slides[0];
  const railId = `${side}-promo-rail`;

  const selectAdjacentSlide = (step: number) => {
    setActiveSlide((current) => (current + step + slides.length) % slides.length);
  };

  const handleNavigationKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    selectAdjacentSlide(event.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <aside
      aria-label={t(side === "left" ? "leftRailLabel" : "rightRailLabel")}
      className="relative z-50 hidden min-[1420px]:block"
    >
      <div className="sticky top-4 py-4">
        <div
          role="group"
          aria-label={t("slideNavigationLabel")}
          onKeyDown={handleNavigationKeyDown}
          className="mb-3 flex h-5 items-center justify-center gap-2"
        >
          {slides.map((_, index) => {
            const selected = index === activeSlide;

            return (
              <button
                key={`${railId}-dot-${index}`}
                type="button"
                aria-pressed={selected}
                aria-label={t("slideCta", { slide: index + 1 })}
                onClick={() => setActiveSlide(index)}
                className="group flex size-5 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span
                  className={`block rounded-full transition-[width,background-color,transform] duration-300 group-hover:scale-110 ${
                    selected
                      ? "h-2 w-5 bg-primary"
                      : "size-2 bg-border group-hover:bg-muted-foreground/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <span className="sr-only" aria-live="polite">
          {t("slideStatus", {
            current: activeSlide + 1,
            total: slides.length,
          })}
        </span>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${railId}-slide-${activeSlide}`}
              id={`${railId}-panel-${activeSlide}`}
              role="group"
              aria-label={t("slideStatus", {
                current: activeSlide + 1,
                total: slides.length,
              })}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: -direction * 26 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction * 26 }
              }
              transition={{
                duration: reduceMotion ? 0.12 : 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-3"
            >
              {activeCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.28,
                    delay: reduceMotion ? 0 : index * 0.045,
                    ease: "easeOut",
                  }}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                >
                  <PromoCard
                    card={card}
                    latestAgenda={latestAgenda}
                    latestPost={latestPost}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}

export function LayoutLeftPromoRail({
  latestAgenda,
  latestPost,
}: {
  latestAgenda: LayoutContentPromo | null;
  latestPost: LayoutContentPromo | null;
}) {
  return (
    <PromoRail
      side="left"
      slides={LEFT_LAYOUT_PROMO_SLIDES}
      latestAgenda={latestAgenda}
      latestPost={latestPost}
    />
  );
}

export function LayoutRightPromoRail() {
  return <PromoRail side="right" slides={RIGHT_LAYOUT_PROMO_SLIDES} />;
}
