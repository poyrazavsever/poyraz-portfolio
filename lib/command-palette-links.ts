import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/data/blog";
import { BLOG_DETAILS } from "@/data/blog-detail";
import { certificates } from "@/data/certificates";
import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";
import { FIGMA_TEMPLATES, MOBILE_APPS, WEB_APPS } from "@/data/projects";
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
  keywords: [item.label, item.href, "page", "navigation"],
}));

const socialItems: CommandPaletteItem[] = SOCIAL_LINKS.map((item) => ({
  id: item.id,
  label: item.label,
  href: item.href,
  icon: item.icon,
  external: true,
  keywords: [item.label, "social", "profile"],
}));

const blogItems: CommandPaletteItem[] = [
  ...BLOG_DETAILS.map((item) => ({
    id: `blog-detail-${item.slug}`,
    label: item.title,
    href: `/blog/${item.slug}`,
    icon: "mdi:post-outline",
    keywords: [item.category, item.author, item.excerpt, "blog", "article"],
  })),
  ...BLOG_ARTICLES.map((item, index) => ({
    id: `blog-article-${item.id}-${index}`,
    label: item.title,
    href: item.href,
    icon: "mdi:file-document-outline",
    keywords: [item.category, item.excerpt, item.readTime, "blog", "article"],
  })),
  ...BLOG_CATEGORIES.map((item) => ({
    id: `blog-category-${item}`,
    label: `Category: ${item}`,
    href: "/blog",
    icon: "mdi:tag-outline",
    keywords: [item, "blog", "category"],
  })),
];

const aboutItems: CommandPaletteItem[] = [
  ...EDUCATION.map((item) => ({
    id: `education-${item.id}`,
    label: item.title,
    href: "/about",
    icon: "mdi:school-outline",
    keywords: [item.institution, item.period, item.description, "education", "about"],
  })),
  ...EXPERIENCE.map((item) => ({
    id: `experience-${item.id}`,
    label: item.role,
    href: "/about",
    icon: "mdi:briefcase-outline",
    keywords: [item.company, item.period, "experience", "about"],
  })),
  ...certificates.map((item, index) => ({
    id: `certificate-${index}`,
    label: item.name,
    href: "/about",
    icon: "mdi:certificate-outline",
    keywords: [item.organization, item.date, item.category, item.description, "certificate"],
  })),
  ...REFERENCES.map((item) => ({
    id: `reference-${item.id}`,
    label: `Reference: ${item.author}`,
    href: "/about/references",
    icon: "mdi:account-voice-outline",
    keywords: [item.role, item.quote, "reference", "testimonial"],
  })),
  ...VOLUNTEER_COMMUNITY_ITEMS.map((item) => ({
    id: `volunteer-${item.id}`,
    label: item.title,
    href: "/about/volunteer-community",
    icon: "mdi:hand-heart-outline",
    keywords: [item.timeline, item.focus, item.link ?? "", "volunteer", "community"],
  })),
];

const projectItems: CommandPaletteItem[] = [
  ...MOBILE_APPS.map((item) => ({
    id: `mobile-project-${item.id}`,
    label: item.title,
    href: "/projects",
    icon: "mdi:cellphone",
    keywords: [item.description, item.badge ?? "", "mobile", "project"],
  })),
  ...WEB_APPS.map((item) => ({
    id: `web-project-${item.id}`,
    label: item.title,
    href: item.href ?? "/projects",
    icon: "mdi:web",
    external: Boolean(item.href),
    keywords: [item.description, item.badge ?? "", "web", "project"],
  })),
  ...FIGMA_TEMPLATES.map((item) => ({
    id: `figma-project-${item.id}`,
    label: item.title,
    href: item.href ?? "/projects",
    icon: "mdi:figma",
    external: Boolean(item.href),
    keywords: [item.description, item.badge ?? "", "figma", "template"],
  })),
];

const contentItems: CommandPaletteItem[] = YOUTUBE_VIDEO_LINKS.map((item, index) => ({
  id: `youtube-video-${index + 1}`,
  label: `YouTube Video ${index + 1}`,
  href: item,
  icon: "mdi:youtube",
  external: true,
  keywords: [item, "youtube", "video", "content"],
}));

export const COMMAND_PALETTE_GROUPS: CommandPaletteGroup[] = [
  {
    id: "navigation",
    heading: "Navigation",
    items: navigationItems,
  },
  {
    id: "blog-data",
    heading: "Blog Data",
    items: blogItems,
  },
  {
    id: "about-data",
    heading: "About Data",
    items: aboutItems,
  },
  {
    id: "projects-data",
    heading: "Projects Data",
    items: projectItems,
  },
  {
    id: "content-data",
    heading: "Content Data",
    items: contentItems,
  },
  {
    id: "social",
    heading: "Social",
    items: socialItems,
  },
] as const;
