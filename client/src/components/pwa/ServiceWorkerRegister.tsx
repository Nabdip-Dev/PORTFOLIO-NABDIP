"use client";

import { useEffect } from "react";

/** Registers the service worker on mount. Silently no-ops if unsupported
 * (Safari private mode, very old browsers) — PWA install just won't be offered. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
