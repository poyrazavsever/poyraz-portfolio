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

      <div className="grid grid-cols-2 gap-3 py-1 md:grid-cols-4">
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
    </section>
  );
}
