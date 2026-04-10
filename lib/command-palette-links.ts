import { certificates } from "@/data/certificates";
import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";
import {
  EXTENSIONS,
  FIGMA_TEMPLATES,
  MOBILE_APPS,
  WEB_APPS,
} from "@/data/projects";
import { REFERENCES } from "@/data/references";
import { VOLUNTEER_COMMUNITY_ITEMS } from "@/data/volunteer-community";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/links";

export type CommandPaletteItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  keywords?: string[];
};

export type CommandPaletteGroup = {
  id: string;
  heading: string;
  items: CommandPaletteItem[];
};

const navigationItems: CommandPaletteItem[] = NAV_LINKS.map((item) => ({
  id: item.id,
  label: item.label,
  href: item.href,
  icon: "mdi:compass-outline",
  keywords: [
    item.label,
    item.href,
    "sayfa",
    "navigasyon",
    "page",
    "navigation",
  ],
}));

const socialItems: CommandPaletteItem[] = SOCIAL_LINKS.map((item) => ({
  id: item.id,
  label: item.label,
  href: item.href,
  icon: item.icon,
  external: true,
  keywords: [item.label, "sosyal", "profil", "social", "profile"],
}));

const blogItems: CommandPaletteItem[] = [
  {
    id: "blog-index",
    label: "Blog",
    href: "/blog",
    icon: "mdi:file-document-outline",
    keywords: ["blog", "yazı", "article", "post"],
  },
  {
    id: "blog-content-page",
    label: "Video ve Notlar",
    href: "/content",
    icon: "mdi:video-outline",
    keywords: ["video", "youtube", "not", "pdf", "içerik", "content"],
  },
];

const aboutItems: CommandPaletteItem[] = [
  ...EDUCATION.map((item) => ({
    id: `education-${item.id}`,
    label: item.title,
    href: "/about",
    icon: "mdi:school-outline",
    keywords: [
      item.institution,
      item.period,
      item.description,
      "eğitim",
      "education",
      "about",
    ],
  })),
  ...EXPERIENCE.map((item) => ({
    id: `experience-${item.id}`,
    label: item.role,
    href: "/about",
    icon: "mdi:briefcase-outline",
    keywords: [item.company, item.period, "deneyim", "experience", "about"],
  })),
  ...certificates.map((item, index) => ({
    id: `certificate-${index}`,
    label: item.name,
    href: "/about",
    icon: "mdi:certificate-outline",
    keywords: [
      item.organization,
      item.date,
      item.category,
      item.description,
      "sertifika",
      "certificate",
    ],
  })),
  ...REFERENCES.map((item) => ({
    id: `reference-${item.id}`,
    label: `Referans: ${item.author}`,
    href: "/about/references",
    icon: "mdi:account-voice-outline",
    keywords: [
      item.role,
      item.quote,
      "referans",
      "yorum",
      "reference",
      "testimonial",
    ],
  })),
  ...VOLUNTEER_COMMUNITY_ITEMS.map((item) => ({
    id: `volunteer-${item.id}`,
    label: item.title,
    href: "/about/volunteer-community",
    icon: "mdi:hand-heart-outline",
    keywords: [
      item.timeline,
      item.focus,
      item.link ?? "",
      "gönüllülük",
      "topluluk",
      "volunteer",
      "community",
    ],
  })),
];

const projectItems: CommandPaletteItem[] = [
  ...MOBILE_APPS.map((item) => ({
    id: `mobile-project-${item.id}`,
    label: item.title,
    href: "/projects",
    icon: "mdi:cellphone",
    keywords: [
      item.description,
      item.badge ?? "",
      "mobil",
      "proje",
      "mobile",
      "project",
    ],
  })),
  ...WEB_APPS.map((item) => ({
    id: `web-project-${item.id}`,
    label: item.title,
    href: item.href ?? "/projects",
    icon: "mdi:web",
    external: Boolean(item.href),
    keywords: [item.description, item.badge ?? "", "web", "proje", "project"],
  })),
  ...EXTENSIONS.map((item) => ({
    id: `extension-project-${item.id}`,
    label: item.title,
    href: item.href ?? "/projects",
    icon: "mdi:puzzle-outline",
    external: Boolean(item.href),
    keywords: [
      item.description,
      item.badge ?? "",
      "extension",
      "eklenti",
      "proje",
      "project",
    ],
  })),
  ...FIGMA_TEMPLATES.map((item) => ({
    id: `figma-project-${item.id}`,
    label: item.title,
    href: item.href ?? "/projects",
    icon: "mdi:figma",
    external: Boolean(item.href),
    keywords: [
      item.description,
      item.badge ?? "",
      "figma",
      "şablon",
      "template",
    ],
  })),
];

const contentItems: CommandPaletteItem[] = YOUTUBE_VIDEO_LINKS.map(
  (item, index) => ({
    id: `youtube-video-${index + 1}`,
    label: `YouTube Videosu ${index + 1}`,
    href: item,
    icon: "mdi:youtube",
    external: true,
    keywords: [item, "youtube", "video", "içerik", "content"],
  }),
);

export const COMMAND_PALETTE_GROUPS: CommandPaletteGroup[] = [
  {
    id: "navigation",
    heading: "Sayfalar",
    items: navigationItems,
  },
  {
    id: "blog-data",
    heading: "Blog İçerikleri",
    items: blogItems,
  },
  {
    id: "about-data",
    heading: "Hakkımda",
    items: aboutItems,
  },
  {
    id: "projects-data",
    heading: "Projeler",
    items: projectItems,
  },
  {
    id: "content-data",
    heading: "İçerikler",
    items: contentItems,
  },
  {
    id: "social",
    heading: "Sosyal",
    items: socialItems,
  },
] as const;
