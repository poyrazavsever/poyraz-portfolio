"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button, ButtonIcon, ButtonLabel, Card, Typography } from "poyraz-ui/atoms";
import { Modal, ModalContent, ModalTitle } from "poyraz-ui/molecules";
import { useTranslations } from "next-intl";
import { YoutubeLiteEmbed } from "@/components/youtube-lite-embed";
import type { XVideo } from "@/data/x-videos";
import { X_JAVASCRIPT_ANATOMY_URL } from "@/data/x-videos";
import type { PdfNote } from "@/lib/content-page";

type ContentContentProps = {
  youtubeLinks: readonly string[];
  pdfFiles: PdfNote[];
  xVideos: readonly XVideo[];
};

type SectionHeadingProps = {
  title: string;
  titlePrefix?: string;
  titleIcon: string;
  titleIconClassName?: string;
  href: string;
  label: string;
  handle: string;
  icon: string;
};

function SectionHeading({
  title,
  titlePrefix,
  titleIcon,
  titleIconClassName,
  href,
  label,
  handle,
  icon,
}: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Typography
        variant="large"
        className="inline-flex items-center gap-1.5 text-base"
      >
        {titlePrefix ? <span>{titlePrefix}</span> : null}
        <Icon
          icon={titleIcon}
          width={18}
          height={18}
          aria-hidden="true"
          className={titleIconClassName}
        />
        <span>{title}</span>
      </Typography>
      <Button asChild variant="outline" effect="swap" size="xs" radius="sm">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <ButtonIcon>
            <Icon icon={icon} width={15} height={15} />
          </ButtonIcon>
          <ButtonLabel>{handle}</ButtonLabel>
        </a>
      </Button>
    </div>
  );
}

export function ContentContent({
  youtubeLinks,
  pdfFiles,
  xVideos,
}: ContentContentProps) {
  const t = useTranslations("Content");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [activePdfIndex, setActivePdfIndex] = useState(0);

  const activePdf = pdfFiles[activePdfIndex] ?? null;
  const canGoPrev = activePdfIndex > 0;
  const canGoNext = activePdfIndex < pdfFiles.length - 1;
  const embeddedVideos = useMemo(
    () => youtubeLinks.slice(0, 3),
    [youtubeLinks],
  );

  const openPdfModal = (index: number) => {
    setActivePdfIndex(index);
    setPdfModalOpen(true);
  };

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      <section className="space-y-2" aria-labelledby="youtube-section-title">
        <div id="youtube-section-title">
          <SectionHeading
            title={t("youtubeTitle")}
            titlePrefix={t("youtubeTitlePrefix")}
            titleIcon="mdi:youtube"
            titleIconClassName="text-red-600"
            href="https://youtube.com/@poyrazavsever"
            label={t("youtubeChannel")}
            handle="@poyrazavsever"
            icon="mdi:youtube"
          />
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {embeddedVideos.map((link) => (
            <Card
              key={link}
              className="overflow-hidden rounded-sm border-border p-0"
            >
              <YoutubeLiteEmbed link={link} title={t("youtubeEmbedTitle")} />
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-2" aria-labelledby="linkedin-section-title">
        <div id="linkedin-section-title">
          <SectionHeading
            title={t("pdfTitle")}
            titleIcon="mdi:linkedin"
            titleIconClassName="text-[#0a66c2]"
            href="https://www.linkedin.com/in/poyrazavsever/"
            label={t("linkedinProfile")}
            handle="@poyrazavsever"
            icon="mdi:linkedin"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {pdfFiles.map((pdf, index) => (
            <button
              key={pdf.fileName}
              type="button"
              onClick={() => openPdfModal(index)}
              className="cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={t("openPdf", { name: pdf.title })}
            >
              <Card className="relative aspect-4/5 overflow-hidden rounded-sm border-border bg-muted/20 p-0 transition-colors hover:border-zinc-700">
                {pdf.thumbnailSrc ? (
                  <Image
                    src={pdf.thumbnailSrc}
                    alt={t("pdfPreviewTitle", { name: pdf.title })}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <span className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
                    <Icon icon="mdi:file-pdf-box" width={34} height={34} />
                    <Typography variant="small">{pdf.title}</Typography>
                  </span>
                )}
              </Card>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2" aria-labelledby="x-section-title">
        <div id="x-section-title">
          <SectionHeading
            title={t("xTitle")}
            titleIcon="ri:twitter-x-fill"
            href={X_JAVASCRIPT_ANATOMY_URL}
            label={t("xSeries")}
            handle="@poyrazavsever"
            icon="ri:twitter-x-fill"
          />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {xVideos.map((video) => (
            <Card
              key={video.src}
              className="relative aspect-video overflow-hidden rounded-sm border-border bg-black p-0"
            >
              <video
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                aria-label={t("xVideoTitle", { episode: video.episode })}
              >
                <source src={video.src} type="video/mp4" />
                {t("videoUnsupported")}
              </video>
            </Card>
          ))}
        </div>
      </section>

      <Modal open={pdfModalOpen} onOpenChange={setPdfModalOpen}>
        <ModalContent size="xl" className="rounded-sm p-4">
          <ModalTitle>
            {activePdf?.title ?? t("pdfModalDefaultTitle")}
          </ModalTitle>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <Typography variant="small" className="text-muted-foreground">
              {pdfFiles.length === 0
                ? "0 / 0"
                : `${activePdfIndex + 1} / ${pdfFiles.length}`}
            </Typography>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-sm"
                disabled={!canGoPrev}
                onClick={() =>
                  setActivePdfIndex((previous) => Math.max(0, previous - 1))
                }
              >
                {t("prev")}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-sm"
                disabled={!canGoNext}
                onClick={() =>
                  setActivePdfIndex((previous) =>
                    Math.min(pdfFiles.length - 1, previous + 1),
                  )
                }
              >
                {t("next")}
              </Button>
            </div>
          </div>

          {activePdf ? (
            <div className="mt-3 h-[70dvh] overflow-hidden rounded-sm border border-border">
              <iframe
                src={activePdf.href}
                title={activePdf.title}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <Card className="mt-3 rounded-sm border-border p-3">
              <Typography variant="small" className="text-muted-foreground">
                {t("pdfNotFound")}
              </Typography>
            </Card>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
