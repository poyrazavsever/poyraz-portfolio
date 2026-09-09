export const NAV_LINKS = [
  { id: "about", label: "Hakkımda", href: "/about" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "content", label: "İçerikler", href: "/content" },
  { id: "projects", label: "Projeler", href: "/projects" },
  { id: "gallery", label: "Galeri", href: "/gallery" },
  { id: "contact", label: "İletişim", href: "/contact" },
] as const;

export const TRACKED_SOCIAL_HREFS = {
  linkedin: "https://go.poyrazavsever.com/linkedin-website",
  github: "https://go.poyrazavsever.com/github-website",
  instagram: "https://go.poyrazavsever.com/instagram-website",
  youtube: "https://go.poyrazavsever.com/youtube-website",
  medium: "https://go.poyrazavsever.com/medium-website",
  x: "https://go.poyrazavsever.com/x-website",
  behance: "https://go.poyrazavsever.com/behance-website",
  buyMeACoffee: "https://go.poyrazavsever.com/buy-me-a-coffee-website",
} as const;

const TRACKED_BASE_URL = "https://go.poyrazavsever.com";

export const TRACKED_EXTERNAL_HREFS = {
  uiKit: `${TRACKED_BASE_URL}/ui-kit-website`,
  weeksJs: `${TRACKED_BASE_URL}/52-weeks-js-website`,
  cvTr: `${TRACKED_BASE_URL}/cv-tr-website`,
  cvEn: `${TRACKED_BASE_URL}/cv-en-website`,
  npmProfile: `${TRACKED_BASE_URL}/npm-profile-website`,
  targiz: `${TRACKED_BASE_URL}/targiz-project-website`,
  ostim: `${TRACKED_BASE_URL}/ostim-project-website`,
  ostimEmployment: `${TRACKED_BASE_URL}/ostim-employment-project-website`,
  ostimForeignTrade: `${TRACKED_BASE_URL}/ostim-foreign-trade-project-website`,
  arcForeignTrade: `${TRACKED_BASE_URL}/arc-foreign-trade-project-website`,
  ataturkChronology: `${TRACKED_BASE_URL}/ataturk-chronology-project-website`,
  mockupFactory: `${TRACKED_BASE_URL}/mockup-factory-project-website`,
  ohhike: `${TRACKED_BASE_URL}/ohhike-project-website`,
  neta: `${TRACKED_BASE_URL}/neta-project-website`,
  shortcutInjector: `${TRACKED_BASE_URL}/shortcut-injector-project-website`,
  tabAudioRelay: `${TRACKED_BASE_URL}/tab-audio-relay-project-website`,
  hsdFigma: `${TRACKED_BASE_URL}/hsd-figma-project-website`,
  restaurantMenuFigma: `${TRACKED_BASE_URL}/restaurant-menu-figma-website`,
} as const;

const TRACKED_NPM_PACKAGES: Record<string, string> = {
  "poyraz-ui": `${TRACKED_BASE_URL}/npm-poyraz-ui-website`,
  "reactive-image": `${TRACKED_BASE_URL}/npm-reactive-image-website`,
  "reactive-switcher": `${TRACKED_BASE_URL}/npm-reactive-switcher-website`,
};

export function getTrackedNpmPackageHref(name: string, fallback: string) {
  return TRACKED_NPM_PACKAGES[name] ?? fallback;
}

export const SOCIAL_LINKS = [
  {
    id: "email",
    label: "E-posta",
    href: "mailto:poyrazavsever@gmail.com",
    icon: "mdi:email",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: TRACKED_SOCIAL_HREFS.linkedin,
    icon: "mdi:linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    href: TRACKED_SOCIAL_HREFS.github,
    icon: "mdi:github",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: TRACKED_SOCIAL_HREFS.instagram,
    icon: "mdi:instagram",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: TRACKED_SOCIAL_HREFS.youtube,
    icon: "mdi:youtube",
  },
  {
    id: "medium",
    label: "Medium",
    href: TRACKED_SOCIAL_HREFS.medium,
    icon: "mdi:medium",
  },
  {
    id: "x",
    label: "X",
    href: TRACKED_SOCIAL_HREFS.x,
    icon: "ri:twitter-x-fill",
  },
  {
    id: "behance",
    label: "Behance",
    href: TRACKED_SOCIAL_HREFS.behance,
    icon: "mdi:behance",
  },
  {
    id: "buy-me-a-coffee",
    label: "Bana kahve ısmarla",
    href: TRACKED_SOCIAL_HREFS.buyMeACoffee,
    icon: "mdi:coffee",
  },
] as const;

