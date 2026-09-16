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
      className="contact-section relative isolate overflow-hidden py-7 sm:py-8 lg:py-10"
    >
      <Container>
        {/* HEADER */}
        <div className="contact-reveal mx-auto mb-4 max-w-2xl text-center sm:mb-5">
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
            <span className="contact-status-dot h-1.5 w-1.5 rounded-full" />
            {t.sections.contact.eyebrow}
          </div>

          <SectionHeading
            eyebrow=""
            title={t.sections.contact.title}
            description={t.sections.contact.description}
          />

          <div className="mx-auto mt-2 h-px w-12 overflow-hidden rounded-full">
            <div className="contact-divider h-full w-full" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="mx-auto grid max-w-5xl gap-3 lg:grid-cols-[0.72fr_1.28fr]">
          {/* LEFT */}
          <div className="contact-reveal contact-info-card relative overflow-hidden rounded-xl border p-3.5 sm:p-4">
            <div className="contact-card-shine pointer-events-none absolute inset-x-0 top-0 h-px" />

            <div className="relative z-10">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border">
                <FiMessageCircle size={14} />
              </div>

              <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.2em] opacity-45">
                Let&apos;s build something
              </p>

              <h3 className="max-w-sm text-xl font-semibold tracking-tight sm:text-[1.45rem]">
                Have a project
                <span className="contact-accent-text"> in mind?</span>
              </h3>

              <p className="mt-2 max-w-sm text-[11px] leading-5 opacity-60 sm:text-xs">
                Tell me a little about your idea, product, or business. I&apos;ll
                read your message and get back to you as soon as possible.
              </p>

              <div className="mt-4 space-y-2">
                <div className="contact-detail-group">
                  <div className="contact-detail-icon">
                    <FiMail size={12} />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] opacity-40">
                      Email
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium">
                      Let&apos;s connect
                    </p>
                  </div>
                </div>

                <div className="contact-detail-group">
                  <div className="contact-detail-icon">
                    <FiMapPin size={12} />
                  </div>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] opacity-40">
                      Availability
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium">
                      Open for selected projects
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-quote mt-4 rounded-lg border p-2.5">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="contact-mini-line h-px w-4" />
                  <span className="text-[7px] font-semibold uppercase tracking-[0.18em] opacity-40">
                    Quick note
                  </span>
                </div>

                <p className="text-[10px] leading-4.5 opacity-60">
                  Good communication turns a great idea into a great product.
                </p>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-1 select-none text-[5rem] font-black leading-none opacity-[0.025]"
            >
              01
            </span>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-reveal contact-form-card relative overflow-hidden rounded-xl border p-3.5 sm:p-4">
            <div className="contact-form-accent absolute inset-x-6 top-0 h-px" />

            <div className="relative z-10">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.2em] opacity-40">
                    Start a conversation
                  </p>

                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    Send a message
                  </h3>
                </div>

                <div className="contact-form-icon hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border sm:flex">
                  <FiSend size={12} />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-2 sm:grid-cols-2">
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

                <div className="contact-field-wrap mt-2">
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

                <div className="contact-field-wrap mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="contact-message" className="contact-label">
                      Message
                    </label>

                    <span className="text-[7px] font-medium uppercase tracking-[0.12em] opacity-30">
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
                      rows={3}
                      className="contact-input min-h-16 resize-none"
                    />
                  </div>

                  {errors.message && (
                    <p className="contact-error">{errors.message.message}</p>
                  )}
                </div>

                <div className="mt-3">
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="contact-submit group relative h-9 w-full overflow-hidden rounded-lg border-0 px-4 text-[11px]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {mutation.isPending ? (
                        <>
                          <span className="contact-spinner h-3 w-3 rounded-full border-2 border-white/30 border-t-white" />
                          {t.buttons.sending}
                        </>
                      ) : (
                        <>
                          <FiSend size={12} />
                          {t.buttons.sendMessage}
                          <FiArrowUpRight size={12} />
                        </>
                      )}
                    </span>
                  </Button>
                </div>

                <div className="mt-2 flex items-center justify-center gap-1">
                  <FiCheck size={9} className="contact-trust-icon" />
                  <p className="text-[7px] uppercase tracking-[0.12em] opacity-30">
                    Your message is handled with care
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FOOTER STATUS */}
        <div className="contact-reveal mt-3 flex items-center justify-center gap-1.5">
          <span className="contact-status-dot h-1.5 w-1.5 rounded-full" />
          <span className="text-[7px] font-semibold uppercase tracking-[0.22em] opacity-30">
            Available for new conversations
          </span>
        </div>
      </Container>
    </section>
  );
}
