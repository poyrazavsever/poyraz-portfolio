import {
  DESIGNS,
  EXTENSIONS,
  PRODUCTS,
  WORK_PROJECTS,
  type ProjectItem,
} from "@/data/projects";

export type ProjectFolderSlug = "work" | "products" | "extensions" | "designs";

export type ProjectFolder = {
  slug: ProjectFolderSlug;
  icon: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  items: ProjectItem[];
};

export const PROJECT_FOLDERS: ProjectFolder[] = [
  {
    slug: "work",
    icon: "mdi:briefcase-outline",
    title: {
      tr: "İş Projeleri",
      en: "Work Projects",
    },
    description: {
      tr: "Kurumlar, müşteriler ve ekiplerle birlikte geliştirdiğim; gerçek kullanıcıya ulaşan portal ve platformlar.",
      en: "Portals and platforms I built with organizations, clients, and teams that ship to real users.",
    },
    items: WORK_PROJECTS,
  },
  {
    slug: "products",
    icon: "mdi:rocket-launch-outline",
    title: {
      tr: "Ürünler",
      en: "Products",
    },
    description: {
      tr: "Kendi fikrimden çıkan, uçtan uca tasarlayıp geliştirdiğim self-hosted ve açık kaynak ürünler.",
      en: "Self-hosted and open-source products I designed and built end to end from my own ideas.",
    },
    items: PRODUCTS,
  },
  {
    slug: "extensions",
    icon: "mdi:puzzle-outline",
    title: {
      tr: "Extension'lar",
      en: "Extensions",
    },
    description: {
      tr: "Günlük tarayıcı akışını hızlandıran, çapraz tarayıcı çalışan eklentiler.",
      en: "Cross-browser extensions that speed up everyday browsing workflows.",
    },
    items: EXTENSIONS,
  },
  {
    slug: "designs",
    icon: "mdi:palette-outline",
    title: {
      tr: "Tasarımlar",
      en: "Designs",
    },
    description: {
      tr: "Figma üzerinde hazırladığım arayüz tasarımları ve topluluk şablonları.",
      en: "Interface designs and community templates I created in Figma.",
    },
    items: DESIGNS,
  },
];

export const PROJECT_FOLDER_SLUGS = PROJECT_FOLDERS.map(
  (folder) => folder.slug,
);

export const ALL_PROJECTS: ProjectItem[] = PROJECT_FOLDERS.flatMap(
  (folder) => folder.items,
);

export function getProjectFolder(slug: string) {
  return PROJECT_FOLDERS.find((folder) => folder.slug === slug);
}

export function getProjectFolderPath(slug: ProjectFolderSlug) {
  return `/projects/folders/${slug}`;
}