export const NAV_DROPDOWN_GROUPS = [
  {
    id: "others",
    label: "Diğerleri",
    icon: "mdi:dots-horizontal",
    insertAfter: "gallery",
    items: [
      {
        id: "agenda",
        label: "Haftalık Gündem",
        href: "/agenda",
        icon: "mdi:newspaper-variant-outline",
        external: false,
        keywords: ["gündem", "agenda", "newsletter", "haftalık", "weekly", "haber"],
      },
      {
        id: "animationResources",
        label: "Animasyon Kaynakları",
        href: "/animation-sources",
        icon: "mdi:motion-play-outline",
        external: false,
        keywords: ["animasyon", "animation", "kaynak", "resource", "motion"],
      },
      {
        id: "technologies",
        label: "Teknolojiler",
        href: "/technologies",
        icon: "mdi:layers-triple-outline",
        external: false,
        keywords: [
          "teknolojiler",
          "technologies",
          "tech stack",
          "araçlar",
          "tools",
          "skills",
        ],
      },
    ],
  },
] as const;

export const TOP_ICON_LINKS = [
  {
    id: "ui-kit",
    label: "UI Kit",
    href: TRACKED_EXTERNAL_HREFS.uiKit,
    icon: "mdi:palette-swatch-outline",
    external: true,
  },
  {
    id: "52-weeks-js",
    label: "52 Weeks of JS",
    href: TRACKED_EXTERNAL_HREFS.weeksJs,
    icon: "mdi:code-json",
    external: true,
  },
  {
    id: "rss",
    label: "RSS",
    href: "/rss.xml",
    icon: "mdi:rss",
    external: false,
  },
  {
    id: "cv",
    label: "Özgeçmiş",
    href: "/resume.pdf",
    icon: "mdi:file-account-outline",
    external: false,
  },
] as const;

export function getResumeHref(locale: string) {
  return locale === "en"
    ? TRACKED_EXTERNAL_HREFS.cvEn
    : TRACKED_EXTERNAL_HREFS.cvTr;
}

export type LinkDirectoryCategory = "navigation" | "social" | "resources";

export type LinkDirectoryItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  external: boolean;
  category: LinkDirectoryCategory;
  keywords: string[];
};

export const LINK_DIRECTORY_CATEGORIES: ReadonlyArray<{
  id: LinkDirectoryCategory;
  label: string;
}> = [
  { id: "navigation", label: "Sayfalar" },
  { id: "social", label: "Sosyal" },
  { id: "resources", label: "Kaynaklar" },
];

const STATIC_PAGE_LINKS = [
  {
    id: "home",
    label: "Ana Sayfa",
    href: "/",
    icon: "mdi:home-outline",
    keywords: ["ana sayfa", "home", "portfolio"],
  },
  ...NAV_LINKS.map((item) => ({
    ...item,
    icon: "mdi:compass-outline",
    keywords: [item.label, item.href, "sayfa", "navigasyon", "internal"],
  })),
  ...NAV_DROPDOWN_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      icon: item.icon,
      keywords: [...item.keywords],
    })),
  ),
  {
    id: "references",
    label: "Referanslar",
    href: "/about/references",
    icon: "mdi:comment-quote-outline",
    keywords: ["referans", "references", "testimonial", "yorum"],
  },
  {
    id: "volunteerCommunity",
    label: "Gönüllülük ve Topluluk",
    href: "/about/volunteer-community",
    icon: "mdi:account-group-outline",
    keywords: ["gönüllülük", "topluluk", "volunteer", "community"],
  },
  {
    id: "mediaKit",
    label: "Medya Kiti",
    href: "/media-kit",
    icon: "mdi:chart-box-outline",
    keywords: ["medya kiti", "media kit", "sponsor", "iş birliği"],
  },
  {
    id: "links",
    label: "Bağlantılar",
    href: "/links",
    icon: "mdi:link-variant",
    keywords: ["bağlantılar", "links", "link in bio"],
  },
] as const;

export const LINK_DIRECTORY: LinkDirectoryItem[] = [
  ...STATIC_PAGE_LINKS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
    external: false,
    category: "navigation" as const,
    keywords: [...item.keywords],
  })),
  ...SOCIAL_LINKS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
    external: true,
    category: "social" as const,
    keywords: [item.label, item.href, "sosyal", "profile", "platform"],
  })),
  ...TOP_ICON_LINKS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
    external: item.external,
    category: "resources" as const,
    keywords: [item.label, item.href, "kaynak", "resource", "quick"],
  })),
];
