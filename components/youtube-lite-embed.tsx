"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Typography } from "poyraz-ui/atoms";
import { getYoutubeEmbedUrl, getYoutubeVideoId } from "@/lib/youtube";

type YoutubeLiteEmbedProps = {
  link: string;
  title?: string;
};

export function YoutubeLiteEmbed({
  link,
  title = "YouTube video oynatici",
}: YoutubeLiteEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useJpgThumb, setUseJpgThumb] = useState(false);

  const { videoId, embedUrl } = useMemo(
    () => ({
      videoId: getYoutubeVideoId(link),
      embedUrl: getYoutubeEmbedUrl(link),
    }),
    [link],
  );

  if (!videoId || !embedUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center p-3">
        <Typography variant="small" className="text-muted-foreground">
          Gecersiz video baglantisi.
        </Typography>
      </div>
    );
  }

  if (isLoaded) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  const thumbnailSrc = useJpgThumb
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`;

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className="group relative block aspect-video w-full cursor-pointer overflow-hidden"
      aria-label={`${title} videosunu oynat`}
    >
      <Image
        src={thumbnailSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setUseJpgThumb(true)}
      />
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-lg">
          <span className="ml-0.5 inline-block h-0 w-0 border-y-[9px] border-y-transparent border-l-14 border-l-white" />
        </span>
      </span>
    </button>
  );
}
