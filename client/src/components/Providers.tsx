"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { ChatUIProvider } from "@/contexts/ChatUIContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryProvider } from "@/components/QueryProvider";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

/**
 * Single composition root for every client-side context. Order matters:
 * Auth must wrap Socket (socket needs the access token), and both must
 * be inside QueryProvider so their calls can share the query client if
 * ever needed.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <SocketProvider>
              <ChatUIProvider>
                {children}
                <ChatWidget />
                <AnalyticsTracker />
                <ServiceWorkerRegister />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: "var(--surface-elevated)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    },
                  }}
                />
              </ChatUIProvider>
            </SocketProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
