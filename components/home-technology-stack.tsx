"use client";

import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Typography } from "poyraz-ui/atoms";
import { TECHNOLOGY_STACK } from "@/data/technology-stack";
import { getLocalizedValue } from "@/lib/locale";

export function HomeTechnologyStack() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <section
      className="space-y-4 pb-4 pt-12 md:pt-14"
      aria-labelledby="home-technology-stack-title"
    >
      <Typography
        id="home-technology-stack-title"
        variant="h3"
        component="h2"
        className="tracking-[-0.035em]"
      >
        {t("technologiesTitle")}
      </Typography>

      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {TECHNOLOGY_STACK.map((group) => (
          <div key={group.id} className="space-y-2.5 border-t border-border pt-3">
            <Typography
              variant="small"
              component="h3"
              className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground"
            >
              {t(`technologyCategories.${group.id}`)}
            </Typography>

            <div className="flex flex-wrap gap-2">
              {group.items.map((technology) => (
                <Badge
                  key={technology.id}
                  variant="secondary"
                  radius="sm"
                  className="gap-1.5 px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  <Icon
                    icon={technology.icon}
                    width={14}
                    height={14}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                  <span>{getLocalizedValue(technology.label, locale)}</span>
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
