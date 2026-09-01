"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Badge,
  Button,
  ButtonIcon,
  ButtonLabel,
  Card,
  Typography,
} from "poyraz-ui/atoms";
import { SPONSORS } from "@/data/sponsors";
import {
  MEDIA_KIT_AGES,
  MEDIA_KIT_DEVICES,
  MEDIA_KIT_GENDER,
  MEDIA_KIT_LOCATIONS,
  MEDIA_KIT_METRICS,
  MEDIA_KIT_PERIOD,
  MEDIA_KIT_TOPICS,
  type MediaKitAudienceRow,
  type MediaKitBreakdownRow,
  type MediaKitLocale,
} from "@/data/media-kit";
import type { YouTubeChannelStats } from "@/lib/youtube-channel-stats";

const COPY = {
  tr: {
    eyebrow: "Medya kiti · 2026",
    availability: "İş birliklerine açık",
    title: "Teknolojiyi üretiyor, deneyimliyor ve anlaşılır şekilde paylaşıyorum.",
    intro:
      "Yazılım, teknoloji ve tasarımı gerçek projeler, dürüst deneyimler ve uygulanabilir anlatımlarla buluşturuyorum. Markalarla çalışırken ürünün doğal kullanımını ve izleyici güvenini merkeze alıyorum.",
    emailCta: "İletişime geç",
    youtubeCta: "YouTube kanalı",
    topicsLabel: "İçerik alanları",
    statsTitle: "Kanal görünümü",
    liveData: "Canlı YouTube verisi",
    liveDescription:
      "Görüntüleme ve abone toplamı saatlik yenilenir; diğer değerler YouTube Studio raporundan gelir.",
    snapshotDescription:
      "Ömür boyu performans ve güncel kitle kırılımları YouTube Studio raporundan alınmıştır.",
    publicTotal: "Herkese açık kanal toplamı",
    audienceTitle: "Kitle profili",
    audienceDescription:
      "İzleyicilerin %69,1’i 18–34 yaş aralığında ve kitlenin %89,2’si Türkiye’den izliyor.",
    ageTitle: "Yaş dağılımı",
    genderTitle: "Cinsiyet dağılımı",
    deviceTitle: "Cihaz türü",
    locationsTitle: "En çok izleyen yerler",
    activeTitle: "İzleyicilerin aktif olduğu saatler",
    activeHours: "16:00–00:00",
    activeDescription:
      "Hafta boyunca en yoğun zaman aralığı. Hafta sonu hareketlilik öğleden sonra daha erken başlıyor.",
    activePeriod: "Yerel saat · GMT +03:00 · Son 28 gün",
    male: "Erkek",
    female: "Kadın",
    partnersTitle: "Birlikte çalıştığım markalar",
    partnersDescription:
      "Ürünü gerçekten deneyimlemeye ve içeriğin doğal akışını korumaya dayalı seçili iş birlikleri.",
    formatsTitle: "İş birliği formatları",
    formats: [
      "Sponsorlu YouTube videosu veya doğal ürün entegrasyonu",
      "Teknik ürün incelemesi ve kullanım senaryosu",
      "Kısa video ve çoklu platform içerik paketi",
      "Uzun dönem marka elçiliği ve içerik serisi",
    ],
    ctaTitle: "Teknoloji kitlesine güvenilir bir hikâyeyle ulaşın.",
    ctaDescription:
      "Ürününüzü anlayan, deneyimleyen ve izleyicisine açık bir dille anlatan bir iş birliği kurgulayalım.",
    dataNote:
      "Performans, demografi, cihaz ve ülke kırılımları ömür boyudur. Aktif saatler son 28 günü gösterir.",
  },
  en: {
    eyebrow: "Media kit · 2026",
    availability: "Open to partnerships",
    title: "I build, experience, and explain technology in a clear way.",
    intro:
      "I bring software, technology, and design together through real projects, honest experiences, and practical storytelling. Brand work is grounded in natural product use and audience trust.",
    emailCta: "Get in touch",
    youtubeCta: "YouTube channel",
    topicsLabel: "Content topics",
    statsTitle: "Channel overview",
    liveData: "Live YouTube data",
    liveDescription:
      "View and subscriber totals refresh hourly; other figures come from YouTube Studio reports.",
    snapshotDescription:
      "Lifetime performance and current audience breakdowns come from YouTube Studio reports.",
    publicTotal: "Public channel total",
    audienceTitle: "Audience profile",
    audienceDescription:
      "69.1% of viewers are between 18 and 34, and 89.2% of the audience watches from Türkiye.",
    ageTitle: "Age distribution",
    genderTitle: "Gender distribution",
    deviceTitle: "Device type",
    locationsTitle: "Top geographies",
    activeTitle: "When viewers are on YouTube",
    activeHours: "4:00 PM–12:00 AM",
    activeDescription:
      "The busiest window throughout the week. Weekend activity starts earlier in the afternoon.",
    activePeriod: "Local time · GMT +03:00 · Last 28 days",
    male: "Male",
    female: "Female",
    partnersTitle: "Brands I have worked with",
    partnersDescription:
      "Selected partnerships based on genuine product experience and preserving the natural flow of the content.",
    formatsTitle: "Partnership formats",
    formats: [
      "Sponsored YouTube video or native product integration",
      "Technical product review and use-case content",
      "Short-form video and multi-platform content package",
      "Long-term brand ambassadorship and content series",
    ],
    ctaTitle: "Reach a technology audience through a credible story.",
    ctaDescription:
      "Let’s shape a partnership that understands, experiences, and explains your product clearly.",
    dataNote:
      "Performance, demographic, device, and geography breakdowns are lifetime figures.",
  },
} as const;

