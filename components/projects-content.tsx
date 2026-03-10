import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Badge, Card, Typography } from "poyraz-ui/atoms";
import { ImageCard } from "poyraz-ui/molecules";
import { FIGMA_TEMPLATES, MOBILE_APPS, WEB_APPS, type ProjectItem } from "@/data/projects";
import { getGithubRepos, getNpmPackages } from "@/lib/project-feeds";

function getLanguageMeta(language: string) {
  const key = language.toLowerCase();

  if (key.includes("typescript")) {
    return { icon: "vscode-icons:file-type-typescript-official", color: "text-blue-600" };
  }
  if (key.includes("javascript")) {
    return { icon: "vscode-icons:file-type-js-official", color: "text-amber-500" };
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

function ProjectSection({ title, items }: { title: string; items: ProjectItem[] }) {
  return (
    <section className="space-y-2">
      <Typography variant="large" className="text-base">
        {title}
      </Typography>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {items.map((item) => (
          <ImageCard
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            badge={item.badge}
            href={item.href}
            className="aspect-square rounded-sm border-border"
          />
        ))}
      </div>
    </section>
  );
}

export async function ProjectsContent() {
  const [repos, npmPackages] = await Promise.all([getGithubRepos(), getNpmPackages()]);

  return (
    <section className="flex h-full flex-col gap-3 overflow-y-auto">
      <Card className="rounded-sm border-border bg-background p-2">
        <div className="overflow-x-auto rounded-sm">
          <Image
            src="https://ghchart.rshah.org/dc2626/poyrazavsever"
            alt="GitHub contribution activity for poyrazavsever"
            width={820}
            height={120}
            className="h-auto w-full min-w-[740px]"
            unoptimized
          />
        </div>
      </Card>

      <ProjectSection title="Mobile Apps" items={MOBILE_APPS} />
      <ProjectSection title="Web Apps" items={WEB_APPS} />
      <ProjectSection title="Figma Templates" items={FIGMA_TEMPLATES} />

      <section className="space-y-2">
        <Typography variant="large" className="text-base">
          npm paketleri (@poyrazavsever)
        </Typography>
        <div className="grid gap-2 md:grid-cols-2">
          {npmPackages.length === 0 ? (
            <Card className="rounded-sm border-border p-3 md:col-span-2">
              <Typography variant="small" className="text-muted-foreground">
                npm API response is empty right now.
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
                  <Typography variant="large" className="text-base leading-tight">
                    {pkg.name}
                  </Typography>
                  <Typography variant="small" className="mt-1 flex-1 line-clamp-3 text-muted-foreground">
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

      <section className="space-y-2">
        <Typography variant="large" className="text-base">
          GitHub Repos (@poyrazavsever)
        </Typography>
        <div className="grid gap-2 md:grid-cols-2">
          {repos.length === 0 ? (
            <Card className="rounded-sm border-border p-3 md:col-span-2">
              <Typography variant="small" className="text-muted-foreground">
                GitHub API response is empty right now.
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
                    <Typography variant="large" className="text-base leading-tight">
                      {repo.name}
                    </Typography>
                    <Typography variant="small" className="mt-1 flex-1 line-clamp-4 text-muted-foreground">
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
                          <Icon icon="mdi:star" width={14} height={14} className="text-amber-500" />
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
