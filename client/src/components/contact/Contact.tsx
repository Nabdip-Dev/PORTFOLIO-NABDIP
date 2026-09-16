"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  FiArrowUpRight,
  FiCheck,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";

import { submitContactMessage } from "@/services/api/messageService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().min(2, "Subject is too short").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message should be a bit longer")
    .max(5000),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { t } = useLanguage();

  const mutation = useMutation({
    mutationFn: submitContactMessage,

    onSuccess: () => {
      toast.success("Message sent — I'll get back to you soon.");
      reset();
    },

    onError: () => {
      toast.error("Couldn't send your message. Please try again.");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <section
      id="contact"
      className="contact-section relative isolate overflow-hidden py-24 sm:py-28 lg:py-36"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="contact-orb contact-orb-one absolute -left-32 top-20 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96" />

        <div className="contact-orb contact-orb-two absolute -right-32 bottom-10 h-80 w-80 rounded-full blur-3xl sm:h-[28rem] sm:w-[28rem]" />

        <div className="contact-grid absolute inset-0 opacity-40" />

        <div className="contact-ring absolute left-[8%] top-[20%] hidden h-40 w-40 rounded-full border lg:block" />

        <div className="contact-ring absolute bottom-[12%] right-[10%] hidden h-56 w-56 rounded-full border lg:block" />
      </div>

      <Container>
        {/* Heading */}
        <div className="contact-reveal mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] backdrop-blur-md">
            <span className="contact-status-dot h-1.5 w-1.5 rounded-full" />
            {t.sections.contact.eyebrow}
          </div>

          <SectionHeading
            eyebrow=""
            title={t.sections.contact.title}
            description={t.sections.contact.description}
          />

          <div className="mx-auto mt-7 h-px w-24 overflow-hidden rounded-full">
            <div className="contact-divider h-full w-full" />
          </div>
        </div>

        {/* Main contact layout */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
          {/* Left information card */}
          <div className="contact-reveal contact-info-card relative overflow-hidden rounded-[2rem] border p-7 sm:p-9 lg:p-10">
            {/* Top shine */}
            <div className="contact-card-shine pointer-events-none absolute inset-x-0 top-0 h-px" />

            <div className="relative z-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border">
                <FiMessageCircle size={23} />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] opacity-45">
                Let&apos;s build something
              </p>

              <h3 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
                Have a project
                <span className="contact-accent-text"> in mind?</span>
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 opacity-60 sm:text-[15px]">
                Tell me a little about your idea, product, or business. I&apos;ll
                read your message and get back to you as soon as possible.
              </p>

              {/* Contact details */}
              <div className="mt-9 space-y-3">
                <div className="contact-detail-group">
                  <div className="contact-detail-icon">
                    <FiMail size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-40">
                      Email
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Let&apos;s connect
                    </p>
                  </div>
                </div>

                <div className="contact-detail-group">
                  <div className="contact-detail-icon">
                    <FiMapPin size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-40">
                      Availability
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      Open for selected projects
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom quote */}
              <div className="contact-quote mt-10 rounded-2xl border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="contact-mini-line h-px w-7" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.24em] opacity-40">
                    Quick note
                  </span>
                </div>

                <p className="text-sm leading-6 opacity-65">
                  Good communication turns a great idea into a great product.
                </p>
              </div>
            </div>

            {/* Decorative number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -right-4 select-none text-[9rem] font-black leading-none opacity-[0.035]"
            >
              01
            </span>
          </div>

          {/* Form */}
          <div className="contact-reveal contact-form-card relative overflow-hidden rounded-[2rem] border p-5 sm:p-7 lg:p-9">
            {/* Card top accent */}
            <div className="contact-form-accent absolute inset-x-10 top-0 h-px" />

            {/* Decorative corner */}
            <div
              aria-hidden="true"
              className="contact-corner absolute right-0 top-0 h-32 w-32"
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative z-10"
              noValidate
            >
              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] opacity-40">
                    Start a conversation
                  </p>

                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Send a message
                  </h3>
                </div>

                <div className="contact-form-icon hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border sm:flex">
                  <FiSend size={17} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="contact-field-wrap">
                  <label htmlFor="contact-name" className="contact-label">
                    Name
                  </label>

                  <div
                    className={`contact-input-shell ${errors.name ? "contact-input-error" : ""
                      }`}
                  >
                    <input
                      id="contact-name"
                      {...register("name")}
                      placeholder="Your name"
                      autoComplete="name"
                      className="contact-input"
                    />
                  </div>

                  {errors.name && (
                    <p className="contact-error">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="contact-field-wrap">
                  <label htmlFor="contact-email" className="contact-label">
                    Email
                  </label>

                  <div
                    className={`contact-input-shell ${errors.email ? "contact-input-error" : ""
                      }`}
                  >
                    <input
                      id="contact-email"
                      {...register("email")}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="contact-input"
                    />
                  </div>

                  {errors.email && (
                    <p className="contact-error">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="contact-field-wrap mt-5">
                <label htmlFor="contact-subject" className="contact-label">
                  Subject
                </label>

                <div
                  className={`contact-input-shell ${errors.subject ? "contact-input-error" : ""
                    }`}
                >
                  <input
                    id="contact-subject"
                    {...register("subject")}
                    placeholder="What would you like to build?"
                    className="contact-input"
                  />
                </div>

                {errors.subject && (
                  <p className="contact-error">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="contact-field-wrap mt-5">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="contact-message" className="contact-label">
                    Message
                  </label>

                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] opacity-30">
                    Max 5000 chars
                  </span>
                </div>

                <div
                  className={`contact-textarea-shell ${errors.message ? "contact-input-error" : ""
                    }`}
                >
                  <textarea
                    id="contact-message"
                    {...register("message")}
                    placeholder="Tell me about your project, goals, timeline..."
                    rows={6}
                    className="contact-input min-h-36 resize-none"
                  />
                </div>

                {errors.message && (
                  <p className="contact-error">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-7">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="contact-submit group relative h-12 w-full overflow-hidden rounded-xl border-0 px-6"
                >
                  <span className="contact-button-shine pointer-events-none absolute inset-y-0 -left-20 w-16 skew-x-[-18deg]" />

                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    {mutation.isPending ? (
                      <>
                        <span className="contact-spinner h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                        {t.buttons.sending}
                      </>
                    ) : (
                      <>
                        <FiSend size={15} />
                        {t.buttons.sendMessage}
                        <FiArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </span>
                </Button>
              </div>

              {/* Trust line */}
              <div className="mt-5 flex items-center justify-center gap-2 text-center">
                <FiCheck size={12} className="contact-trust-icon" />
                <p className="text-[10px] uppercase tracking-[0.16em] opacity-35">
                  Your message is handled with care
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom availability line */}
        <div className="contact-reveal mt-10 flex items-center justify-center gap-3">
          <span className="contact-status-dot h-1.5 w-1.5 rounded-full" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.28em] opacity-35">
            Available for new conversations
          </span>
        </div>
      </Container>
    </section>
  );
}