"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Icon } from "@iconify/react";
import { Badge, Button, Card, Typography } from "poyraz-ui/atoms";
import { Modal, ModalContent, ModalTitle, Sheet, SheetContent, SheetTitle } from "poyraz-ui/molecules";
import type { PodcastEpisode } from "@/data/content-types";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

type ContentContentProps = {
  yazilimEpisodes: PodcastEpisode[];
  masaBasiEpisodes: PodcastEpisode[];
  youtubeLinks: readonly string[];
  pdfFiles: string[];
};

function getPodcastLabel(podcast: PodcastEpisode["podcast"]) {
  if (podcast === "yazilim") return "Yazılım";
  if (podcast === "masa-basi") return "Masa Başı";
  return podcast;
}

function PdfFirstPagePreview({ src, title }: { src: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: { promise: Promise<unknown>; destroy?: () => void } | null = null;

    const render = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const lib = pdfjs as unknown as {
          version: string;
          getDocument: (src: string) => { promise: Promise<unknown>; destroy?: () => void };
          GlobalWorkerOptions: { workerSrc: string };
        };

        lib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${lib.version}/build/pdf.worker.min.mjs`;
        loadingTask = lib.getDocument(src);

        const pdf = (await loadingTask.promise) as {
          getPage: (page: number) => Promise<{
            getViewport: (opts: { scale: number }) => { width: number; height: number };
            render: (opts: {
              canvasContext: CanvasRenderingContext2D;
              viewport: { width: number; height: number };
            }) => { promise: Promise<void> };
          }>;
        };

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        await page.render({ canvasContext: context, viewport }).promise;
      } catch {
        if (!cancelled) {
          setFailed(true);
        }
      }
    };

    void render();

    return () => {
      cancelled = true;
      if (loadingTask?.destroy) {
        loadingTask.destroy();
      }
    };
  }, [src]);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted/20 p-2">
        <Typography variant="small" className="text-muted-foreground">
          Önizleme yüklenemedi
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-white p-2">
      <canvas ref={canvasRef} aria-label={title} className="h-auto max-h-full w-auto max-w-full" />
    </div>
  );
}

function PodcastColumn({
  title,
  subtitle,
  episodes,
  onOpenEpisode,
}: {
  title: string;
  subtitle: string;
  episodes: PodcastEpisode[];
  onOpenEpisode: (episode: PodcastEpisode) => void;
}) {
  return (
    <Card className="rounded-sm border-border p-4">
      <Typography variant="large" className="text-base">
        {title}
      </Typography>
      <Typography variant="small" className="mt-1 text-muted-foreground">
        {subtitle}
      </Typography>

      <div className="mt-3 grid gap-2">
        {episodes.slice(0, 3).map((episode) => (
          <button
            key={`${episode.podcast}-${episode.slug}`}
            type="button"
            onClick={() => onOpenEpisode(episode)}
            className="cursor-pointer text-left"
          >
            <Card className="rounded-sm border-border p-3 transition-colors hover:border-zinc-700">
              <Typography variant="small" className="font-semibold text-foreground">
                {episode.title}
              </Typography>
              <Typography variant="small" className="mt-0.5 text-muted-foreground">
                {episode.date}
              </Typography>
            </Card>
          </button>
        ))}
      </div>
    </Card>
  );
}

export function ContentContent({
  yazilimEpisodes,
  masaBasiEpisodes,
  youtubeLinks,
  pdfFiles,
}: ContentContentProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [activePdfIndex, setActivePdfIndex] = useState(0);

  const activePdf = pdfFiles[activePdfIndex] ?? null;
  const canGoPrev = activePdfIndex > 0;
  const canGoNext = activePdfIndex < pdfFiles.length - 1;

  const embeddedVideos = useMemo(
    () =>
      youtubeLinks
        .map((link) => ({ link, embedUrl: getYoutubeEmbedUrl(link) }))
        .slice(0, 3),
    [youtubeLinks],
  );

  const openEpisode = (episode: PodcastEpisode) => {
    setSelectedEpisode(episode);
    setSheetOpen(true);
  };

  const openPdfModal = (index: number) => {
    setActivePdfIndex(index);
    setPdfModalOpen(true);
  };

  return (
    <section className="flex h-full flex-col gap-3 overflow-y-auto">
      <section className="grid gap-3 md:grid-cols-2">
        <PodcastColumn
          title="Poyraz ile Yazılım"
          subtitle="Düzenli yayın, her pazar."
          episodes={yazilimEpisodes}
          onOpenEpisode={openEpisode}
        />
        <PodcastColumn
          title="Poyraz ile Masa Başı"
          subtitle="Düzensiz yayın, konuk odaklı."
          episodes={masaBasiEpisodes}
          onOpenEpisode={openEpisode}
        />
      </section>

      <section className="space-y-2">
        <Typography variant="large" className="text-base">
          Son YouTube Videoları
        </Typography>
        <div className="grid gap-2 md:grid-cols-3">
          {embeddedVideos.map((item) => (
            <Card key={item.link} className="overflow-hidden rounded-sm border-border p-0">
              {item.embedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={item.embedUrl}
                    title="YouTube video oynatıcı"
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-3">
                  <Typography variant="small" className="text-muted-foreground">
                    Geçersiz video bağlantısı.
                  </Typography>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <Typography variant="large" className="text-base">
          LinkedIn PDF Notları
        </Typography>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
          {pdfFiles.map((pdf, index) => (
            <button
              key={pdf}
              type="button"
              onClick={() => openPdfModal(index)}
              className="cursor-pointer text-left"
            >
              <Card className="overflow-hidden rounded-sm border-border p-0 transition-colors hover:border-zinc-700">
                <div className="aspect-square w-full">
                  <PdfFirstPagePreview src={`/pdf/${pdf}`} title={`${pdf} önizleme`} />
                </div>
              </Card>
            </button>
          ))}
        </div>
      </section>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full max-w-xl p-0">
          <div className="border-b border-border px-4 py-3">
            <SheetTitle>{selectedEpisode?.title ?? "Bölüm"}</SheetTitle>
            {selectedEpisode ? (
              <Typography variant="small" className="mt-1 text-muted-foreground">
                {selectedEpisode.date}
              </Typography>
            ) : null}
          </div>

          <div className="flex max-h-[calc(100dvh-64px)] flex-col gap-3 overflow-y-auto p-4">
            {selectedEpisode ? (
              <>
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-sm">{getPodcastLabel(selectedEpisode.podcast)}</Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={selectedEpisode.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon icon="mdi:youtube" width={16} height={16} className="text-red-600" />
                    YouTube
                  </Link>
                  <Link
                    href={selectedEpisode.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon icon="mdi:spotify" width={16} height={16} className="text-green-600" />
                    Spotify
                  </Link>
                </div>

                <Card className="rounded-sm border-border p-3">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => (
                        <Typography variant="large" className="mt-3 text-foreground first:mt-0">
                          {children}
                        </Typography>
                      ),
                      p: ({ children }) => (
                        <Typography variant="small" className="mt-1 text-muted-foreground first:mt-0">
                          {children}
                        </Typography>
                      ),
                      li: ({ children }) => (
                        <li className="ml-5 list-disc text-sm text-muted-foreground">{children}</li>
                      ),
                    }}
                  >
                    {selectedEpisode.markdown}
                  </ReactMarkdown>
                </Card>
              </>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>

      <Modal open={pdfModalOpen} onOpenChange={setPdfModalOpen}>
        <ModalContent size="xl" className="rounded-sm p-4">
          <ModalTitle>{activePdf ? activePdf.replace(/\.pdf$/i, "") : "PDF Notu"}</ModalTitle>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <Typography variant="small" className="text-muted-foreground">
              {pdfFiles.length === 0 ? "0 / 0" : `${activePdfIndex + 1} / ${pdfFiles.length}`}
            </Typography>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-sm"
                disabled={!canGoPrev}
                onClick={() => setActivePdfIndex((prev) => Math.max(0, prev - 1))}
              >
                Önceki
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-sm"
                disabled={!canGoNext}
                onClick={() => setActivePdfIndex((prev) => Math.min(pdfFiles.length - 1, prev + 1))}
              >
                Sonraki
              </Button>
            </div>
          </div>

          {activePdf ? (
            <div className="mt-3 h-[70dvh] overflow-hidden rounded-sm border border-border">
              <iframe
                src={`/pdf/${activePdf}`}
                title={activePdf}
                className="h-full w-full"
              />
            </div>
          ) : (
            <Card className="mt-3 rounded-sm border-border p-3">
              <Typography variant="small" className="text-muted-foreground">
                `/public/pdf` içinde PDF bulunamadı.
              </Typography>
            </Card>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
