import Image from "next/image";
import { Icon } from "@iconify/react";
import { getTranslations } from "next-intl/server";
import {
  Badge,
  Button,
  ButtonIcon,
  ButtonLabel,
  Card,
  Typography,
} from "poyraz-ui/atoms";
import type { ProjectCaseStudy } from "@/data/project-case-studies";
import { Link } from "@/i18n/routing";

type ProjectCaseStudyContentProps = {
  project: ProjectCaseStudy;
};

const TECHNOLOGY_ICONS: Record<string, string> = {
  ".NET 10": "logos:dotnet",
  "Minimal APIs": "mdi:api",
  "EF Core": "logos:dotnet",
  PostgreSQL: "logos:postgresql",
  "Angular 20": "logos:angular-icon",
  "Angular Material": "simple-icons:angular",
  "Tailwind CSS": "logos:tailwindcss-icon",
  Astro: "logos:astro-icon",
  Liquid: "mdi:code-braces",
  Fluid: "mdi:water-outline",
  Docker: "logos:docker-icon",
  "Docker Compose": "logos:docker-icon",
  "Next.js": "logos:nextjs-icon",
  React: "logos:react",
  "React Native": "logos:react",
  TypeScript: "logos:typescript-icon",
  "Express.js": "skill-icons:expressjs-light",
  "AI Integrations": "mdi:robot-outline",
  "Self-hosting": "mdi:server-outline",
  Vite: "logos:vitejs",
  "Better Auth": "mdi:shield-account-outline",
  SQLite: "logos:sqlite",
  "Drizzle ORM": "simple-icons:drizzle",
  pnpm: "logos:pnpm",
  Turborepo: "logos:turborepo-icon",
  nginx: "logos:nginx",
  Dokploy: "simple-icons:dokploy",
  Supabase: "logos:supabase-icon",
  "İŞKUR API": "mdi:briefcase-search-outline",
  "Gemini AI": "logos:google-gemini",
};

