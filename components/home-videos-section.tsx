"use client";

import { Icon } from "@iconify/react";
import { Button, ButtonIcon, ButtonLabel, Card, Typography } from "poyraz-ui/atoms";
import { YOUTUBE_VIDEO_LINKS } from "@/data/youtube-videos";
import { YoutubeLiteEmbed } from "@/components/youtube-lite-embed";
import { useTranslations } from "next-intl";

export function HomeVideosSection() {
  const t = useTranslations("Content");

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Typography
          variant="h3"
          component="h2"
          className="tracking-[-0.035em]"
        >
          {t("youtubeTitle")}
        </Typography>

        <Button
          type="button"
          size="sm"
          radius="sm"
          effect="swap"
          swapTarget="both"
          onClick={() =>
            window.open(
              "https://youtube.com/@poyrazavsever",
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          <ButtonLabel>{t("youtubeChannel")}</ButtonLabel>
          <ButtonIcon>
            <Icon icon="mdi:youtube" width={16} height={16} />
          </ButtonIcon>
        </Button>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {YOUTUBE_VIDEO_LINKS.map((link) => (
          <Card
            key={link}
            className="overflow-hidden rounded-sm border-border p-0"
          >
            <YoutubeLiteEmbed link={link} title={t("youtubeEmbedTitle")} />
          </Card>
        ))}
      </div>
    </section>
  );
}
