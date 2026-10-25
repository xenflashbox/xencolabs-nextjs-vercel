"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type OpenAIQueue = {
  (...args: unknown[]): void;
  q: IArguments[];
};

declare global {
  interface Window {
    oaiq?: OpenAIQueue;
    __xencoOpenAIPixelInitialized?: boolean;
    __xencoOpenAIPixelPage?: string;
  }
}

const PIXEL_ID = "PSGfsofwnfmTM3v5ykFwyP";
const PIXEL_SCRIPT_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

function initializePixel() {
  if (!window.oaiq) {
    const queue = function (..._args: unknown[]) {
      queue.q.push(arguments);
    } as unknown as OpenAIQueue;

    queue.q = [];
    window.oaiq = queue;

    const script = document.createElement("script");
    script.async = true;
    script.src = PIXEL_SCRIPT_URL;

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  if (!window.__xencoOpenAIPixelInitialized) {
    window.oaiq("init", { pixelId: PIXEL_ID, debug: false });
    window.__xencoOpenAIPixelInitialized = true;
  }
}

export function OpenAIPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    initializePixel();

    const page = `${window.location.pathname}${window.location.search}`;
    if (window.__xencoOpenAIPixelPage === page) return;

    window.__xencoOpenAIPixelPage = page;
    window.oaiq?.("measure", "page_viewed", { type: "contents" });
  }, [pathname]);

  return null;
}