function formatCompactNumber(value: number, locale: MediaKitLocale) {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function AudienceBar({
  item,
  locale,
  max = 100,
  label,
}: {
  item: MediaKitAudienceRow;
  locale: MediaKitLocale;
  max?: number;
  label?: string;
}) {
  const width = Math.max((item.value / max) * 100, item.value > 0 ? 2 : 0);
  const formattedValue = item.value.toLocaleString(
    locale === "tr" ? "tr-TR" : "en-US",
    { maximumFractionDigits: 1 },
  );

  return (
    <div className="grid grid-cols-[3.5rem_1fr_3.25rem] items-center gap-3">
      <Typography variant="small" className="text-xs font-medium">
        {label ?? item.label}
      </Typography>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${label ?? item.label}: %${formattedValue}`}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${width}%` }}
        />
      </div>
      <Typography
        variant="caption"
        className="text-right tabular-nums text-muted-foreground"
      >
        %{formattedValue}
      </Typography>
    </div>
  );
}

function BreakdownBar({
  item,
  locale,
  max = 100,
}: {
  item: MediaKitBreakdownRow;
  locale: MediaKitLocale;
  max?: number;
}) {
  const width = Math.max((item.value / max) * 100, item.value > 0 ? 2 : 0);
  const formattedValue = item.value.toLocaleString(
    locale === "tr" ? "tr-TR" : "en-US",
    { maximumFractionDigits: 1 },
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <Typography variant="small" className="text-xs font-medium">
          {item.label[locale]}
        </Typography>
        <Typography
          variant="caption"
          className="tabular-nums text-muted-foreground"
        >
          %{formattedValue}
        </Typography>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${item.label[locale]}: %${formattedValue}`}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: string;
}) {
  return (
    <Card className="rounded-sm border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Typography variant="caption" className="text-muted-foreground">
            {label}
          </Typography>
          <Typography
            variant="h3"
            className="mt-1 font-secondary tracking-[-0.035em] tabular-nums"
          >
            {value}
          </Typography>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
          <Icon icon={icon} width={17} height={17} />
        </span>
      </div>
      <Typography variant="caption" className="mt-3 block text-muted-foreground">
        {detail}
      </Typography>
    </Card>
  );
}

export function MediaKitContent({
  locale,
  youtubeStats,
}: {
  locale: MediaKitLocale;
  youtubeStats: YouTubeChannelStats | null;
}) {
  const copy = COPY[locale];
  const metrics = MEDIA_KIT_METRICS.map((metric) => {
    let value = metric.value[locale];
    let detail = metric.detail[locale];

    if (youtubeStats && metric.id === "views") {
      value = formatCompactNumber(youtubeStats.views, locale);
      detail = copy.publicTotal;
    }

    if (youtubeStats && metric.id === "subscribers") {
      value =
        youtubeStats.subscribers !== null
          ? formatCompactNumber(youtubeStats.subscribers, locale)
          : value;
      detail = copy.publicTotal;
    }

    return {
      id: metric.id,
      label: metric.label[locale],
      value,
      detail,
      icon: metric.icon,
    };
  });

  return (
    <section className="flex h-full flex-col overflow-x-hidden">
      <header className="border-b border-border py-4 sm:py-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" radius="sm">
            {copy.eyebrow}
          </Badge>
          <Badge variant="success" radius="full" size="sm" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-current" />
            {copy.availability}
          </Badge>
        </div>

        <Typography
          variant="h2"
          component="h1"
          className="mt-4 max-w-2xl font-secondary text-2xl font-semibold leading-tight tracking-[-0.045em]"
        >
          {copy.title}
        </Typography>
        <Typography
          variant="small"
          className="mt-3 max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6"
        >
          {copy.intro}
        </Typography>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm" radius="sm" effect="swap" swapTarget="both">
            <a href="mailto:poyrazavsever@gmail.com">
              <ButtonLabel>{copy.emailCta}</ButtonLabel>
              <ButtonIcon>
                <Icon icon="mdi:arrow-right" width={15} height={15} />
              </ButtonIcon>
            </a>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="sm"
            radius="sm"
            effect="swap"
            swapTarget="both"
          >
            <a
              href="https://youtube.com/@poyrazavsever"
              target="_blank"
              rel="noreferrer"
            >
              <ButtonIcon>
                <Icon icon="mdi:youtube" width={16} height={16} />
              </ButtonIcon>
              <ButtonLabel>{copy.youtubeCta}</ButtonLabel>
            </a>
          </Button>
        </div>
      </header>

      <section className="space-y-3 pt-12 md:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Typography variant="h3" component="h2" className="tracking-[-0.035em]">
              {copy.statsTitle}
            </Typography>
            <Typography variant="small" className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
              {youtubeStats ? copy.liveDescription : copy.snapshotDescription}
            </Typography>
          </div>
          <Badge variant={youtubeStats ? "success" : "secondary"} radius="sm" className="gap-1.5">
            {youtubeStats ? (
              <span className="size-1.5 rounded-full bg-current" />
            ) : (
              <Icon icon="mdi:calendar-outline" width={13} height={13} />
            )}
            {youtubeStats ? copy.liveData : MEDIA_KIT_PERIOD[locale]}
          </Badge>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              detail={metric.detail}
              icon={metric.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 pt-12 md:pt-14">
        <div>
          <Typography variant="h3" component="h2" className="tracking-[-0.035em]">
            {copy.audienceTitle}
          </Typography>
          <Typography variant="small" className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
            {copy.audienceDescription}
          </Typography>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <Card className="rounded-sm border-border p-4">
            <Typography variant="large" component="h3" className="text-sm font-semibold">
              {copy.ageTitle}
            </Typography>
            <div className="mt-5 space-y-3">
              {MEDIA_KIT_AGES.map((item) => (
                <AudienceBar key={item.id} item={item} locale={locale} max={50} />
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-4">
            <Typography variant="large" component="h3" className="text-sm font-semibold">
              {copy.genderTitle}
            </Typography>
            <div className="mt-5 space-y-4">
              {MEDIA_KIT_GENDER.map((item) => (
                <AudienceBar
                  key={item.id}
                  item={item}
                  locale={locale}
                  label={item.id === "male" ? copy.male : copy.female}
                />
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-4">
            <Typography variant="large" component="h3" className="text-sm font-semibold">
              {copy.deviceTitle}
            </Typography>
            <div className="mt-5 space-y-5">
              {MEDIA_KIT_DEVICES.map((item) => (
                <BreakdownBar
                  key={item.id}
                  item={item}
                  locale={locale}
                  max={50}
                />
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-4">
            <Typography variant="large" component="h3" className="text-sm font-semibold">
              {copy.locationsTitle}
            </Typography>
            <div className="mt-5 space-y-5">
              {MEDIA_KIT_LOCATIONS.map((item) => (
                <BreakdownBar key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </Card>

         
        </div>

        <Typography variant="caption" className="block text-muted-foreground">
          {copy.dataNote}
        </Typography>
      </section>

      <section className="space-y-3 pt-12 md:pt-14">
        <div>
          <Typography variant="h3" component="h2" className="tracking-[-0.035em]">
            {copy.partnersTitle}
          </Typography>
          <Typography variant="small" className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
            {copy.partnersDescription}
          </Typography>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS.map((sponsor) => {
            const card = (
              <Card className="flex h-24 items-center justify-center rounded-sm border-border bg-card p-4 transition-colors group-hover:border-primary/40">
                <div className="relative h-full w-full rounded-sm bg-white p-2">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                    className="object-contain p-2 grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>
              </Card>
            );

            return sponsor.websiteUrl ? (
              <a
                key={sponsor.id}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                {card}
              </a>
            ) : (
              <div key={sponsor.id}>{card}</div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 pt-12 md:grid-cols-[0.9fr_1.1fr] md:pt-14">
        <Card className="rounded-sm border-border p-5">
          <Typography variant="h3" component="h2" className="tracking-[-0.035em]">
            {copy.formatsTitle}
          </Typography>
          <div className="mt-4 space-y-3">
            {copy.formats.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Icon icon="mdi:check-circle-outline" width={17} height={17} className="mt-0.5 shrink-0 text-primary" />
                <Typography variant="small" className="text-xs leading-5 text-muted-foreground">
                  {item}
                </Typography>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-sm border-primary/25 bg-primary/5 p-5">
          <Typography variant="h3" component="h2" className="max-w-md tracking-[-0.035em]">
            {copy.ctaTitle}
          </Typography>
          <Typography variant="small" className="mt-2 max-w-lg text-xs leading-5 text-muted-foreground">
            {copy.ctaDescription}
          </Typography>
          <div className="mt-5">
            <Button asChild size="sm" radius="sm" effect="swap" swapTarget="both">
              <a href="mailto:poyrazavsever@gmail.com">
                <ButtonLabel>{copy.emailCta}</ButtonLabel>
                <ButtonIcon>
                  <Icon icon="mdi:arrow-right" width={15} height={15} />
                </ButtonIcon>
              </a>
            </Button>
          </div>
        </Card>
      </section>

      <section className="pt-8">
        <Typography variant="caption" className="text-muted-foreground">
          {copy.topicsLabel}: {MEDIA_KIT_TOPICS.map((topic) => topic.label[locale]).join(" · ")}
        </Typography>
      </section>
    </section>
  );
}
