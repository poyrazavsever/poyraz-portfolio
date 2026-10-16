import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { ProjectCardWithPopover } from "@/components/project-card-with-popover";
import {
  getProjectFolderPath,
  PROJECT_FOLDERS,
  type ProjectFolder,
} from "@/data/project-folders";
import { getLocalizedValue } from "@/lib/locale";

export async function ProjectFolderContent({
  folder,
}: {
  folder: ProjectFolder;
}) {
  const t = await getTranslations("Projects");
  const locale = await getLocale();

  return (
    <section className="flex h-full flex-col gap-6 overflow-y-auto md:gap-8">
      <nav
        aria-label={t("folderBreadcrumb")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 no-underline transition-colors hover:text-red-600"
        >
          <Icon icon="mdi:arrow-left" width={15} height={15} aria-hidden="true" />
          <span>{t("backToProjects")}</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">
          {getLocalizedValue(folder.title, locale)}
        </span>
      </nav>

      <header className="flex items-start gap-3">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-border bg-muted text-red-600">
          <Icon icon="mdi:folder-open-outline" width={24} height={24} aria-hidden="true" />
        </span>
        <div className="min-w-0 space-y-1">
          <Typography variant="h3" component="h1" className="tracking-[-0.035em]">
            {getLocalizedValue(folder.title, locale)}
          </Typography>
          <Typography variant="small" className="max-w-2xl text-muted-foreground">
            {getLocalizedValue(folder.description, locale)}
          </Typography>
        </div>
      </header>

      <div className="flex flex-wrap gap-1.5" role="list">
        {PROJECT_FOLDERS.map((item) => {
          const active = item.slug === folder.slug;

          return (
            <Link
              key={item.slug}
              role="listitem"
              href={getProjectFolderPath(item.slug)}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs font-medium no-underline transition-colors ${
                active
                  ? "border-red-600/50 bg-red-600/10 text-red-600"
                  : "border-border text-muted-foreground hover:border-zinc-500 hover:text-foreground"
              }`}
            >
              <Icon icon={item.icon} width={14} height={14} aria-hidden="true" />
              <span>{getLocalizedValue(item.title, locale)}</span>
              <span className="tabular-nums opacity-70">{item.items.length}</span>
            </Link>
          );
        })}
      </div>

      <StaggerContainer className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {folder.items.map((item, index) => (
          <StaggerItem key={item.id}>
            <ProjectCardWithPopover
              image={item.image}
              title={getLocalizedValue(item.title, locale)}
              description={getLocalizedValue(item.description, locale)}
              badge={item.badge ? getLocalizedValue(item.badge, locale) : undefined}
              href={item.href}
              caseStudyHref={
                item.caseStudySlug ? `/projects/${item.caseStudySlug}` : undefined
              }
              caseStudyLabel={t("viewCaseStudy")}
              technologies={item.technologies}
              architecture={getLocalizedValue(item.architecture, locale)}
              technologiesLabel={t("technologies")}
              architectureLabel={t("architecture")}
              triggerClassName="w-full"
              className="aspect-square rounded-sm border-border"
              priority={index === 0}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
