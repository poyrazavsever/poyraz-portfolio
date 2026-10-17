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
      <header className="project-archive-hero relative overflow-hidden rounded-[1.75rem] border p-5 text-white shadow-[0_24px_70px_rgba(185,28,28,0.18)] sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-16 size-56 rounded-full border-[30px] border-white/10"
        />
        <nav
          aria-label={t("folderBreadcrumb")}
          className="relative mb-6 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 no-underline transition-colors hover:text-white"
          >
            <Icon icon="mdi:arrow-left" width={14} height={14} aria-hidden="true" />
            <span>{t("backToProjects")}</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{folder.slug}</span>
        </nav>

        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/12 text-3xl shadow-inner shadow-white/10 backdrop-blur-sm sm:size-16">
            <Icon icon={folder.icon} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
              ~/portfolio/projects/{folder.slug}
            </span>
            <Typography
              variant="h3"
              component="h1"
              className="text-white tracking-[-0.04em]"
            >
              {getLocalizedValue(folder.title, locale)}
            </Typography>
            <Typography
              variant="small"
              className="mt-1 line-clamp-3 max-w-2xl text-xs leading-relaxed text-white/72 sm:line-clamp-2 sm:text-sm"
            >
              {getLocalizedValue(folder.description, locale)}
            </Typography>
          </div>
        </div>
      </header>

      <div
        className="grid grid-cols-2 gap-2 rounded-2xl border border-border/80 bg-muted/20 p-2 sm:grid-cols-4"
        role="list"
        aria-label={t("folderSwitcher")}
      >
        {PROJECT_FOLDERS.map((item) => {
          const active = item.slug === folder.slug;

          return (
            <Link
              key={item.slug}
              role="listitem"
              href={getProjectFolderPath(item.slug)}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold no-underline transition-[color,background-color,border-color,transform] ${
                active
                  ? "border-red-700 bg-red-600 text-white shadow-[0_8px_24px_rgba(220,38,38,0.2)]"
                  : "border-transparent bg-background text-muted-foreground hover:-translate-y-0.5 hover:border-red-600/20 hover:text-red-600"
              }`}
            >
              <span className={`inline-flex size-6 shrink-0 items-center justify-center rounded-lg ${active ? "bg-white/15" : "bg-muted"}`}>
                <Icon icon={item.icon} width={14} height={14} aria-hidden="true" />
              </span>
              <span className="truncate">{getLocalizedValue(item.title, locale)}</span>
              <span className="ml-auto tabular-nums opacity-65">{item.items.length}</span>
            </Link>
          );
        })}
      </div>

      <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
