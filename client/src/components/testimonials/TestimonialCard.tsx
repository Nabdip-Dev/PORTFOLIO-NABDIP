import { FiStar } from "react-icons/fi";
import type { TestimonialData } from "@/types/content";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div className="flex h-full flex-col rounded-card glass card-premium p-6">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            fill={i < testimonial.rating ? "var(--accent)" : "none"}
            color={i < testimonial.rating ? "var(--accent)" : "var(--foreground-muted)"}
          />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm text-[var(--foreground-muted)]">&ldquo;{testimonial.comment}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        {testimonial.photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={testimonial.photo.url} alt={testimonial.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-[var(--accent-foreground)]" style={{ background: "var(--gradient-accent)" }}>
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div className="text-sm font-medium">{testimonial.name}</div>
          <div className="text-xs text-[var(--foreground-muted)]">
            {[testimonial.company, testimonial.country].filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>
    </div>
  );
}
