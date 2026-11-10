import {
  DESIGNS,
  EXTENSIONS,
  FREELANCE_PROJECTS,
  MY_AKADEMI_PROJECTS,
  PRODUCTS,
  WORK_PROJECTS,
  type ProjectItem,
} from "@/data/projects";

export type ProjectFolderSlug =
  | "work"
  | "products"
  | "freelance"
  | "extensions"
  | "designs"
  | "my-akademi";

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
      tr: "Fikirden yayına kadar uçtan uca tasarlayıp geliştirdiğim girişim, self-hosted ve açık kaynak ürünler.",
      en: "Startup, self-hosted, and open-source products I designed and built end to end, from idea to launch.",
    },
    items: PRODUCTS,
  },
  {
    slug: "freelance",
    icon: "mdi:handshake-outline",
    title: {
      tr: "Freelance",
      en: "Freelance",
    },
    description: {
      tr: "İşletmeler için uçtan uca tasarlayıp geliştirdiğim, canlıda çalışan müşteri projeleri.",
      en: "Client projects I designed and built end to end for businesses, running live in production.",
    },
    items: FREELANCE_PROJECTS,
  },
  {
    slug: "extensions",
    icon: "mdi:puzzle-outline",
    title: {
      tr: "Extension'lar",
      en: "Extensions",
    },
    description: {
      tr: "Günlük tarayıcı akışını hızlandıran eklentiler ve tamamen tarayıcıda çalışan araçlar.",
      en: "Extensions and fully in-browser tools that speed up everyday browsing workflows.",
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
  {
    slug: "my-akademi",
    icon: "mdi:school-outline",
    title: {
      tr: "M&Y Akademi",
      en: "M&Y Academy",
    },
    description: {
      tr: "Dahil olduğum M&Y Yazılım Eğitim Akademi bootcamp'inde geliştirdiğim projeler.",
      en: "Projects I built during the M&Y Software Academy bootcamp I'm part of.",
    },
    items: MY_AKADEMI_PROJECTS,
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
