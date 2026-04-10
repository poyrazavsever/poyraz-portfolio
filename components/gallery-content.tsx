"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { Badge, Typography } from "poyraz-ui/atoms";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import type { GalleryItem } from "@/data/gallery";

type GalleryContentProps = {
  items: GalleryItem[];
};

export function GalleryContent({ items }: GalleryContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < items.length - 1 ? prev + 1 : prev,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, items.length]);

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return ["All", ...Array.from(cats)].sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const openLightbox = useCallback(
    (item: GalleryItem) => {
      const index = items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        setLightboxIndex(index);
      }
    },
    [items],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const lightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      <section className="flex h-full flex-col gap-6 overflow-y-auto pb-10">

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <Badge
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full px-4 py-1.5 text-sm"
                >
                  {category}
                </Badge>
              </button>
            ))}
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <Typography variant="muted">Henüz bu kategoride görsel bulunmuyor.</Typography>
          </div>
        ) : (
          <StaggerContainer className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {filteredItems.map((item) => (
              <StaggerItem key={item.id} className="mb-4 break-inside-avoid">
                <div
                  className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-border bg-muted/20"
                  onClick={() => openLightbox(item)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-1 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Typography variant="small" className="font-semibold text-white">
                      {item.title}
                    </Typography>
                    <Typography variant="small" className="text-zinc-300 text-xs">
                      {item.category}
                    </Typography>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>

      {/* Lightbox / Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            type="button"
            className="absolute top-4 right-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="Kapat"
          >
            <Icon icon="mdi:close" width={24} height={24} />
          </button>

          {lightboxIndex! > 0 && (
            <button
              type="button"
              className="absolute left-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex! - 1);
              }}
              aria-label="Önceki"
            >
              <Icon icon="mdi:chevron-left" width={32} height={32} />
            </button>
          )}

          {lightboxIndex! < items.length - 1 && (
            <button
              type="button"
              className="absolute right-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex! + 1);
              }}
              aria-label="Sonraki"
            >
              <Icon icon="mdi:chevron-right" width={32} height={32} />
            </button>
          )}

          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col overflow-hidden rounded-lg animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 bg-zinc-950/50">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                width={1920}
                height={1080}
                className="h-full max-h-[80vh] w-auto object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            <div className="bg-zinc-900 p-4 shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Typography variant="large" className="text-white">
                    {lightboxItem.title}
                  </Typography>
                  <Typography variant="small" className="text-zinc-400">
                    {lightboxItem.category}
                  </Typography>
                </div>
                <div className="text-zinc-500 text-sm">
                  {lightboxIndex! + 1} / {items.length}
                </div>
              </div>
              {lightboxItem.description && (
                <Typography variant="small" className="mt-2 text-zinc-300">
                  {lightboxItem.description}
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
