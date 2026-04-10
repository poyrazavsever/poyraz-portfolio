export const NAV_LINKS = [
  { id: "about", label: "Hakkımda", href: "/about" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "content", label: "İçerikler", href: "/content" },
  { id: "projects", label: "Projeler", href: "/projects" },
  { id: "gallery", label: "Galeri", href: "/gallery" },
  { id: "contact", label: "İletişim", href: "/contact" },
] as const;

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
    href: "https://www.linkedin.com/in/poyrazavsever/",
    icon: "mdi:linkedin",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/poyrazavsever",
    icon: "mdi:github",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/poyraz_avsever",
    icon: "mdi:instagram",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@poyrazavsever",
    icon: "mdi:youtube",
  },
  {
    id: "medium",
    label: "Medium",
    href: "https://medium.com/@poyrazavsever",
    icon: "mdi:medium",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/poyrazavsever",
    icon: "ri:twitter-x-fill",
  },
  {
    id: "behance",
    label: "Behance",
    href: "https://behance.net/poyrazavsever",
    icon: "mdi:behance",
  },
  {
    id: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/user/3136fdjkc5p4cbzmuxhvqdd4b2hu",
    icon: "mdi:spotify",
  },
  {
    id: "buy-me-a-coffee",
    label: "Bana kahve ısmarla",
    href: "https://buymeacoffee.com/poyrazavsever",
    icon: "mdi:coffee",
  },
] as const;

export const TOP_ICON_LINKS = [
  {
    id: "ui-kit",
    label: "UI Kit",
    href: "https://ui.poyrazavsever.com",
    icon: "mdi:palette-swatch-outline",
    external: true,
  },
  {
    id: "52-weeks-js",
    label: "52 Weeks of JS",
    href: "https://js.poyrazavsever.com",
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

export const LINK_DIRECTORY: LinkDirectoryItem[] = [
  ...NAV_LINKS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: "mdi:compass-outline",
    external: false,
    category: "navigation" as const,
    keywords: [item.label, item.href, "sayfa", "navigasyon", "internal"],
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
