import { Link } from "@/i18n/routing";
import { Icon } from "@iconify/react";
import {
  Badge,
  Button,
  ButtonIcon,
  ButtonLabel,
  Card,
  Typography,
} from "poyraz-ui/atoms";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { GithubContributionGraph } from "@/components/github-contribution-graph";
import { ProjectFolderCard } from "@/components/project-folder-card";
import { PROJECT_FOLDERS } from "@/data/project-folders";
import {
  getGithubContributions,
  getGithubRepos,
  getNpmPackages,
} from "@/lib/project-feeds";
import { TRACKED_EXTERNAL_HREFS } from "@/lib/links";
import { getTranslations, getLocale } from "next-intl/server";
import { TRACKED_SOCIAL_HREFS } from "@/lib/links";

function getLanguageMeta(language: string) {
  const key = language.toLowerCase();

  if (key.includes("typescript")) {
    return {
      icon: "vscode-icons:file-type-typescript-official",
      color: "text-blue-600",
    };
  }
  if (key.includes("javascript")) {
    return {
      icon: "vscode-icons:file-type-js-official",
      color: "text-amber-500",
    };
  }
  if (key.includes("python")) {
    return { icon: "vscode-icons:file-type-python", color: "text-yellow-600" };
  }
  if (key.includes("go")) {
    return { icon: "vscode-icons:file-type-go", color: "text-cyan-600" };
  }
  if (key.includes("rust")) {
    return { icon: "vscode-icons:file-type-rust", color: "text-orange-600" };
  }
  if (key.includes("java")) {
    return { icon: "vscode-icons:file-type-java", color: "text-red-600" };
  }
  if (key.includes("html")) {
    return { icon: "vscode-icons:file-type-html", color: "text-orange-500" };
  }
  if (key.includes("css")) {
    return { icon: "vscode-icons:file-type-css", color: "text-blue-500" };
  }

  return { icon: "mdi:code-tags", color: "text-zinc-500" };
}

export async function ProjectsContent() {
  const t = await getTranslations("Projects");
  const locale = await getLocale();

  const [repos, npmPackages, contributions] = await Promise.all([
    getGithubRepos(),
    getNpmPackages(),
    getGithubContributions(),
  ]);

  return (
    <section className="flex h-full flex-col gap-8 overflow-y-auto md:gap-10">
      <section className="space-y-3">
        <div className="space-y-1">
          <Typography variant="large" className="text-base">
            {t("sections.folders")}
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            {t("foldersDescription")}
          </Typography>
        </div>
        <StaggerContainer className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PROJECT_FOLDERS.map((folder, index) => (
            <StaggerItem key={folder.slug}>
              <ProjectFolderCard
                folder={folder}
                locale={locale}
                countLabel={t("projectCount")}
                priority={index === 0}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <Card className="rounded-sm border-border bg-background p-2">
        <GithubContributionGraph
          days={contributions}
          locale={locale}
          labels={{
            calendar: t("contributionCalendar"),
            unavailable: t("contributionUnavailable"),
            none: t("noContributions"),
            singular: t("contributionSingular"),
            plural: t("contributionPlural"),
          }}
        />
      </Card>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Typography variant="large" className="text-base">
            {t("sections.npmPackages")}
          </Typography>
          <Button asChild variant="outline" size="xs" radius="sm">
            <a
              href={TRACKED_EXTERNAL_HREFS.npmProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon>
                <Icon icon="mdi:npm" width={16} height={16} />
              </ButtonIcon>
              <ButtonLabel>{t("viewNpmPackages")}</ButtonLabel>
            </a>
          </Button>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {npmPackages.length === 0 ? (
            <Card className="rounded-sm border-border p-3 md:col-span-2">
              <Typography variant="small" className="text-muted-foreground">
                {t("emptyNpm")}
              </Typography>
            </Card>
          ) : (
            npmPackages.map((pkg) => (
              <Link
                key={pkg.name}
                href={pkg.npmUrl}
                target="_blank"
                rel="noreferrer"
                className="block h-full no-underline text-inherit"
              >
                <Card className="flex h-full flex-col rounded-sm border-border p-3 transition-colors hover:border-zinc-700">
                  <Typography
                    variant="large"
                    className="text-base leading-tight"
                  >
                    {pkg.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="mt-1 flex-1 line-clamp-3 text-muted-foreground"
                  >
                    {pkg.description}
                  </Typography>
                  <div className="mt-2">
                    <Badge className="rounded-sm">v{pkg.version}</Badge>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Typography variant="large" className="text-base">
            {t("sections.githubRepos")}
          </Typography>
          <Button asChild variant="outline" size="xs" radius="sm">
            <a
              href={TRACKED_SOCIAL_HREFS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonIcon>
                <Icon icon="mdi:github" width={16} height={16} />
              </ButtonIcon>
              <ButtonLabel>{t("visitGithub")}</ButtonLabel>
            </a>
          </Button>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {repos.length === 0 ? (
            <Card className="rounded-sm border-border p-3 md:col-span-2">
              <Typography variant="small" className="text-muted-foreground">
                {t("emptyGithub")}
              </Typography>
            </Card>
          ) : (
            repos.map((repo) => {
              const languageMeta = getLanguageMeta(repo.language);

              return (
                <Link
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full no-underline text-inherit"
                >
                  <Card className="flex h-full flex-col rounded-sm border-border p-3 transition-colors hover:border-zinc-700">
                    <Typography
                      variant="large"
                      className="text-base leading-tight"
                    >
                      {repo.name}
                    </Typography>
                    <Typography
                      variant="small"
                      className="mt-1 flex-1 line-clamp-4 text-muted-foreground"
                    >
                      {repo.description}
                    </Typography>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="rounded-sm">
                        <span className="inline-flex items-center gap-1">
                          <Icon
                            icon={languageMeta.icon}
                            width={14}
                            height={14}
                            className={languageMeta.color}
                          />
                          <span>{repo.language}</span>
                        </span>
                      </Badge>
                      <Badge variant="outline" className="rounded-sm">
                        <span className="inline-flex items-center gap-1">
                          <Icon
                            icon="mdi:star"
                            width={14}
                            height={14}
                            className="text-amber-500"
                          />
                          <span>{repo.stars}</span>
                        </span>
                      </Badge>
                    </div>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}
