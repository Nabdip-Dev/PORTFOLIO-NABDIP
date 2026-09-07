import { FiSquare, FiStar} from "react-icons/fi";
import type { TestimonialData } from "@/types/content";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialData;
}) {
  return (
    <article className="testimonial-card">
      {/* Top accent line */}
      <div className="testimonial-card-accent" />

      {/* Quote icon */}
      <div className="testimonial-card-quote">
        <FiSquare size={17} />
      </div>

      {/* Rating */}
      <div className="testimonial-card-rating">
        {Array.from({ length: 5 }).map((_, i) => {
          const active = i < testimonial.rating;

          return (
            <FiStar
              key={i}
              size={15}
              strokeWidth={1.8}
              fill={active ? "currentColor" : "none"}
              className={
                active
                  ? "testimonial-star-active"
                  : "testimonial-star-inactive"
              }
            />
          );
        })}
      </div>

      {/* Review */}
      <p className="testimonial-card-comment">
        &ldquo;{testimonial.comment}&rdquo;
      </p>

      {/* Divider */}
      <div className="testimonial-card-divider" />

      {/* Author */}
      <div className="testimonial-card-author">
        {/* Avatar */}
        {testimonial.photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.photo.url}
            alt={testimonial.name}
            className="testimonial-card-avatar"
          />
        ) : (
          <div className="testimonial-card-avatar testimonial-card-avatar-fallback">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Author info */}
        <div className="testimonial-card-author-info">
          <div className="testimonial-card-name">
            {testimonial.name}
          </div>

          {(testimonial.company || testimonial.country) && (
            <div className="testimonial-card-meta">
              {[testimonial.company, testimonial.country]
                .filter(Boolean)
                .join(" · ")}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
