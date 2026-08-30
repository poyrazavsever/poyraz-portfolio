"use client";

import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { Button, ButtonIcon, ButtonLabel, Typography } from "poyraz-ui/atoms";
import { useRouter } from "@/i18n/routing";
import { WEB_APPS } from "@/data/projects";
import { getLocalizedValue } from "@/lib/locale";
import { ProjectCardWithPopover } from "@/components/project-card-with-popover";

export function HomeProjectsSection() {
  const t = useTranslations("Home");
  const tProjects = useTranslations("Projects");
  const locale = useLocale();
  const router = useRouter();
  const projects = WEB_APPS.slice(0, 5);

  return (
    <section className="space-y-3 pt-12 md:pt-14">
      <div className="flex items-center justify-between gap-4">
        <Typography
          variant="h3"
          component="h2"
          className="tracking-[-0.035em]"
        >
          {t("projectsTitle")}
        </Typography>

        <Button
          type="button"
          size="sm"
          radius="sm"
          effect="swap"
          swapTarget="both"
          onClick={() => router.push("/projects")}
        >
          <ButtonLabel>{t("allProjects")}</ButtonLabel>
          <ButtonIcon>
            <Icon icon="mdi:arrow-right" width={15} height={15} />
          </ButtonIcon>
        </Button>
      </div>

      <div className="relative overflow-hidden py-1">
        <div className="flex w-max items-stretch gap-2">
          {projects.map((project) => (
            <ProjectCardWithPopover
              key={project.id}
              image={project.image}
              title={getLocalizedValue(project.title, locale)}
              description={getLocalizedValue(project.description, locale)}
              badge={
                project.badge
                  ? getLocalizedValue(project.badge, locale)
                  : undefined
              }
              href={project.href}
              technologies={project.technologies}
              architecture={getLocalizedValue(project.architecture, locale)}
              technologiesLabel={tProjects("technologies")}
              architectureLabel={tProjects("architecture")}
              triggerClassName="w-56 shrink-0 md:w-[calc((100vw-8rem)/4)] md:max-w-56"
              className="aspect-square rounded-sm border-border"
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-background via-background/80 to-transparent"
        />
      </div>
    </section>
  );
}
