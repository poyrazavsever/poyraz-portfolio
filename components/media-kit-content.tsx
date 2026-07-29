"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Badge,
  Button,
  ButtonIcon,
  ButtonLabel,
  Card,
  PatternDots,
  Separator,
  StatisticCard,
  TextEffect,
  Typography,
} from "poyraz-ui/atoms";
import { SPONSORS } from "@/data/sponsors";
import {
  MEDIA_KIT_AGES,
  MEDIA_KIT_CONTENT_BREAKDOWN,
  MEDIA_KIT_GENDER,
  MEDIA_KIT_METRICS,
  MEDIA_KIT_PERIOD,
  MEDIA_KIT_TOPICS,
  type MediaKitAudienceRow,
  type MediaKitLocale,
} from "@/data/media-kit";

const COPY = {
  tr: {
    eyebrow: "Medya Kiti · 2026",
    availability: "İş birliklerine açık",
    name: "Poyraz Avsever",
    title: "Teknolojiyi öğreniyor, üretiyor ve anlaşılır şekilde paylaşıyorum.",
    intro:
      "En büyük amacım öğrendiklerimi aktarırken bilgimi pekiştirmek ve başkalarının da üretmesine yardımcı olmak. Yazılım, teknoloji ve tasarımı gerçek projeler, dürüst deneyimler ve uygulanabilir anlatımlarla buluşturuyorum.",
    role: "İçerik üreticisi · Yazılım geliştirici",
    audienceTitle: "Kime ulaşıyorum?",
    audienceDescription:
      "Yazılım geliştiriciler, sistem yöneticileri, teknoloji meraklıları ve üretirken öğrenmeyi seven genç profesyoneller.",
    statsEyebrow: "YouTube performansı",
    statsTitle: "Takipçiden öte, aktif ve büyüyen bir kitle.",
    statsDescription:
      "Kanal performansının son 28 günlük görünümü. Gelir verileri medya kitine dahil edilmemiştir.",
    periodLabel: "Veri dönemi",
    audienceEyebrow: "Kitle profili",
    audienceHeadline: "İzleyicilerin %68’i 18–34 yaş aralığında.",
    audienceBody:
      "Teknik kararları etkileyen, yeni araçları deneyen ve teknoloji ürünlerine yüksek ilgi gösteren odaklı bir topluluk.",
    ageTitle: "Yaş dağılımı",
    genderTitle: "Cinsiyet dağılımı",
    formatTitle: "İçerik formatına göre izlenme",
    formatDescription:
      "Uzun video odağı, markaların ürün ve hikâyelerini detaylı ve bağlamı korunmuş biçimde anlatmaya alan açıyor.",
    reachTitle: "Son 28 günde içerik ritmi",
    reachItems: [
      { label: "Yeni izleyici", value: "6,8 B" },
      { label: "Düzenli izleyici", value: "801" },
      { label: "Yayınlanan içerik", value: "9" },
    ],
    reachNote: "5 uzun video · 4 Shorts",
    partnersEyebrow: "Seçili iş birlikleri",
    partnersTitle: "Daha önce birlikte ürettik.",
    partnersDescription:
      "İçeriğin doğal akışını ve izleyici güvenini koruyan, ürünü gerçekten deneyimlemeye dayalı iş birlikleri.",
    collaborationTitle: "Uygun iş birliği formatları",
    collaborationItems: [
      "Sponsorlu YouTube videosu veya doğal ürün entegrasyonu",
      "Teknik ürün incelemesi ve kullanım senaryosu",
      "Kısa format video ve çoklu platform içerik paketi",
      "Uzun dönem marka elçiliği ve içerik serisi",
    ],
    ctaEyebrow: "Birlikte üretelim",
    ctaTitle: "Teknoloji kitlesine güvenilir bir hikâyeyle ulaşın.",
    ctaDescription:
      "Markanızı, ürünü gerçekten anlayan ve izleyicisine açık bir dille anlatan içeriklerle buluşturalım.",
    emailCta: "E-posta gönder",
    youtubeCta: "YouTube kanalını aç",
    footer: "Poyraz Avsever · Medya Kiti",
    updated: "Son güncelleme: 1 Temmuz 2026",
    derivedNote:
      "Ortalama izlenme süresi, paylaşılan toplam izlenme saati ve görüntüleme değerlerinden yaklaşık olarak hesaplanmıştır.",
  },
  en: {
    eyebrow: "Media Kit · 2026",
    availability: "Open to partnerships",
    name: "Poyraz Avsever",
    title: "I learn, build, and make technology easier to understand.",
    intro:
      "My biggest goal is to reinforce what I learn by sharing it and help others build along the way. I connect software, technology, and design through real projects, honest experiences, and practical storytelling.",
    role: "Content creator · Software developer",
    audienceTitle: "Who do I reach?",
    audienceDescription:
      "Software developers, system administrators, technology enthusiasts, and young professionals who learn by building.",
    statsEyebrow: "YouTube performance",
    statsTitle: "An active, growing audience beyond follower count.",
    statsDescription:
      "A 28-day view of channel performance. Revenue data is intentionally excluded from this media kit.",
    periodLabel: "Data period",
    audienceEyebrow: "Audience profile",
    audienceHeadline: "68% of viewers are between 18 and 34.",
    audienceBody:
      "A focused community that influences technical decisions, tries new tools, and shows strong interest in technology products.",
    ageTitle: "Age distribution",
    genderTitle: "Gender distribution",
    formatTitle: "Views by content format",
    formatDescription:
      "A strong long-form focus creates room to explain products and brand stories in depth and with the right context.",
    reachTitle: "Content rhythm in the last 28 days",
    reachItems: [
      { label: "New viewers", value: "6.8K" },
      { label: "Regular viewers", value: "801" },
      { label: "Published pieces", value: "9" },
    ],
    reachNote: "5 long-form videos · 4 Shorts",
    partnersEyebrow: "Selected partnerships",
    partnersTitle: "Brands I have built with.",
    partnersDescription:
      "Partnerships grounded in real product experience while protecting the natural flow of the content and audience trust.",
    collaborationTitle: "Partnership formats",
    collaborationItems: [
      "Sponsored YouTube video or native product integration",
      "Technical product review and use-case content",
      "Short-form video and multi-platform content package",
      "Long-term brand ambassadorship and content series",
    ],
    ctaEyebrow: "Let’s build together",
    ctaTitle: "Reach a technology audience through a credible story.",
    ctaDescription:
      "Let’s introduce your brand through content that understands the product and speaks clearly to its audience.",
    emailCta: "Send an email",
    youtubeCta: "Open YouTube channel",
    footer: "Poyraz Avsever · Media Kit",
    updated: "Last updated: July 1, 2026",
    derivedNote:
      "Average watch time is an estimate calculated from the shared total watch hours and view count.",
  },
} as const;

