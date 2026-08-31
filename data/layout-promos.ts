import type { Localized } from "@/lib/locale";

export type LayoutPromoCopyKey =
  | "weeklyEyebrow"
  | "weeklyTitle"
  | "weeklyFallback"
  | "weeklyCta"
  | "projectsTitle"
  | "projectsDescription"
  | "projectsCta"
  | "latestPostEyebrow"
  | "latestPostTitle"
  | "latestPostFallback"
  | "latestPostCta"
  | "anatomyTitle"
  | "anatomyDescription"
  | "anatomyCta"
  | "youtubeEyebrow"
  | "youtubeTitle"
  | "youtubeDescription"
  | "youtubeCta"
  | "designSystemEyebrow"
  | "designSystemTitle"
  | "designSystemDescription"
  | "designSystemCta"
  | "communityEyebrow"
  | "communityTitle"
  | "communityDescription"
  | "communityCta"
  | "referencesEyebrow"
  | "referencesTitle"
  | "referencesDescription"
  | "referencesCta"
  | "sponsorsEyebrow"
  | "sponsorsTitle"
  | "sponsorsDescription"
  | "sponsorsCta"
  | "contactTitle"
  | "contactDescription"
  | "contactCta"
  | "linkedinEyebrow"
  | "linkedinTitle"
  | "linkedinDescription"
  | "linkedinCta"
  | "instagramEyebrow"
  | "instagramTitle"
  | "instagramDescription"
  | "instagramCta";

export type LayoutPromoCardDefinition = {
  id: string;
  kind?: "standard" | "sponsors";
  eyebrowKey?: LayoutPromoCopyKey;
  titleKey: LayoutPromoCopyKey;
  descriptionKey: LayoutPromoCopyKey;
  ctaKey: LayoutPromoCopyKey;
  href: string | Localized;
  icon: string;
  iconSurface?: "accent" | "foreground" | "primary";
  surface?: "default" | "primary";
  buttonVariant?: "default" | "outline" | "secondary";
  external?: boolean;
  contentSource?: "latestAgenda" | "latestPost";
};

export type LayoutPromoSlide = readonly LayoutPromoCardDefinition[];

export const LEFT_LAYOUT_PROMO_SLIDES: readonly LayoutPromoSlide[] = [
  [
    {
      id: "weekly-agenda",
      eyebrowKey: "weeklyEyebrow",
      titleKey: "weeklyTitle",
      descriptionKey: "weeklyFallback",
      ctaKey: "weeklyCta",
      href: "/agenda",
      icon: "mdi:newspaper-variant-outline",
      surface: "primary",
      buttonVariant: "default",
      contentSource: "latestAgenda",
    },
    {
      id: "projects",
      titleKey: "projectsTitle",
      descriptionKey: "projectsDescription",
      ctaKey: "projectsCta",
      href: "/projects",
      icon: "mdi:layers-triple-outline",
    },
    {
      id: "latest-post",
      eyebrowKey: "latestPostEyebrow",
      titleKey: "latestPostTitle",
      descriptionKey: "latestPostFallback",
      ctaKey: "latestPostCta",
      href: "/blog",
      icon: "mdi:post-outline",
      contentSource: "latestPost",
    },
    {
      id: "javascript-anatomy",
      titleKey: "anatomyTitle",
      descriptionKey: "anatomyDescription",
      ctaKey: "anatomyCta",
      href: "/content",
      icon: "ri:twitter-x-fill",
      iconSurface: "foreground",
    },
  ],
  [
    {
      id: "youtube",
      eyebrowKey: "youtubeEyebrow",
      titleKey: "youtubeTitle",
      descriptionKey: "youtubeDescription",
      ctaKey: "youtubeCta",
      href: "https://youtube.com/@poyrazavsever",
      icon: "mdi:youtube",
      iconSurface: "primary",
      external: true,
    },
    {
      id: "poyraz-ui",
      eyebrowKey: "designSystemEyebrow",
      titleKey: "designSystemTitle",
      descriptionKey: "designSystemDescription",
      ctaKey: "designSystemCta",
      href: "https://ui.poyrazavsever.com",
      icon: "mdi:palette-swatch-outline",
      external: true,
    },
    {
      id: "community",
      eyebrowKey: "communityEyebrow",
      titleKey: "communityTitle",
      descriptionKey: "communityDescription",
      ctaKey: "communityCta",
      href: "/about/volunteer-community",
      icon: "mdi:account-group-outline",
    },
    {
      id: "references",
      eyebrowKey: "referencesEyebrow",
      titleKey: "referencesTitle",
      descriptionKey: "referencesDescription",
      ctaKey: "referencesCta",
      href: "/about/references",
      icon: "mdi:comment-quote-outline",
    },
  ],
];

export const RIGHT_LAYOUT_PROMO_SLIDES: readonly LayoutPromoSlide[] = [
  [
    {
      id: "sponsors",
      kind: "sponsors",
      eyebrowKey: "sponsorsEyebrow",
      titleKey: "sponsorsTitle",
      descriptionKey: "sponsorsDescription",
      ctaKey: "sponsorsCta",
      href: "/media-kit",
      icon: "mdi:handshake-outline",
      buttonVariant: "default",
    },
    {
      id: "contact",
      titleKey: "contactTitle",
      descriptionKey: "contactDescription",
      ctaKey: "contactCta",
      href: "/contact",
      icon: "mdi:message-text-outline",
      iconSurface: "primary",
      surface: "primary",
      buttonVariant: "default",
    },
  ],
  [
    {
      id: "linkedin",
      eyebrowKey: "linkedinEyebrow",
      titleKey: "linkedinTitle",
      descriptionKey: "linkedinDescription",
      ctaKey: "linkedinCta",
      href: "https://www.linkedin.com/in/poyrazavsever/",
      icon: "mdi:linkedin",
      external: true,
    },
    {
      id: "instagram",
      eyebrowKey: "instagramEyebrow",
      titleKey: "instagramTitle",
      descriptionKey: "instagramDescription",
      ctaKey: "instagramCta",
      href: "https://instagram.com/poyraz_avsever",
      icon: "mdi:instagram",
      surface: "primary",
      buttonVariant: "default",
      external: true,
    },
  ],
];
