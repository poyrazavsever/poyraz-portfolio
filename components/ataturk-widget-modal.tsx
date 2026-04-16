"use client";

import { useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { Modal, ModalContent, ModalTrigger, ModalTitle } from "poyraz-ui/molecules";
import { Skeleton } from "poyraz-ui/atoms";

export function AtaturkWidgetModal() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Modal>
      <ModalTrigger asChild>
        <button
          type="button"
          title="Bugünün Atatürk Sözü"
          className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-red-600 bg-background shadow-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Bugünün Atatürk Sözü"
        >
          <div className="relative h-full w-full">
            <Image
              src="/ataturk.png"
              alt="Mustafa Kemal Atatürk"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        </button>
      </ModalTrigger>

      <ModalContent className="flex flex-col justify-center p-6 sm:max-w-[425px] min-h-[160px] transition-all duration-300">
        <ModalTitle className="sr-only">Bugünün Atatürk Sözü</ModalTitle>
        
        {isLoading && (
          <div className="flex w-full flex-col space-y-3">
            <Skeleton className="h-4 w-3/4 rounded-sm" />
            <Skeleton className="h-4 w-full rounded-sm" />
            <Skeleton className="h-4 w-5/6 rounded-sm" />
            <div className="pt-2">
              <Skeleton className="h-3 w-1/4 rounded-sm" />
            </div>
          </div>
        )}

        <div className={`w-full ${isLoading ? "hidden" : "block"}`}>
          <div data-ataturk-quote-widget data-language="tr" data-theme="light"></div>
          <Script
            src="https://ataturk-kronolojisi.org/widget/quote.js"
            strategy="lazyOnload"
            data-language="tr"
            data-theme="light"
            onReady={() => setIsLoading(false)}
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
