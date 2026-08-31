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

export type MediaKitBreakdownRow = {
  id: string;
  label: Record<MediaKitLocale, string>;
  value: number;
};

export const MEDIA_KIT_PERIOD = {
  tr: "Ömür boyu",
  en: "Lifetime",
} satisfies Record<MediaKitLocale, string>;

export const MEDIA_KIT_METRICS: MediaKitMetric[] = [
  {
    id: "views",
    label: {
      tr: "Görüntüleme",
      en: "Views",
    },
    value: {
      tr: "788.422",
      en: "788,422",
    },
    detail: {
      tr: "Ömür boyu",
      en: "Lifetime",
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
      tr: "16,5 B saat",
      en: "16.5K hours",
    },
    detail: {
      tr: "Ömür boyu",
      en: "Lifetime",
    },
    icon: "mdi:clock-outline",
  },
  {
    id: "subscribers",
    label: {
      tr: "Aboneler",
      en: "Subscribers",
    },
    value: {
      tr: "+9,3 B",
      en: "+9.3K",
    },
    detail: {
      tr: "Ömür boyu kazanılan",
      en: "Gained lifetime",
    },
    icon: "mdi:account-multiple-outline",
  },
  {
    id: "retention",
    label: {
      tr: "İzlemeye devam edenler",
      en: "Stayed to watch",
    },
    value: {
      tr: "%59,7",
      en: "59.7%",
    },
    detail: {
      tr: "%40,3 izlemeden geçti",
      en: "40.3% swiped away",
    },
    icon: "mdi:eye-check-outline",
  },
];

export const MEDIA_KIT_DEVICES: MediaKitBreakdownRow[] = [
  {
    id: "computer",
    label: { tr: "Bilgisayar", en: "Computer" },
    value: 45.2,
  },
  {
    id: "mobile",
    label: { tr: "Cep telefonu", en: "Mobile phone" },
    value: 38.8,
  },
  { id: "tv", label: { tr: "TV", en: "TV" }, value: 11.2 },
  { id: "tablet", label: { tr: "Tablet", en: "Tablet" }, value: 4.7 },
];

export const MEDIA_KIT_LOCATIONS: MediaKitBreakdownRow[] = [
  { id: "turkey", label: { tr: "Türkiye", en: "Türkiye" }, value: 89.2 },
  {
    id: "azerbaijan",
    label: { tr: "Azerbaycan", en: "Azerbaijan" },
    value: 3,
  },
  { id: "germany", label: { tr: "Almanya", en: "Germany" }, value: 1.1 },
  {
    id: "united-states",
    label: { tr: "Amerika Birleşik Devletleri", en: "United States" },
    value: 0.2,
  },
  {
    id: "netherlands",
    label: { tr: "Hollanda", en: "Netherlands" },
    value: 0.2,
  },
];

export const MEDIA_KIT_GENDER: MediaKitAudienceRow[] = [
  { id: "female", label: "Kadın", value: 5.7 },
  { id: "male", label: "Erkek", value: 94.3 },
];

export const MEDIA_KIT_AGES: MediaKitAudienceRow[] = [
  { id: "13-17", label: "13–17", value: 1.5 },
  { id: "18-24", label: "18–24", value: 23.7 },
  { id: "25-34", label: "25–34", value: 45.4 },
  { id: "35-44", label: "35–44", value: 19.1 },
  { id: "45-54", label: "45–54", value: 8.5 },
  { id: "55-64", label: "55–64", value: 1.5 },
  { id: "65+", label: "65+", value: 0.3 },
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
