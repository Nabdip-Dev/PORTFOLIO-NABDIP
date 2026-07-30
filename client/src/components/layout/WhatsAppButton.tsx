"use client";

import { useQuery } from "@tanstack/react-query";
import { FaWhatsapp } from "react-icons/fa";
import { fetchSettings } from "@/services/api/settingsService";

/** Renders nothing until the admin has actually set a WhatsApp number in
 * Website Settings — no dead/placeholder link ever ships to visitors. */
export function WhatsAppButton() {
  const { data: settings } = useQuery({ queryKey: ["settings"], queryFn: fetchSettings, staleTime: 5 * 60 * 1000 });

  if (!settings?.whatsappNumber) return null;
  const digits = settings.whatsappNumber.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
      style={{ background: "#25D366" }}
    >
      <FaWhatsapp size={17} />
    </a>
  );
}
