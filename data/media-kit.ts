export type MediaKitLocale = "tr" | "en";

export type MediaKitMetric = {
  id: string;
  label: Record<MediaKitLocale, string>;
  value: Record<MediaKitLocale, string>;
  detail: Record<MediaKitLocale, string>;
  icon: string;
};

export type MediaKitAudienceRow = {
  id: string;
  label: string;
  value: number;
};

export const MEDIA_KIT_PERIOD = {
  tr: "20 Haziran – 17 Temmuz 2026",
  en: "June 20 – July 17, 2026",
} satisfies Record<MediaKitLocale, string>;

export const MEDIA_KIT_METRICS: MediaKitMetric[] = [
  {
    id: "subscribers",
    label: {
      tr: "YouTube abonesi",
      en: "YouTube subscribers",
    },
    value: {
      tr: "8 B+",
      en: "8K+",
    },
    detail: {
      tr: "Son 28 günde +715",
      en: "+715 in the last 28 days",
    },
    icon: "mdi:account-multiple-outline",
  },
  {
    id: "views",
    label: {
      tr: "Görüntüleme",
      en: "Views",
    },
    value: {
      tr: "31,1 B",
      en: "31.1K",
    },
    detail: {
      tr: "Son 28 gün",
      en: "Last 28 days",
    },
    icon: "mdi:play-circle-outline",
  },
  {
    id: "watch-time",
    label: {
      tr: "İzlenme süresi",
      en: "Watch time",
    },
    value: {
      tr: "2,0 B saat",
      en: "2.0K hours",
    },
    detail: {
      tr: "≈ 3:52 / görüntüleme",
      en: "≈ 3:52 per view",
    },
    icon: "mdi:clock-outline",
  },
  {
    id: "monthly-audience",
    label: {
      tr: "Aylık kitle",
      en: "Monthly audience",
    },
    value: {
      tr: "15,3 B",
      en: "15.3K",
    },
    detail: {
      tr: "Aktif izleyici",
      en: "Active viewers",
    },
    icon: "mdi:chart-line",
  },
];

export const MEDIA_KIT_CONTENT_BREAKDOWN = [
  {
    id: "videos",
    label: {
      tr: "Uzun videolar",
      en: "Long-form videos",
    },
    value: {
      tr: "24,3 B",
      en: "24.3K",
    },
    percentage: 78.4,
  },
  {
    id: "shorts",
    label: {
      tr: "Shorts",
      en: "Shorts",
    },
    value: {
      tr: "6,7 B",
      en: "6.7K",
    },
    percentage: 21.6,
  },
] as const;

export const MEDIA_KIT_GENDER: MediaKitAudienceRow[] = [
  { id: "male", label: "Erkek", value: 98 },
  { id: "female", label: "Kadın", value: 2 },
];

export const MEDIA_KIT_AGES: MediaKitAudienceRow[] = [
  { id: "18-24", label: "18–24", value: 21.9 },
  { id: "25-34", label: "25–34", value: 46.1 },
  { id: "35-44", label: "35–44", value: 20.8 },
  { id: "45-54", label: "45–54", value: 9.8 },
  { id: "55-64", label: "55–64", value: 1.2 },
  { id: "65+", label: "65+", value: 0.1 },
];

export const MEDIA_KIT_TOPICS = [
  {
    id: "software",
    label: {
      tr: "Yazılım geliştirme",
      en: "Software development",
    },
    icon: "mdi:code-tags",
  },
  {
    id: "systems",
    label: {
      tr: "Sistem & araçlar",
      en: "Systems & tooling",
    },
    icon: "mdi:server-outline",
  },
  {
    id: "design",
    label: {
      tr: "Tasarım & ürün",
      en: "Design & product",
    },
    icon: "mdi:palette-outline",
  },
  {
    id: "technology",
    label: {
      tr: "Teknoloji",
      en: "Technology",
    },
    icon: "mdi:laptop",
  },
] as const;
