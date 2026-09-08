import { FiSquare, FiStar } from "react-icons/fi";
import type { TestimonialData } from "@/types/content";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialData;
}) {
  return (
    <article
      className="
        testimonial-card
        relative flex min-h-[270px] flex-col
        overflow-hidden rounded-[20px]
        p-[23px]
        sm:min-h-[285px]
        sm:rounded-3xl
        sm:p-7
      "
    >
      {/* TOP ACCENT */}
      <div
        className="
          testimonial-card-accent
          absolute left-[22px] right-[22px] top-0
          h-0.5
          rounded-b-full
          sm:left-7 sm:right-7
        "
      />

      {/* QUOTE ICON */}
      <div
        className="
          testimonial-card-quote
          absolute right-[19px] top-[19px]
          flex h-[34px] w-[34px]
          items-center justify-center
          rounded-full
          sm:right-6 sm:top-6
          sm:h-[38px] sm:w-[38px]
        "
      >
        <FiSquare size={17} />
      </div>

      {/* RATING */}
      <div className="testimonial-card-rating mb-[17px] flex items-center gap-1">
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

      {/* REVIEW */}
      <p
        className="
          testimonial-card-comment
          m-0 flex-1
          pr-7
          text-[13px]
          leading-[1.7]
          tracking-[-0.005em]
          sm:pr-[34px]
          sm:text-sm
          sm:leading-[1.75]
        "
      >
        &ldquo;{testimonial.comment}&rdquo;
      </p>

      {/* DIVIDER */}
      <div
        className="
          testimonial-card-divider
          mt-[22px]
          mb-[18px]
          h-px
          w-full
        "
      />

      {/* AUTHOR */}
      <div className="flex items-center gap-3">
        {/* AVATAR */}
        {testimonial.photo?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.photo.url}
            alt={testimonial.name}
            className="
              testimonial-card-avatar
              h-[42px] w-[42px]
              shrink-0
              rounded-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              testimonial-card-avatar
              testimonial-card-avatar-fallback
              flex h-[42px] w-[42px]
              shrink-0
              items-center justify-center
              rounded-full
              text-[13px]
              font-bold
            "
          >
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* AUTHOR INFO */}
        <div
          className="
            testimonial-card-author-info
            flex min-w-0
            flex-col
            gap-0.5
          "
        >
          <div
            className="
              testimonial-card-name
              overflow-hidden
              text-ellipsis
              whitespace-nowrap
              text-sm
              font-[650]
              leading-[1.35]
            "
          >
            {testimonial.name}
          </div>

          {(testimonial.company || testimonial.country) && (
            <div
              className="
                testimonial-card-meta
                overflow-hidden
                text-ellipsis
                whitespace-nowrap
                text-[11px]
                leading-[1.4]
              "
            >
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