function getTechnologyIcon(technology: string) {
  return TECHNOLOGY_ICONS[technology] ?? "mdi:code-tags";
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="h3" className="border-b border-border pb-3">
      {children}
    </Typography>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-7 text-foreground/80">
          <Icon
            icon="mdi:check-circle-outline"
            width={18}
            height={18}
            className="mt-1.5 shrink-0 text-red-600"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export async function ProjectCaseStudyContent({
  project,
}: ProjectCaseStudyContentProps) {
  const t = await getTranslations({
    locale: project.locale,
    namespace: "ProjectCaseStudy",
  });

  return (
    <article className="h-full overflow-y-auto pb-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <Icon icon="mdi:arrow-left" width={16} height={16} aria-hidden="true" />
          {t("back")}
        </Link>

        <header className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-sm">{project.eyebrow}</Badge>
              <Badge variant="outline" className="rounded-sm">
                {project.context}
              </Badge>
            </div>

            <div className="space-y-3">
              <Typography variant="h2" className="text-3xl md:text-5xl">
                {project.title}
              </Typography>
              <Typography
                variant="p"
                className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg"
              >
                {project.summary}
              </Typography>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild radius="sm" effect="swap" swapTarget="both">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ButtonIcon>
                    <Icon icon="mdi:open-in-new" width={17} height={17} />
                  </ButtonIcon>
                  <ButtonLabel>{t("liveDemo")}</ButtonLabel>
                </a>
              </Button>
              {project.sourceUrl ? (
                <Button
                  asChild
                  variant="outline"
                  radius="sm"
                  effect="swap"
                  swapTarget="both"
                >
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ButtonIcon>
                      <Icon icon="mdi:github" width={17} height={17} />
                    </ButtonIcon>
                    <ButtonLabel>{t("sourceCode")}</ButtonLabel>
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <Card className="overflow-hidden rounded-sm border-border bg-muted/20 p-2">
            <Image
              src={project.image}
              alt={project.screenshotAlt}
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
              className="aspect-square h-auto w-full rounded-sm object-cover"
            />
          </Card>
        </header>

        <section className="space-y-4">
          <SectionTitle>{t("roleAndTeam")}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-3">
            {[
              {
                label: t("role"),
                value: project.role,
                icon: "mdi:account-hard-hat",
              },
              {
                label: t("team"),
                value: project.team,
                icon: "mdi:account-group-outline",
                href: project.teamUrl,
              },
              {
                label: t("context"),
                value: project.context,
                icon: "mdi:briefcase-outline",
              },
            ].map((item) => (
              <Card key={item.label} className="rounded-sm border-border p-4">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-sm bg-red-600/10 text-red-600">
                  <Icon icon={item.icon} width={18} height={18} aria-hidden="true" />
                </div>
                <Typography
                  variant="small"
                  className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {item.label}
                </Typography>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-start gap-1.5 text-sm font-semibold leading-6 text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-red-600 hover:decoration-red-600"
                  >
                    <span>{item.value}</span>
                    <Icon
                      icon="mdi:open-in-new"
                      width={14}
                      height={14}
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Typography variant="large" className="mt-1 text-sm leading-6">
                    {item.value}
                  </Typography>
                )}
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("overview")}</SectionTitle>
          <Card className="space-y-4 rounded-sm border-border p-5 md:p-6">
            {project.overview.map((paragraph) => (
              <Typography
                key={paragraph}
                variant="p"
                className="text-sm leading-7 text-foreground/85"
              >
                {paragraph}
              </Typography>
            ))}
          </Card>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("technologies")}</SectionTitle>
          <Card className="rounded-sm border-border p-5">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge
                  key={technology}
                  size="sm"
                  variant="outline"
                  className="rounded-sm px-2.5 py-1"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon
                      icon={getTechnologyIcon(technology)}
                      width={15}
                      height={15}
                      aria-hidden="true"
                    />
                    <span>{technology}</span>
                  </span>
                </Badge>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("problemConstraints")}</SectionTitle>
          <div className="grid gap-3 lg:grid-cols-2">
            <Card className="rounded-sm border-border p-5 md:p-6">
              <Typography variant="p" className="text-sm leading-7 text-foreground/85">
                {project.problem}
              </Typography>
            </Card>
            <Card className="rounded-sm border-border p-5 md:p-6">
              <Typography variant="large" className="mb-4 text-sm">
                {t("constraints")}
              </Typography>
              <BulletList items={project.constraints} />
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("architectureDecisions")}</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {project.decisions.map((decision, index) => (
              <Card key={decision.title} className="rounded-sm border-border p-5 md:p-6">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-sm bg-red-600 font-mono text-xs font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <Typography variant="large" className="text-base">
                  {decision.title}
                </Typography>
                <Typography
                  variant="p"
                  className="mt-2 text-sm leading-7 text-muted-foreground"
                >
                  {decision.description}
                </Typography>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("designProcess")}</SectionTitle>
          <Card className="grid gap-6 rounded-sm border-border p-5 md:grid-cols-[1fr_1.1fr] md:p-6">
            <Typography variant="p" className="text-sm leading-7 text-foreground/85">
              {project.designProcess}
            </Typography>
            <ol className="space-y-3 border-border md:border-l md:pl-6">
              {project.designSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-foreground/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-600/40 bg-red-600/10 font-mono text-[10px] font-semibold text-red-600">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        <section className="grid gap-3 lg:grid-cols-2">
          <Card className="rounded-sm border-border p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-amber-600">
              <Icon icon="mdi:alert-decagram-outline" width={21} height={21} />
              <Typography variant="large" className="text-base text-foreground">
                {t("challenge")}
              </Typography>
            </div>
            <Typography variant="p" className="text-sm leading-7 text-muted-foreground">
              {project.challenge}
            </Typography>
          </Card>
          <Card className="rounded-sm border-border p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <Icon icon="mdi:lightbulb-on-outline" width={21} height={21} />
              <Typography variant="large" className="text-base text-foreground">
                {t("solution")}
              </Typography>
            </div>
            <Typography variant="p" className="text-sm leading-7 text-muted-foreground">
              {project.solution}
            </Typography>
          </Card>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("results")}</SectionTitle>
          <div className="grid gap-2 md:grid-cols-3">
            {project.results.map((result) => (
              <Card key={result.label} className="rounded-sm border-border p-5">
                <Typography className="font-mono text-3xl font-semibold text-red-600">
                  {result.value}
                </Typography>
                <Typography variant="large" className="mt-2 text-sm">
                  {result.label}
                </Typography>
                <Typography
                  variant="small"
                  className="mt-1 block leading-6 text-muted-foreground"
                >
                  {result.description}
                </Typography>
              </Card>
            ))}
          </div>
          <Typography
            variant="small"
            className="block rounded-sm border border-dashed border-border px-4 py-3 leading-6 text-muted-foreground"
          >
            {project.metricsNote}
          </Typography>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("screenshots")}</SectionTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {project.screenshots.map((screenshot) => (
              <a
                key={screenshot.src}
                href={screenshot.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${screenshot.alt} — ${t("openScreenshot")}`}
                className="group block no-underline text-inherit"
              >
                <Card className="h-full overflow-hidden rounded-sm border-border transition-colors group-hover:border-red-600/40">
                  <div className="relative aspect-video overflow-hidden bg-muted/20">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                    <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-white/20 bg-black/65 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Icon icon="mdi:arrow-expand" width={17} height={17} aria-hidden="true" />
                    </span>
                  </div>
                  <Typography
                    variant="small"
                    className="block border-t border-border px-4 py-3 leading-6 text-muted-foreground"
                  >
                    {screenshot.caption}
                  </Typography>
                </Card>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionTitle>{t("repository")}</SectionTitle>
          <Card className="flex items-start gap-3 rounded-sm border-border p-5">
            <Icon
              icon={project.sourceUrl ? "mdi:source-repository" : "mdi:lock-outline"}
              width={20}
              height={20}
              className="mt-0.5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <Typography variant="small" className="leading-6 text-muted-foreground">
              {project.sourceNote}
            </Typography>
          </Card>
        </section>

      </div>
    </article>
  );
}
