"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  trackPageView,
  sendHeartbeat,
} from "@/services/api/analyticsService";

const SESSION_KEY = "portfolio-analytics-session";

function generateSessionId(): string {
  // Preferred: use crypto.randomUUID when available
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  // Fallback for browsers/runtimes without crypto.randomUUID
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  // Last fallback
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);

  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, id);
  }

  return id;
}

/**
 * Silent background component — no UI.
 *
 * Records a pageview on every route change and sends a presence
 * heartbeat every 20s so the admin dashboard can show a live
 * visitor count.
 *
 * No cookies, no third-party trackers.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);

  const isAdminRoute = pathname.startsWith("/admin");

  // Track page views
  useEffect(() => {
    if (isAdminRoute) return;

    trackPageView(
      pathname,
      document.referrer || undefined
    );
  }, [pathname, isAdminRoute]);

  // Send heartbeat every 20 seconds
  useEffect(() => {
    if (isAdminRoute) return;

    sessionIdRef.current = getOrCreateSessionId();

    const tick = () => {
      if (sessionIdRef.current) {
        sendHeartbeat(sessionIdRef.current);
      }
    };

    // Send immediately
    tick();

    // Then every 20 seconds
    const interval = setInterval(tick, 20 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isAdminRoute]);

  return null;
}
