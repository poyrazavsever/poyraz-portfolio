"use client";

import { Icon } from "@iconify/react";
import { useLocale } from "next-intl";
import { Badge } from "poyraz-ui/atoms";
import type { TechnologyStackItem } from "@/data/technology-stack";
import { getLocalizedValue } from "@/lib/locale";

export function TechnologyBadge({
  technology,
}: {
  technology: TechnologyStackItem;
}) {
  const locale = useLocale();

  return (
    <Badge
      variant="secondary"
      radius="sm"
      className="shrink-0 gap-1.5 px-2.5 py-1 text-xs font-medium text-foreground"
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
  );
}
