"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import {
  Button,
  ButtonIcon,
  ButtonLabel,
  Typography,
} from "poyraz-ui/atoms";
import { TECHNOLOGY_STACK } from "@/data/technology-stack";
import { Link } from "@/i18n/routing";
import { TechnologyBadge } from "@/components/technology-badge";

export function HomeTechnologyStack() {
  const t = useTranslations("Home");
  const technologies = TECHNOLOGY_STACK.flatMap((group) => group.items);

  return (
    <section
      className="space-y-4 pt-12 md:pt-14"
      aria-labelledby="home-technology-stack-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography
          id="home-technology-stack-title"
          variant="h3"
          component="h2"
          className="tracking-[-0.035em]"
        >
          {t("technologiesTitle")}
        </Typography>

        <Button
          asChild
          size="sm"
          radius="sm"
          effect="swap"
          swapTarget="both"
        >
          <Link href="/technologies">
            <ButtonLabel>{t("allTechnologies")}</ButtonLabel>
            <ButtonIcon>
              <Icon icon="mdi:arrow-right" width={15} height={15} />
            </ButtonIcon>
          </Link>
        </Button>
      </div>

      <div className="relative max-h-14 overflow-hidden border-t border-border pt-3">
        <div className="flex flex-wrap gap-2" aria-label={t("technologiesTitle")}>
          {technologies.map((technology) => (
            <TechnologyBadge key={technology.id} technology={technology} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background via-background/85 to-transparent backdrop-blur-[2px]"
        />
      </div>
    </section>
  );
}
