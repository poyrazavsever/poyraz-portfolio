const USERNAME = "poyrazavsever";

export type GithubRepo = {
  id: number;
  name: string;
  htmlUrl: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
};

export type NpmPackage = {
  name: string;
  version: string;
  description: string;
  npmUrl: string;
};

export type GithubActivity = {
  id: string;
  type: string;
  repo: string;
  createdAt: string;
};

export type GithubContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GithubRepoApi = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

type NpmSearchResponse = {
  objects?: Array<{
    package?: {
      name?: string;
      version?: string;
      description?: string;
      links?: {
        npm?: string;
      };
    };
  }>;
};

type GithubEventApi = {
  id: string;
  type: string;
  repo?: {
    name?: string;
  };
  created_at: string;
};

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12&type=owner`,
      {
        next: { revalidate: 1800 },
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-new",
        },
      },
    );

    if (!response.ok) return [];
    const data = (await response.json()) as GithubRepoApi[];

    return data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      htmlUrl: repo.html_url,
      description: repo.description ?? "No description",
      language: repo.language ?? "Unknown",
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
    }));
  } catch {
    return [];
  }
}

export async function getNpmPackages(): Promise<NpmPackage[]> {
  try {
    const response = await fetch(
      `https://registry.npmjs.org/-/v1/search?text=maintainer:${USERNAME}&size=12`,
      {
        next: { revalidate: 1800 },
      },
    );

    if (!response.ok) return [];
    const data = (await response.json()) as NpmSearchResponse;
    const items = data.objects ?? [];

    return items
      .map((item) => item.package)
      .filter((pkg): pkg is NonNullable<typeof pkg> => Boolean(pkg?.name))
      .map((pkg) => ({
        name: pkg.name ?? "unknown-package",
        version: pkg.version ?? "-",
        description: pkg.description ?? "No description",
        npmUrl: pkg.links?.npm ?? `https://www.npmjs.com/package/${pkg.name}`,
      }));
  } catch {
    return [];
  }
}

export async function getGithubActivity(): Promise<GithubActivity[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=6`, {
      next: { revalidate: 600 },
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-new",
      },
    });

    if (!response.ok) return [];
    const data = (await response.json()) as GithubEventApi[];

    return data.map((event) => ({
      id: event.id,
      type: event.type,
      repo: event.repo?.name ?? "unknown-repo",
      createdAt: event.created_at,
    }));
  } catch {
    return [];
  }
}

export function parseGithubContributions(
  html: string,
): GithubContributionDay[] {
  const contributions: GithubContributionDay[] = [];
  const cellPattern =
    /<td\b([^>]*\bdata-date="[^"]+"[^>]*)><\/td>\s*<tool-tip\b[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(cellPattern)) {
    const attributes = match[1];
    const tooltip = match[2].replace(/<[^>]+>/g, "").trim();
    const date = attributes.match(/data-date="([^"]+)"/)?.[1];
    const levelValue = attributes.match(/data-level="([0-4])"/)?.[1];
    const countValue = tooltip.match(/^([\d,]+)\s+contributions?\b/i)?.[1];

    if (!date || levelValue === undefined) continue;

    contributions.push({
      date,
      count: countValue ? Number(countValue.replaceAll(",", "")) : 0,
      level: Number(levelValue) as GithubContributionDay["level"],
    });
  }

  return contributions.sort((first, second) =>
    first.date.localeCompare(second.date),
  );
}

export async function getGithubContributions(): Promise<
  GithubContributionDay[]
> {
  try {
    const response = await fetch(
      `https://github.com/users/${USERNAME}/contributions`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "text/html",
          "User-Agent": "portfolio-new",
        },
      },
    );

    if (!response.ok) return [];

    return parseGithubContributions(await response.text());
  } catch {
    return [];
  }
}
