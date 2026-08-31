"use client";

import { useTranslations } from "next-intl";
import { Card, Typography } from "poyraz-ui/atoms";
import { TechnologyBadge } from "@/components/technology-badge";
import { TECHNOLOGY_STACK } from "@/data/technology-stack";

export function TechnologiesContent() {
  const t = useTranslations("Technologies");

  return (
    <section className="flex h-full flex-col gap-10">
      <header className="border-b border-border py-4 sm:py-5">
        <Typography
          variant="h2"
          component="h1"
          className="font-secondary text-2xl font-semibold leading-none tracking-[-0.045em] text-foreground"
        >
          {t("title")}
        </Typography>
        <Typography
          variant="small"
          className="mt-2 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm"
        >
          {t("description")}
        </Typography>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {TECHNOLOGY_STACK.map((group) => (
          <Card
            key={group.id}
            role="region"
            className="rounded-sm border-border p-4"
            aria-labelledby={`technology-group-${group.id}`}
          >
            <Typography
              id={`technology-group-${group.id}`}
              variant="large"
              component="h2"
              className="text-sm font-semibold tracking-[-0.02em]"
            >
              {t(`categories.${group.id}`)}
            </Typography>

            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((technology) => (
                <TechnologyBadge
                  key={technology.id}
                  technology={technology}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
