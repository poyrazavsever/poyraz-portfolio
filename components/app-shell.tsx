"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { AnnouncementBar } from "poyraz-ui/organisms";
import { Button, TextEffect } from "poyraz-ui/atoms";
import { SiteNavbar } from "@/components/site-navbar";
import { NekoFollower } from "@/components/neko-follower";
import { PoyrazBottomRightFollower } from "@/components/poyraz-bottom-right-follower";
import { SimplePortfolio } from "@/components/simple-portfolio";
import { ANNOUNCEMENT_ITEMS, ENABLE_NEKO_FOLLOWER } from "@/data/site-settings";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedValue } from "@/lib/locale";
import { usePathname } from "@/i18n/routing";
import dynamic from "next/dynamic";
import type { AnimationSourceSearchItem } from "@/lib/command-palette-links";
import {
  LayoutLeftPromoRail,
  LayoutRightPromoRail,
  type LayoutContentPromo,
} from "@/components/layout-promo-rails";

const AtaturkWidgetModal = dynamic(
  () => import("@/components/ataturk-widget-modal").then((mod) => mod.AtaturkWidgetModal),
  { ssr: false }
);

type AppShellProps = {
  children: React.ReactNode;
  animationSources: AnimationSourceSearchItem[];
  latestAgenda: LayoutContentPromo | null;
  latestPost: LayoutContentPromo | null;
};

export type ThemeMode = "light" | "dark";

type ExperienceMode = "complex" | "simple";
type ExperiencePhase = "checking" | "choosing" | "loading" | "ready";

const EXPERIENCE_STORAGE_KEY = "poyraz-portfolio-experience";
const LOADING_DURATION_MS = 3_000;

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("poyraz-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppShell({
  children,
  animationSources,
  latestAgenda,
  latestPost,
}: AppShellProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Experience");
  const reduceMotion = useReducedMotion();
  const announcement = ANNOUNCEMENT_ITEMS[0];
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [experience, setExperience] = useState<ExperienceMode | null>(null);
  const [phase, setPhase] = useState<ExperiencePhase>("checking");
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const chooserRef = useRef<HTMLElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    document.documentElement.dataset.poyrazTheme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("poyraz-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isHome) return;

    const checkStorageTimer = window.setTimeout(() => {
      const storedExperience = window.sessionStorage.getItem(EXPERIENCE_STORAGE_KEY);
      if (storedExperience === "complex" || storedExperience === "simple") {
        setExperience(storedExperience);
        setPhase("ready");
        return;
      }

      setExperience(null);
      setPhase("choosing");
    }, 0);

    return () => window.clearTimeout(checkStorageTimer);
  }, [isHome]);

  useEffect(() => {
    if (!isHome || phase === "ready") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isHome, phase]);

  useEffect(() => {
    if (phase !== "choosing") return;
    firstChoiceRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;

    const finishTimer = window.setTimeout(() => setPhase("ready"), LOADING_DURATION_MS);

    return () => {
      window.clearTimeout(finishTimer);
    };
  }, [phase]);

  const localizedText = announcement ? getLocalizedValue(announcement.text, locale) : "";

  const chooseExperience = (nextExperience: ExperienceMode) => {
    window.sessionStorage.setItem(EXPERIENCE_STORAGE_KEY, nextExperience);
    setExperience(nextExperience);
    setPhase("loading");
  };

  const chooseAgain = () => {
    window.sessionStorage.removeItem(EXPERIENCE_STORAGE_KEY);
    setExperience(null);
    setPhase("choosing");
  };

  const keepFocusInChooser = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
      chooserRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) return;
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const complexExperience = (
    <>
      <AtaturkWidgetModal theme={theme} />
      {ENABLE_NEKO_FOLLOWER ? <NekoFollower /> : null}
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-4 px-4 min-[1420px]:grid-cols-[220px_minmax(0,896px)_220px] min-[1420px]:justify-between">
        <LayoutLeftPromoRail
          latestAgenda={latestAgenda}
          latestPost={latestPost}
        />
        <div className="min-w-0 w-full max-w-4xl justify-self-center min-[1420px]:max-w-none">
          <div className="pt-4">
            <SiteNavbar
              theme={theme}
              onThemeChange={setTheme}
              animationSources={animationSources}
              onChooseExperience={isHome ? chooseAgain : undefined}
            />
            {announcement ? (
              <AnnouncementBar
                variant="branded"
                dismissible={false}
                icon={<Icon icon="mdi:sparkles" width={16} height={16} />}
              >
                {localizedText}
              </AnnouncementBar>
            ) : null}
          </div>
          <main className="min-w-0 py-4">{children}</main>
        </div>
        <LayoutRightPromoRail />
      </div>
      <PoyrazBottomRightFollower />
    </>
  );

  if (!isHome) return complexExperience;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh">
        {phase === "ready" && experience === "complex" ? complexExperience : null}
        {phase === "ready" && experience === "simple" ? (
          <SimplePortfolio
            latestAgenda={latestAgenda}
            latestPost={latestPost}
            onChooseExperience={chooseAgain}
          />
        ) : null}

        <AnimatePresence mode="sync" initial={false}>
          {phase === "checking" ? (
            <motion.div
              key="experience-checking"
              className="fixed inset-0 z-[100] bg-white"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              aria-hidden="true"
            />
          ) : null}

          {phase === "choosing" ? (
            <motion.section
              key="experience-chooser"
              ref={chooserRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="experience-title"
              onKeyDown={keepFocusInChooser}
              className="fixed inset-0 z-[100] grid min-h-dvh place-items-center overflow-y-auto bg-white px-4 text-zinc-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.32 }}
            >
              <div className="flex items-center justify-center">
                <h1 id="experience-title" className="sr-only">
                  {t("chooserTitle")}
                </h1>
                <motion.div
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center gap-4"
                >
                  <Button
                    ref={firstChoiceRef}
                    type="button"
                    size="icon-lg"
                    radius="lg"
                    effect="shine"
                    aria-label={t("complex")}
                    onClick={() => chooseExperience("complex")}
                    className="size-20 cursor-pointer sm:size-24"
                  >
                    <Icon icon="mdi:view-dashboard-variant-outline" width={38} height={38} />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-lg"
                    radius="lg"
                    effect="shine"
                    aria-label={t("simple")}
                    onClick={() => chooseExperience("simple")}
                    className="size-20 cursor-pointer border-zinc-200 bg-zinc-50 text-zinc-950 hover:bg-zinc-100 sm:size-24"
                  >
                    <Icon icon="mdi:card-text-outline" width={38} height={38} />
                  </Button>
                </motion.div>
              </div>
            </motion.section>
          ) : null}

          {phase === "loading" ? (
            <motion.section
              key="experience-loading"
              role="status"
              aria-live="polite"
              aria-label={t("loading")}
              className="fixed inset-0 z-[110] flex min-h-dvh items-center justify-center overflow-hidden bg-primary px-5 text-primary-foreground sm:px-10"
              initial={reduceMotion ? { opacity: 0 } : { y: "100vh" }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100vw", y: 0 }}
              transition={{ duration: reduceMotion ? 0.16 : 0.68, ease: [0.76, 0, 0.24, 1] }}
            >
              <TextEffect
                effect="shimmer"
                className="font-primary text-[clamp(3rem,10vw,8.5rem)] font-black italic leading-none tracking-[-0.065em] [--poyraz-primary-foreground:white] [--poyraz-text-effect:rgba(255,255,255,0.52)]"
              >
                {t("loading")}
              </TextEffect>
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
