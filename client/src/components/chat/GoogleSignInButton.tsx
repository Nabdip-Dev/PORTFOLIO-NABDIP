"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    google?: any;
  }
}

/**
 * Renders Google's own "Continue with Google" button via Google Identity
 * Services (GIS) — no redirect flow, so it fits inside the chat modal.
 * The button posts an ID token to our backend, which verifies it there.
 */
export function GoogleSignInButton() {
  const { loginWithGoogle } = useAuth();
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  function initialize() {
    if (!window.google || !buttonRef.current || !clientId) return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: { credential: string }) => {
        try {
          await loginWithGoogle(response.credential);
        } catch {
          toast.error("Google sign-in failed. Please try again.");
        }
      },
    });
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: 280,
      text: "continue_with",
    });
  }

  useEffect(() => {
    if (window.google) initialize();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!clientId) return null; // Not configured — quietly omit rather than showing a broken button.

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initialize} />
      <div ref={buttonRef} className="flex justify-center" />
    </>
  );
}
