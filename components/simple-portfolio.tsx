"use client";

import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Card, PatternGrid, Typography } from "poyraz-ui/atoms";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "poyraz-ui/molecules";
import { Link } from "@/i18n/routing";
import { ALL_PROJECTS, type ProjectItem } from "@/data/projects";
import { TECHNOLOGY_STACK } from "@/data/technology-stack";
import { SOCIAL_LINKS } from "@/lib/links";
import { getLocalizedValue } from "@/lib/locale";
import type { LayoutContentPromo } from "@/components/layout-promo-rails";

type SimplePortfolioProps = {
  latestAgenda: LayoutContentPromo | null;
  latestPost: LayoutContentPromo | null;
  onChooseExperience: () => void;
};

function ProjectTextLink({ project }: { project: ProjectItem }) {
  const locale = useLocale();
  const title = getLocalizedValue(project.title, locale);
  const className =
    "font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary";

  if (project.caseStudySlug) {
    return (
      <Link href={`/projects/${project.caseStudySlug}`} className={className}>
        {title}
      </Link>
    );
  }

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" className={className}>
        {title}
      </a>
    );
  }

  return <span className="font-semibold text-foreground">{title}</span>;
}

function IconTooltip({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" surface="soft" radius="sm" size="sm">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function SimplePortfolio({
  latestAgenda,
  latestPost,
  onChooseExperience,
}: SimplePortfolioProps) {
  const locale = useLocale();
  const t = useTranslations("Experience");
  const home = useTranslations("Home");
  const workingProjects = ALL_PROJECTS.filter(
    (project) => project.simpleOrder !== undefined,
  )
    .sort((a, b) => (b.simpleOrder ?? 0) - (a.simpleOrder ?? 0))
    .slice(0, 4);
  const madeProjects = ALL_PROJECTS.filter((project) => project.madeIt).slice(-2).reverse();
  const featuredTechnologies = TECHNOLOGY_STACK.flatMap((group) => group.items)
    .filter((technology) => technology.featured)
    .slice(0, 7);
  const latestLinks = [
    latestPost
      ? { id: "post", label: t("latestPost"), ...latestPost }
      : null,
    latestAgenda
      ? { id: "agenda", label: t("latestNewsletter"), ...latestAgenda }
      : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-x-hidden bg-background px-4 py-10 text-foreground sm:px-6">
      <PatternGrid
        aria-hidden="true"
        overlay
        color="var(--poyraz-border)"
        opacity={0.48}
        size={28}
        className="pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_78%)]"
      />

      <TooltipProvider delayDuration={180}>
        <main className="relative z-10 w-full max-w-2xl lg:-translate-x-8">
          <Card className="rounded-md border-border bg-background/96 p-5 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-7">
            <Typography
              variant="h2"
              component="h1"
              className="font-secondary text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
            >
              Poyraz Avsever
            </Typography>

            <Typography className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              {home("heroDescription")}
            </Typography>

            {latestLinks.length > 0 ? (
              <ul className="mt-6 space-y-2 text-sm">
                {latestLinks.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 leading-5">
                    <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      {item.label}:{" "}
                      <Link
                        href={item.href}
                        className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                      >
                        {item.title}
                      </Link>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <section className="mt-6" aria-labelledby="simple-working-title">
              <Typography id="simple-working-title" variant="large" component="h2" className="text-base">
                {t("workingOn")}
              </Typography>
              <ul className="mt-2.5 space-y-2.5">
                {workingProjects.map((project) => (
                  <li key={project.id} className="flex items-center gap-2.5 text-sm leading-5">
                    <Icon
                      icon={project.icon}
                      width={16}
                      height={16}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <ProjectTextLink project={project} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6" aria-labelledby="simple-made-title">
              <Typography id="simple-made-title" variant="large" component="h2" className="text-base">
                {t("made")}
              </Typography>
              <ul className="mt-2.5 space-y-2">
                {madeProjects.map((project) => (
                  <li key={project.id} className="flex items-center gap-2.5 text-sm">
                    <Icon
                      icon={project.icon}
                      width={16}
                      height={16}
                      className="shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <ProjectTextLink project={project} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2" aria-labelledby="simple-find-title">
              <Typography id="simple-find-title" variant="large" component="h2" className="mr-1 text-base">
                {t("findMe")}
              </Typography>
              {SOCIAL_LINKS.map((item) => (
                <IconTooltip key={item.id} label={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={item.label}
                    className="text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon icon={item.icon} width={19} height={19} />
                  </a>
                </IconTooltip>
              ))}
            </section>

            <section className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2" aria-labelledby="simple-tools-title">
              <Typography id="simple-tools-title" variant="large" component="h2" className="mr-1 text-base">
                {t("useThese")}
              </Typography>
              {featuredTechnologies.map((technology) => (
                <IconTooltip
                  key={technology.id}
                  label={getLocalizedValue(technology.label, locale)}
                >
                  <span
                    tabIndex={0}
                    className="inline-flex text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon icon={technology.icon} width={19} height={19} aria-hidden="true" />
                  </span>
                </IconTooltip>
              ))}
            </section>

            <div className="mt-6 flex justify-end border-t border-border pt-4">
              <IconTooltip label={t("chooseAgain")}>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon-sm"
                  radius="sm"
                  effect="shine"
                  aria-label={t("chooseAgain")}
                  onClick={onChooseExperience}
                  className="cursor-pointer"
                >
                  <Icon icon="mdi:view-grid-plus-outline" width={16} height={16} />
                </Button>
              </IconTooltip>
            </div>
          </Card>
        </main>
      </TooltipProvider>
    </div>
  );
}