function AudienceBar({
  item,
  locale,
  max = 100,
}: {
  item: MediaKitAudienceRow;
  locale: MediaKitLocale;
  max?: number;
}) {
  const width = Math.max((item.value / max) * 100, item.value > 0 ? 2 : 0);
  const value = item.value.toLocaleString(locale === "tr" ? "tr-TR" : "en-US", {
    maximumFractionDigits: 1,
  });

  return (
    <div className="grid grid-cols-[3.5rem_1fr_3.25rem] items-center gap-3">
      <Typography variant="small" className="font-medium text-foreground">
        {item.label}
      </Typography>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`${item.label}: %${value}`}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${width}%` }}
        />
      </div>
      <Typography
        variant="small"
        className="text-right font-medium tabular-nums text-muted-foreground"
      >
        %{value}
      </Typography>
    </div>
  );
}

export function MediaKitContent({ locale }: { locale: MediaKitLocale }) {
  const copy = COPY[locale];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <a href={`/${locale}`} className="inline-flex items-center gap-3">
            <Image
              src="/logo/logo.png"
              alt="Poyraz Avsever"
              width={36}
              height={36}
              priority
              className="size-9 rounded-sm border border-border object-cover"
            />
            <div>
              <Typography variant="small" className="font-semibold leading-none">
                {copy.name}
              </Typography>
              <Typography
                variant="caption"
                className="mt-1 text-muted-foreground"
              >
                {copy.eyebrow}
              </Typography>
            </div>
          </a>

          <Badge variant="success" radius="full" size="sm" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-current" />
            {copy.availability}
          </Badge>
        </header>

        <section className="relative overflow-hidden border-b border-border py-10 sm:py-14 lg:py-16">
          <PatternDots
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 opacity-20 md:block"
          />
          <div className="relative">
            <div className="max-w-4xl">
              <Typography
                component="h1"
                variant="h1"
                className="max-w-3xl text-4xl leading-[1.02] tracking-[-0.055em] sm:text-5xl lg:text-6xl"
              >
                Teknoloji{" "}
                <TextEffect effect="hand-drawn" tone="primary">
                  {locale === "tr" ? "üretirken" : "by building"}
                </TextEffect>{" "}
                {locale === "tr"
                  ? "daha iyi öğrenilir."
                  : "is how we learn best."}
              </Typography>

              <Typography
                variant="p"
                className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
              >
                {copy.intro}
              </Typography>

              <div className="mt-7 flex flex-wrap gap-2">
                {MEDIA_KIT_TOPICS.map((topic) => (
                  <Badge
                    key={topic.id}
                    variant="secondary"
                    radius="sm"
                    className="gap-1.5"
                  >
                    <Icon icon={topic.icon} width={14} height={14} />
                    {topic.label[locale]}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-10 sm:py-14">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Typography
                component="h2"
                variant="h2"
                className="max-w-2xl tracking-[-0.045em]"
              >
                {copy.statsTitle}
              </Typography>
              <Typography
                variant="small"
                className="mt-2 max-w-2xl leading-6 text-muted-foreground"
              >
                {copy.statsDescription}
              </Typography>
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <Typography variant="caption" className="text-muted-foreground">
                {copy.periodLabel}
              </Typography>
              <Typography variant="small" className="mt-0.5 font-medium">
                {MEDIA_KIT_PERIOD[locale]}
              </Typography>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MEDIA_KIT_METRICS.map((metric) => (
              <StatisticCard
                key={metric.id}
                className="rounded-sm border-border bg-card"
                label={metric.label[locale]}
                value={metric.value[locale]}
                change={metric.detail[locale]}
                trend={metric.id === "subscribers" ? "up" : "neutral"}
                icon={
                  <span className="inline-flex size-8 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <Icon icon={metric.icon} width={17} height={17} />
                  </span>
                }
              />
            ))}
          </div>

          <Typography
            variant="caption"
            className="mt-3 block text-muted-foreground"
          >
            * {copy.derivedNote}
          </Typography>
        </section>

        <section className="grid gap-8 border-b border-border py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <Typography
              component="h2"
              variant="h2"
              className="tracking-[-0.045em]"
            >
              {copy.audienceHeadline}
            </Typography>
            <Typography
              variant="small"
              className="mt-3 max-w-lg leading-6 text-muted-foreground"
            >
              {copy.audienceBody}
            </Typography>

            <Card className="mt-6 rounded-sm border-border p-5">
              <Typography variant="large" className="text-base">
                {copy.audienceTitle}
              </Typography>
              <Typography
                variant="small"
                className="mt-2 leading-6 text-muted-foreground"
              >
                {copy.audienceDescription}
              </Typography>
              <div className="mt-5 flex flex-wrap gap-2">
                {MEDIA_KIT_TOPICS.map((topic) => (
                  <Badge key={topic.id} variant="outline" radius="full" size="sm">
                    {topic.label[locale]}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="rounded-sm border-border p-5">
              <div className="flex items-center justify-between gap-3">
                <Typography variant="large" className="text-base">
                  {copy.genderTitle}
                </Typography>
                <Icon
                  icon="mdi:account-group-outline"
                  width={18}
                  height={18}
                  className="text-muted-foreground"
                />
              </div>
              <div className="mt-6 space-y-5">
                {MEDIA_KIT_GENDER.map((item) => (
                  <AudienceBar
                    key={item.id}
                    item={{
                      ...item,
                      label:
                        locale === "tr"
                          ? item.label
                          : item.id === "male"
                            ? "Male"
                            : "Female",
                    }}
                    locale={locale}
                  />
                ))}
              </div>
            </Card>

            <Card className="rounded-sm border-border p-5">
              <div className="flex items-center justify-between gap-3">
                <Typography variant="large" className="text-base">
                  {copy.ageTitle}
                </Typography>
                <Icon
                  icon="mdi:chart-bar"
                  width={18}
                  height={18}
                  className="text-muted-foreground"
                />
              </div>
              <div className="mt-6 space-y-3.5">
                {MEDIA_KIT_AGES.map((item) => (
                  <AudienceBar
                    key={item.id}
                    item={item}
                    locale={locale}
                    max={50}
                  />
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="grid gap-3 border-b border-border py-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-sm border-border p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Typography variant="large" className="text-lg">
                  {copy.formatTitle}
                </Typography>
                <Typography
                  variant="small"
                  className="mt-1 max-w-xl leading-6 text-muted-foreground"
                >
                  {copy.formatDescription}
                </Typography>
              </div>
              <Icon
                icon="mdi:youtube"
                width={28}
                height={28}
                className="shrink-0 text-primary"
              />
            </div>

            <div className="mt-8 space-y-6">
              {MEDIA_KIT_CONTENT_BREAKDOWN.map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-end justify-between gap-3">
                    <Typography variant="small" className="font-medium">
                      {item.label[locale]}
                    </Typography>
                    <div className="flex items-baseline gap-2">
                      <Typography variant="large">
                        {item.value[locale]}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="tabular-nums text-muted-foreground"
                      >
                        %{item.percentage.toLocaleString(
                          locale === "tr" ? "tr-TR" : "en-US",
                        )}
                      </Typography>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <Typography variant="large" className="text-lg">
                {copy.reachTitle}
              </Typography>
              <Icon
                icon="mdi:calendar-check-outline"
                width={20}
                height={20}
                className="text-muted-foreground"
              />
            </div>

            <div className="mt-6 divide-y divide-border">
              {copy.reachItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 py-3 first:pt-0"
                >
                  <Typography variant="small" className="text-muted-foreground">
                    {item.label}
                  </Typography>
                  <Typography variant="h3" className="tabular-nums">
                    {item.value}
                  </Typography>
                </div>
              ))}
            </div>
            <Badge variant="secondary" radius="sm" className="mt-2">
              {copy.reachNote}
            </Badge>
          </Card>
        </section>

        <section className="border-b border-border py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <Typography
                component="h2"
                variant="h2"
                className="tracking-[-0.045em]"
              >
                {copy.partnersTitle}
              </Typography>
              <Typography
                variant="small"
                className="mt-3 max-w-lg leading-6 text-muted-foreground"
              >
                {copy.partnersDescription}
              </Typography>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SPONSORS.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <Card className="flex h-full min-h-32 items-center justify-center rounded-sm border-border bg-white p-6 transition-colors group-hover:border-primary/50">
                    <div className="relative h-12 w-full">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-contain grayscale transition duration-300 group-hover:grayscale-0"
                      />
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-start">
            <Typography variant="large" className="text-base">
              {copy.collaborationTitle}
            </Typography>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.collaborationItems.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-success-icon">
                    <Icon icon="mdi:check" width={13} height={13} />
                  </span>
                  <Typography
                    variant="small"
                    className="leading-5 text-muted-foreground"
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <Card className="relative overflow-hidden rounded-md border-primary/25 bg-primary/5 p-6 sm:p-8">
            <PatternDots
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20"
            />
            <div className="relative max-w-3xl">
              <Typography
                component="h2"
                variant="h2"
                className="tracking-[-0.045em]"
              >
                {copy.ctaTitle}
              </Typography>
              <Typography
                variant="small"
                className="mt-3 max-w-2xl leading-6 text-muted-foreground"
              >
                {copy.ctaDescription}
              </Typography>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  asChild
                  radius="sm"
                  effect="swap"
                  swapTarget="both"
                >
                  <a href="mailto:poyrazavsever@gmail.com">
                    <ButtonIcon>
                      <Icon icon="mdi:email-outline" width={16} height={16} />
                    </ButtonIcon>
                    <ButtonLabel>{copy.emailCta}</ButtonLabel>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
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
                      <Icon icon="mdi:youtube" width={17} height={17} />
                    </ButtonIcon>
                    <ButtonLabel>{copy.youtubeCta}</ButtonLabel>
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <footer className="flex flex-col justify-between gap-2 border-t border-border py-5 sm:flex-row sm:items-center">
          <Typography variant="caption" className="text-muted-foreground">
            {copy.footer}
          </Typography>
          <Typography variant="caption" className="text-muted-foreground">
            {copy.updated}
          </Typography>
        </footer>
      </div>
    </main>
  );
}
