"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  clamp,
  DEFAULT_TIME,
  mapPointerYToTime,
  SMOOTHING,
  TOTAL_DURATION,
} from "@/lib/cursor-portrait";

const VIDEO_SRC = "/media/cursor-portrait/poyraz-bottom-right.mp4";
const POSTER_SRC = "/media/cursor-portrait/poyraz-bottom-right-poster.webp";
const NIGHT_SRC = "/media/cursor-portrait/gece.webp";

const SEEK_INTERVAL_MS = 1000 / 60;
const MIN_TIME_DELTA = 0.002;
const MIN_SEEK_DELTA = 1 / 120;

type DisplayMode =
  | "pending"
  | "interactive"
  | "poster-reduced"
  | "night-static"
  | "hidden-mobile";

function subscribeToMediaQuery(query: MediaQueryList, listener: () => void) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  query.addListener(listener);
  return () => query.removeListener(listener);
}

export function PoyrazBottomRightFollower() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerYRef = useRef<number | null>(null);
  const targetTimeRef = useRef(DEFAULT_TIME);
  const currentTimeRef = useRef(DEFAULT_TIME);
  const rafIdRef = useRef<number | null>(null);
  const lastSeekTimestampRef = useRef(0);
  const metadataReadyRef = useRef(false);
  const primedRef = useRef(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("pending");
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 840px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateDisplayMode = () => {
      if (!desktopQuery.matches || !finePointerQuery.matches) {
        setDisplayMode("hidden-mobile");
        return;
      }

      if (document.documentElement.dataset.poyrazTheme === "dark") {
        setDisplayMode("night-static");
        return;
      }

      setDisplayMode(reducedMotionQuery.matches ? "poster-reduced" : "interactive");
    };

    updateDisplayMode();
    const unsubscribeFinePointer = subscribeToMediaQuery(
      finePointerQuery,
      updateDisplayMode,
    );
    const unsubscribeDesktop = subscribeToMediaQuery(desktopQuery, updateDisplayMode);
    const unsubscribeReducedMotion = subscribeToMediaQuery(
      reducedMotionQuery,
      updateDisplayMode,
    );
    const themeObserver = new MutationObserver(updateDisplayMode);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-poyraz-theme"],
    });

    return () => {
      unsubscribeFinePointer();
      unsubscribeDesktop();
      unsubscribeReducedMotion();
      themeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (displayMode !== "interactive" || videoFailed) return;

    const video = videoRef.current;
    if (!video) return;

    let disposed = false;

    const stopAnimationLoop = () => {
      if (rafIdRef.current === null) return;
      window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };

    const seekVideo = (timestamp: number) => {
      if (
        !metadataReadyRef.current ||
        video.seeking ||
        timestamp - lastSeekTimestampRef.current < SEEK_INTERVAL_MS
      ) {
        return;
      }

      const duration = Number.isFinite(video.duration)
        ? Math.min(video.duration, TOTAL_DURATION)
        : TOTAL_DURATION;
      const nextTime = clamp(currentTimeRef.current, 0, duration);

      if (Math.abs(video.currentTime - nextTime) < MIN_SEEK_DELTA) return;

      try {
        video.currentTime = nextTime;
        lastSeekTimestampRef.current = timestamp;
      } catch {
        // The poster remains visible until the browser exposes seekable metadata.
      }
    };

    const runAnimationFrame = (timestamp: number) => {
      rafIdRef.current = null;
      if (disposed || document.hidden) return;

      const difference = targetTimeRef.current - currentTimeRef.current;
      const settled = Math.abs(difference) <= MIN_TIME_DELTA;
      currentTimeRef.current = settled
        ? targetTimeRef.current
        : currentTimeRef.current + difference * SMOOTHING;

      seekVideo(timestamp);

      const videoNeedsSeek =
        metadataReadyRef.current &&
        (video.seeking ||
          Math.abs(video.currentTime - targetTimeRef.current) >= MIN_SEEK_DELTA);

      if (!settled || videoNeedsSeek) {
        rafIdRef.current = window.requestAnimationFrame(runAnimationFrame);
      }
    };

    const startAnimationLoop = () => {
      if (
        disposed ||
        document.hidden ||
        !metadataReadyRef.current ||
        rafIdRef.current !== null
      ) {
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(runAnimationFrame);
    };

    const returnToDefault = () => {
      pointerYRef.current = null;
      targetTimeRef.current = DEFAULT_TIME;
      startAnimationLoop();
    };

    const primeVideo = () => {
      if (primedRef.current || !metadataReadyRef.current) return;
      primedRef.current = true;

      const resumeTime = currentTimeRef.current;
      video.muted = true;
      void video
        .play()
        .then(() => {
          if (disposed) return;
          video.pause();
          video.currentTime = resumeTime;
        })
        .catch(() => {
          video.pause();
        });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      pointerYRef.current = event.clientY;
      targetTimeRef.current = mapPointerYToTime(event.clientY, window.innerHeight);
      primeVideo();
      startAnimationLoop();
    };

    const handleResize = () => {
      if (pointerYRef.current === null) return;
      targetTimeRef.current = mapPointerYToTime(
        pointerYRef.current,
        window.innerHeight,
      );
      startAnimationLoop();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimationLoop();
        return;
      }

      startAnimationLoop();
    };

    const handleLoadedMetadata = () => {
      video.pause();
      metadataReadyRef.current = true;
      targetTimeRef.current = DEFAULT_TIME;
      currentTimeRef.current = DEFAULT_TIME;
      video.currentTime = clamp(DEFAULT_TIME, 0, video.duration);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      handleLoadedMetadata();
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", returnToDefault);
    window.addEventListener("blur", returnToDefault);
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disposed = true;
      stopAnimationLoop();
      video.pause();
      metadataReadyRef.current = false;
      primedRef.current = false;
      pointerYRef.current = null;
      targetTimeRef.current = DEFAULT_TIME;
      currentTimeRef.current = DEFAULT_TIME;
      lastSeekTimestampRef.current = 0;
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", returnToDefault);
      window.removeEventListener("blur", returnToDefault);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [displayMode, videoFailed]);

  const showVideo = displayMode === "interactive" && !videoFailed;
  const showNight = displayMode === "night-static";

  if (displayMode === "pending" || displayMode === "hidden-mobile") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-cursor-portrait
      data-portrait-mode={showNight ? "night" : "day"}
      className={`pointer-events-none fixed right-6 bottom-0 z-40 aspect-square w-[clamp(110px,11vw,170px)] select-none ${showNight ? "bg-transparent" : "bg-white"}`}
    >
      {showNight ? (
        <>
          <Image
            src={NIGHT_SRC}
            alt=""
            fill
            sizes="(max-width: 1545px) 11vw, 170px"
            draggable={false}
            className="object-contain"
          />
          <span
            data-sleepy-z="1"
            className="animate-sleepy-z absolute top-[22%] left-[31%] z-10 font-secondary text-[clamp(11px,1vw,15px)] font-bold text-red-100 drop-shadow-[0_0_5px_rgba(248,113,113,0.75)]"
          >
            Z
          </span>
          <span
            data-sleepy-z="2"
            className="animate-sleepy-z absolute top-[13%] left-[22%] z-10 font-secondary text-[clamp(13px,1.15vw,18px)] font-bold text-red-100 drop-shadow-[0_0_6px_rgba(248,113,113,0.8)]"
          >
            Z
          </span>
          <span
            data-sleepy-z="3"
            className="animate-sleepy-z absolute top-[3%] left-[12%] z-10 font-secondary text-[clamp(15px,1.3vw,21px)] font-bold text-red-100 drop-shadow-[0_0_7px_rgba(248,113,113,0.85)]"
          >
            Z
          </span>
        </>
      ) : showVideo ? (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          draggable={false}
          disablePictureInPicture
          className="h-full w-full bg-white object-contain"
          onError={() => setVideoFailed(true)}
        />
      ) : (
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          sizes="(max-width: 1545px) 11vw, 170px"
          draggable={false}
          className="object-contain"
        />
      )}
    </div>
  );
}
