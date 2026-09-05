"use client";

import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { BlogDetail } from "@/data/blog-detail";
import {
  getArticlePath,
  getShareCardPath,
  type ArticleSection,
} from "@/lib/article-share";

type ArticleShareProps = Pick<
  BlogDetail,
  "slug" | "title" | "excerpt" | "author" | "lang"
> & {
  section: ArticleSection;
  placement?: "sidebar" | "footer";
};

type ShareStatus = "idle" | "preparing" | "downloaded" | "failed";

function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
}

export function ArticleShare({
  slug,
  title,
  excerpt,
  author,
  lang,
  section,
  placement = "footer",
}: ArticleShareProps) {
  const t = useTranslations("Blog");
  const [storyStatus, setStoryStatus] = useState<ShareStatus>("idle");
  const isSidebar = placement === "sidebar";

  const articlePath = getArticlePath({ locale: lang, section, slug });

  const getArticleUrl = () => new URL(articlePath, window.location.origin).toString();

  const shareToStory = async () => {
    setStoryStatus("preparing");

    try {
      const imageUrl = getShareCardPath({
        locale: lang,
        section,
        slug,
        variant: "story",
      });
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Share image could not be generated");

      const blob = await response.blob();
      const file = new File([blob], `${slug}-instagram-story.png`, {
        type: "image/png",
      });
      const shareData = {
        title,
        text: excerpt,
        url: getArticleUrl(),
        files: [file],
      };

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share(shareData);
        setStoryStatus("idle");
        return;
      }

      downloadBlob(blob, file.name);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(getArticleUrl()).catch(() => undefined);
      }
      setStoryStatus("downloaded");
      window.setTimeout(() => setStoryStatus("idle"), 3_000);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStoryStatus("idle");
        return;
      }

      setStoryStatus("failed");
      window.setTimeout(() => setStoryStatus("idle"), 3_000);
    }
  };

  const shareToX = () => {
    const shareText = lang === "tr" ? `${title}\n\n${author}` : `${title}\n\nBy ${author}`;
    const intentUrl = new URL("https://x.com/intent/tweet");
    intentUrl.searchParams.set("text", shareText);
    intentUrl.searchParams.set("url", getArticleUrl());
    window.open(intentUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const statusLabel =
    storyStatus === "preparing"
      ? t("sharePreparing")
      : storyStatus === "downloaded"
        ? t("shareDownloaded")
        : storyStatus === "failed"
          ? t("shareFailed")
          : null;

  const buttonClass = [
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-background text-foreground transition-colors hover:border-red-600 hover:text-red-600 disabled:cursor-wait disabled:opacity-60",
    isSidebar ? "min-h-9 px-2 text-xs" : "min-h-10 px-3 text-sm",
  ].join(" ");

  return (
    <section
      aria-label={t("shareTitle")}
      className={
        isSidebar
          ? "mb-4 border-b border-border pb-4"
          : "rounded-sm border border-border bg-muted/20 p-4"
      }
    >
      <div className={isSidebar ? "mb-2" : "mb-3"}>
        <p className="text-sm font-semibold text-foreground">{t("shareTitle")}</p>
        {!isSidebar ? (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {t("shareDescription")}
          </p>
        ) : null}
      </div>

      <div className={isSidebar ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}>
        <button
          type="button"
          onClick={() => void shareToStory()}
          disabled={storyStatus === "preparing"}
          className={buttonClass}
          aria-label={t("shareStoryAria")}
        >
          <Icon
            icon={storyStatus === "preparing" ? "mdi:loading" : "mdi:instagram"}
            width={17}
            height={17}
            className={storyStatus === "preparing" ? "animate-spin" : undefined}
          />
          <span>{isSidebar ? t("shareStoryShort") : t("shareInstagram")}</span>
        </button>

        <button
          type="button"
          onClick={shareToX}
          className={buttonClass}
          aria-label={t("shareXAria")}
        >
          <Icon icon="fa6-brands:x-twitter" width={15} height={15} />
          <span>{isSidebar ? "X" : t("shareX")}</span>
        </button>
      </div>

      <p
        aria-live="polite"
        className={[
          "overflow-hidden text-xs transition-all",
          statusLabel
            ? "mt-2 max-h-10 text-muted-foreground opacity-100"
            : "mt-0 max-h-0 opacity-0",
          storyStatus === "failed" ? "text-red-600" : "",
        ].join(" ")}
      >
        {statusLabel}
      </p>
    </section>
  );
}
