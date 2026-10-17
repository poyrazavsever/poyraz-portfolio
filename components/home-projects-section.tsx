"use client";

import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { Button, ButtonIcon, ButtonLabel, Typography } from "poyraz-ui/atoms";
import { useRouter } from "@/i18n/routing";
import { PROJECT_FOLDERS } from "@/data/project-folders";
import { ProjectFolderCard } from "@/components/project-folder-card";

export function HomeProjectsSection() {
  const t = useTranslations("Home");
  const tProjects = useTranslations("Projects");
  const locale = useLocale();
  const router = useRouter();

  return (
    <section className="pt-12 md:pt-14">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-red-600/15 bg-red-50/70 p-4 shadow-[0_24px_70px_rgba(185,28,28,0.08)] sm:p-5 dark:border-red-500/15 dark:bg-red-950/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-red-500/10 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 border-b border-red-900/10 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-red-400/10">
          <div className="max-w-xl">
            <span className="mb-2 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
              <span className="size-1.5 rounded-full bg-red-600" />
              {t("projectArchiveLabel")}
            </span>
            <Typography
              variant="h3"
              component="h2"
              className="tracking-[-0.04em]"
            >
              {t("projectsTitle")}
            </Typography>
            <Typography
              variant="small"
              className="mt-1.5 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm"
            >
              {t("projectsDescription")}
            </Typography>
          </div>

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

        <div className="relative flex items-center justify-between py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>~/portfolio/projects</span>
          <span>{PROJECT_FOLDERS.length.toString().padStart(2, "0")} {tProjects("folderCount")}</span>
        </div>

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT_FOLDERS.map((folder, index) => (
            <ProjectFolderCard
              key={folder.slug}
              folder={folder}
              locale={locale}
              countLabel={tProjects("projectCount")}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
