"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Typography } from "poyraz-ui/atoms";
import { Modal, ModalContent, ModalTitle } from "poyraz-ui/molecules";
import { YoutubeLiteEmbed } from "@/components/youtube-lite-embed";

type ContentContentProps = {
  youtubeLinks: readonly string[];
  pdfFiles: string[];
};

function PdfFirstPagePreview({ src, title }: { src: string; title: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: {
      promise: Promise<unknown>;
      destroy?: () => void;
    } | null = null;

    const render = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        const lib = pdfjs as unknown as {
          version: string;
          getDocument: (src: string) => {
            promise: Promise<unknown>;
            destroy?: () => void;
          };
          GlobalWorkerOptions: { workerSrc: string };
        };

        lib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${lib.version}/build/pdf.worker.min.mjs`;
        loadingTask = lib.getDocument(src);

        const pdf = (await loadingTask.promise) as {
          getPage: (page: number) => Promise<{
            getViewport: (opts: { scale: number }) => {
              width: number;
              height: number;
            };
            render: (opts: {
              canvasContext: CanvasRenderingContext2D;
              viewport: { width: number; height: number };
            }) => { promise: Promise<void> };
          }>;
        };

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = "100%";
        canvas.style.height = "auto";

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
    <div className="w-full bg-white p-2">
      <canvas
        ref={canvasRef}
        aria-label={title}
        className="block h-auto w-full"
      />
    </div>
  );
}

export function ContentContent({
  youtubeLinks,
  pdfFiles,
}: ContentContentProps) {
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
    <section className="flex h-full flex-col gap-3 overflow-y-auto">
      <section className="space-y-2">
        <Typography variant="large" className="text-base">
          Son YouTube Videoları
        </Typography>
        <div className="grid gap-2 md:grid-cols-3">
          {embeddedVideos.map((link) => (
            <Card
              key={link}
              className="overflow-hidden rounded-sm border-border p-0"
            >
              <YoutubeLiteEmbed link={link} title="YouTube video oynatici" />
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <Typography variant="large" className="text-base">
          LinkedIn PDF Notları
        </Typography>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {pdfFiles.map((pdf, index) => (
            <button
              key={pdf}
              type="button"
              onClick={() => openPdfModal(index)}
              className="cursor-pointer text-left"
            >
              <Card className="overflow-hidden rounded-sm border-border p-0 transition-colors hover:border-zinc-700">
                <PdfFirstPagePreview
                  src={`/pdf/${pdf}`}
                  title={`${pdf} önizleme`}
                />
              </Card>
            </button>
          ))}
        </div>
      </section>

      <Modal open={pdfModalOpen} onOpenChange={setPdfModalOpen}>
        <ModalContent size="xl" className="rounded-sm p-4">
          <ModalTitle>
            {activePdf ? activePdf.replace(/\.pdf$/i, "") : "PDF Notu"}
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
                  setActivePdfIndex((prev) => Math.max(0, prev - 1))
                }
              >
                Önceki
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-sm"
                disabled={!canGoNext}
                onClick={() =>
                  setActivePdfIndex((prev) =>
                    Math.min(pdfFiles.length - 1, prev + 1),
                  )
                }
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
