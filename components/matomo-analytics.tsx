"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const MATOMO_URL = (
  process.env.NEXT_PUBLIC_MATOMO_URL || "https://analytics.poyrazavsever.com"
).replace(/\/+$/, "");
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "2";

type MatomoCommand = [string, ...unknown[]];

declare global {
  interface Window {
    _paq?: MatomoCommand[];
  }
}

function pushMatomo(command: MatomoCommand) {
  window._paq = window._paq || [];
  window._paq.push(command);
}

function getLinkEvent(anchor: HTMLAnchorElement): MatomoCommand | null {
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
    return null;
  }

  const currentPage = `${window.location.pathname}${window.location.search}`;

  if (href.startsWith("mailto:")) {
    return ["trackEvent", "Contact", "Email", currentPage];
  }

  if (href.startsWith("tel:")) {
    return ["trackEvent", "Contact", "Phone", currentPage];
  }

  const url = new URL(anchor.href, window.location.href);
  const shortLinkMatch =
    url.hostname === "go.poyrazavsever.com"
      ? url.pathname.match(/^\/(.+)-website\/?$/)
      : null;

  if (shortLinkMatch) {
    return ["trackEvent", "Social outbound", shortLinkMatch[1], currentPage];
  }

  if (url.pathname.toLowerCase().endsWith(".pdf")) {
    return [
      "trackEvent",
      "Download",
      url.pathname.split("/").pop() || "PDF",
      currentPage,
    ];
  }

  if (url.origin !== window.location.origin) {
    return ["trackEvent", "Outbound link", url.hostname, url.toString()];
  }

  return null;
}

function MatomoRouteAndEventTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialPage = useRef(true);
  const query = searchParams.toString();

  useEffect(() => {
    if (isInitialPage.current) {
      isInitialPage.current = false;
      return;
    }

    pushMatomo(["setCustomUrl", window.location.href]);
    pushMatomo(["setDocumentTitle", document.title]);
    pushMatomo(["trackPageView"]);
  }, [pathname, query]);

  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const command = getLinkEvent(anchor);
      if (command) pushMatomo(command);
    };

    document.addEventListener("click", trackClick, { capture: true });
    return () =>
      document.removeEventListener("click", trackClick, { capture: true });
  }, []);

  return null;
}

export function MatomoAnalytics() {
  const trackerUrl = `${MATOMO_URL}/matomo.php`;
  const scriptUrl = `${MATOMO_URL}/matomo.js`;

  return (
    <>
      <Script id="matomo-config" strategy="afterInteractive">
        {`
          window._paq = window._paq || [];
          window._paq.push(['enableLinkTracking']);
          window._paq.push(['enableHeartBeatTimer', 15]);
          window._paq.push(['enableJSErrorTracking']);
          window._paq.push(['setTrackerUrl', ${JSON.stringify(trackerUrl)}]);
          window._paq.push(['setSiteId', ${JSON.stringify(MATOMO_SITE_ID)}]);
          window._paq.push(['trackPageView']);
        `}
      </Script>
      <Script src={scriptUrl} strategy="afterInteractive" />
      <Suspense fallback={null}>
        <MatomoRouteAndEventTracking />
      </Suspense>
    </>
  );
}
