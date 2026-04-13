"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "poyraz-ui/atoms";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

type GalleryContentProps = {
  images: string[];
};

export function GalleryContent({ images }: GalleryContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev,
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < images.length - 1 ? prev + 1 : prev,
        );
      }
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, images.length]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  if (images.length === 0) {
    return (
      <section className="flex h-full items-center justify-center">
        <div className="rounded-xl border border-dashed border-border py-20 px-10 text-center">
          <Typography variant="muted">
            Henüz galeriye görsel eklenmemiş.
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="flex h-full flex-col gap-6 overflow-y-auto pb-10">
        <StaggerContainer className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {images.map((src, index) => (
            <StaggerItem key={src} className="mb-4 break-inside-avoid">
              <div
                className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-border bg-muted/20"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-white/95 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            className="absolute top-4 right-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-colors hover:bg-zinc-200 shadow-sm border border-zinc-200"
            onClick={closeLightbox}
            aria-label="Kapat"
          >
            <Icon icon="mdi:close" width={24} height={24} />
          </button>

          {/* Previous */}
          {lightboxIndex > 0 && (
            <button
              type="button"
              className="absolute left-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-colors hover:bg-zinc-200 shadow-sm border border-zinc-200"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
              aria-label="Önceki"
            >
              <Icon icon="mdi:chevron-left" width={32} height={32} />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < images.length - 1 && (
            <button
              type="button"
              className="absolute right-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-colors hover:bg-zinc-200 shadow-sm border border-zinc-200"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
              aria-label="Sonraki"
            >
              <Icon icon="mdi:chevron-right" width={32} height={32} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Gallery ${lightboxIndex + 1}`}
              width={1920}
              height={1080}
              className="h-full max-h-[90vh] w-auto object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-zinc-100/90 px-4 py-1.5 text-sm text-zinc-900 shadow-sm border border-zinc-200 backdrop-blur-md">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
