"use client";

import Script from "next/script";

export function HomeFooterSection() {
  return (
    <div className="mt-auto flex w-full flex-col items-center justify-center pt-4">
      <div data-ataturk-quote-widget data-language="tr" data-theme="light"></div>
      <Script
        src="https://ataturk-kronolojisi.org/widget/quote.js"
        strategy="lazyOnload"
        data-language="tr"
        data-theme="light"
      />
    </div>
  );
}
