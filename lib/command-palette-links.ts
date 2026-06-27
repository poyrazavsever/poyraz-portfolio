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
import { getLocalizedValue } from "@/lib/locale";

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

export function getCommandPaletteGroups(
  locale: string,
  tLinks: (key: string) => string,
  tNav: { (key: string): string; has: (key: string) => boolean }
): CommandPaletteGroup[] {
  const navigationItems: CommandPaletteItem[] = NAV_LINKS.map((item) => {
    const label = tNav.has(item.id) ? tNav(item.id) : item.label;
    return {
      id: item.id,
      label,
      href: item.href,
      icon: "mdi:compass-outline",
      keywords: [
        label,
        item.href,
        locale === "tr" ? "sayfa" : "page",
        locale === "tr" ? "navigasyon" : "navigation",
      ],
    };
  });

  const socialItems: CommandPaletteItem[] = SOCIAL_LINKS.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    icon: item.icon,
    external: true,
    keywords: [
      item.label,
      locale === "tr" ? "sosyal" : "social",
      locale === "tr" ? "profil" : "profile",
    ],
  }));

  const blogItems: CommandPaletteItem[] = [
    {
      id: "blog-index",
      label: "Blog",
      href: "/blog",
      icon: "mdi:file-document-outline",
      keywords: ["blog", locale === "tr" ? "yazı" : "post", "article"],
    },
    {
      id: "blog-content-page",
      label: locale === "tr" ? "Video ve Notlar" : "Videos and Notes",
      href: "/content",
      icon: "mdi:video-outline",
      keywords: [
        "video",
        "youtube",
        locale === "tr" ? "not" : "note",
        "pdf",
        locale === "tr" ? "içerik" : "content",
      ],
    },
  ];

  const aboutItems: CommandPaletteItem[] = [
    ...EDUCATION.map((item) => {
      const title = getLocalizedValue(item.title, locale);
      const description = getLocalizedValue(item.description, locale);
      const period = getLocalizedValue(item.period, locale);
      return {
        id: `education-${item.id}`,
        label: title,
        href: "/about",
        icon: "mdi:school-outline",
        keywords: [
          item.institution,
          period,
          description,
          locale === "tr" ? "eğitim" : "education",
          "about",
        ],
      };
    }),
    ...EXPERIENCE.map((item) => {
      const role = getLocalizedValue(item.role, locale);
      const period = getLocalizedValue(item.period, locale);
      return {
        id: `experience-${item.id}`,
        label: role,
        href: "/about",
        icon: "mdi:briefcase-outline",
        keywords: [
          item.company,
          period,
          locale === "tr" ? "deneyim" : "experience",
          "about",
        ],
      };
    }),
    ...certificates.map((item, index) => {
      const name = getLocalizedValue(item.name, locale);
      const date = getLocalizedValue(item.date, locale);
      const description = getLocalizedValue(item.description, locale);
      return {
        id: `certificate-${index}`,
        label: name,
        href: "/about",
        icon: "mdi:certificate-outline",
        keywords: [
          item.organization,
          date,
          item.category,
          description,
          locale === "tr" ? "sertifika" : "certificate",
        ],
      };
    }),
    ...REFERENCES.map((item) => {
      const role = getLocalizedValue(item.role, locale);
      const quote = getLocalizedValue(item.quote, locale);
      return {
        id: `reference-${item.id}`,
        label: `${locale === "tr" ? "Referans" : "Reference"}: ${item.author}`,
        href: "/about/references",
        icon: "mdi:account-voice-outline",
        keywords: [
          role,
          quote,
          locale === "tr" ? "referans" : "reference",
          locale === "tr" ? "yorum" : "testimonial",
        ],
      };
    }),
    ...VOLUNTEER_COMMUNITY_ITEMS.map((item) => {
      const timeline = getLocalizedValue(item.timeline, locale);
      const focus = getLocalizedValue(item.focus, locale);
      return {
        id: `volunteer-${item.id}`,
        label: item.title,
        href: "/about/volunteer-community",
        icon: "mdi:hand-heart-outline",
        keywords: [
          timeline,
          focus,
          item.link ?? "",
          locale === "tr" ? "gönüllülük" : "volunteering",
          locale === "tr" ? "topluluk" : "community",
        ],
      };
    }),
  ];

  const projectItems: CommandPaletteItem[] = [
    ...MOBILE_APPS.map((item) => {
      const description = getLocalizedValue(item.description, locale);
      const badgeStr = item.badge ? getLocalizedValue(item.badge, locale) : "";
      return {
        id: `mobile-project-${item.id}`,
        label: item.title,
        href: "/projects",
        icon: "mdi:cellphone",
        keywords: [
          description,
          badgeStr,
          locale === "tr" ? "mobil" : "mobile",
          locale === "tr" ? "proje" : "project",
        ],
      };
    }),
    ...WEB_APPS.map((item) => {
      const description = getLocalizedValue(item.description, locale);
      const badgeStr = item.badge ? getLocalizedValue(item.badge, locale) : "";
      return {
        id: `web-project-${item.id}`,
        label: item.title,
        href: item.href ?? "/projects",
        icon: "mdi:web",
        external: Boolean(item.href),
        keywords: [
          description,
          badgeStr,
          "web",
          locale === "tr" ? "proje" : "project",
        ],
      };
    }),
    ...EXTENSIONS.map((item) => {
      const description = getLocalizedValue(item.description, locale);
      const badgeStr = item.badge ? getLocalizedValue(item.badge, locale) : "";
      return {
        id: `extension-project-${item.id}`,
        label: item.title,
        href: item.href ?? "/projects",
        icon: "mdi:puzzle-outline",
        external: Boolean(item.href),
        keywords: [
          description,
          badgeStr,
          "extension",
          locale === "tr" ? "eklenti" : "addon",
          locale === "tr" ? "proje" : "project",
        ],
      };
    }),
    ...FIGMA_TEMPLATES.map((item) => {
      const description = getLocalizedValue(item.description, locale);
      const badgeStr = item.badge ? getLocalizedValue(item.badge, locale) : "";
      return {
        id: `figma-project-${item.id}`,
        label: item.title,
        href: item.href ?? "/projects",
        icon: "mdi:figma",
        external: Boolean(item.href),
        keywords: [
          description,
          badgeStr,
          "figma",
          locale === "tr" ? "şablon" : "template",
        ],
      };
    }),
  ];

  const contentItems: CommandPaletteItem[] = YOUTUBE_VIDEO_LINKS.map(
    (item, index) => ({
      id: `youtube-video-${index + 1}`,
      label: `YouTube Video ${index + 1}`,
      href: item,
      icon: "mdi:youtube",
      external: true,
      keywords: [item, "youtube", "video", locale === "tr" ? "içerik" : "content"],
    })
  );

  return [
    {
      id: "navigation",
      heading: locale === "tr" ? "Sayfalar" : "Pages",
      items: navigationItems,
    },
    {
      id: "blog-data",
      heading: "Blog",
      items: blogItems,
    },
    {
      id: "about-data",
      heading: locale === "tr" ? "Hakkımda" : "About",
      items: aboutItems,
    },
    {
      id: "projects-data",
      heading: locale === "tr" ? "Projeler" : "Projects",
      items: projectItems,
    },
    {
      id: "content-data",
      heading: locale === "tr" ? "İçerikler" : "Contents",
      items: contentItems,
    },
    {
      id: "social",
      heading: "Social",
      items: socialItems,
    },
  ];
}
