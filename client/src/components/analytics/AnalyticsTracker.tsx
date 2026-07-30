"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, sendHeartbeat } from "@/services/api/analyticsService";

const SESSION_KEY = "portfolio-analytics-session";

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/**
 * Silent background component — no UI. Records a pageview on every route
 * change and sends a presence heartbeat every 20s so the admin dashboard
 * can show a live visitor count. No cookies, no third-party trackers.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;
    trackPageView(pathname, document.referrer || undefined);
  }, [pathname, isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return;
    sessionIdRef.current = getOrCreateSessionId();
    const tick = () => sessionIdRef.current && sendHeartbeat(sessionIdRef.current);
    tick();
    const interval = setInterval(tick, 20 * 1000);
    return () => clearInterval(interval);
  }, [isAdminRoute]);

  return null;
}
