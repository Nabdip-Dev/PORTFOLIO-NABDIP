"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { submitContactMessage } from "@/services/api/messageService";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().min(2, "Subject is too short").max(200),
  message: z.string().trim().min(10, "Message should be a bit longer").max(5000),
});
type FormValues = z.infer<typeof schema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { t } = useLanguage();

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      toast.success("Message sent — I'll get back to you soon.");
      reset();
    },
    onError: () => toast.error("Couldn't send your message. Please try again."),
  });

  return (
    <section id="contact" className="py-24">
      <Container>
        <SectionHeading eyebrow={t.sections.contact.eyebrow} title={t.sections.contact.title} description={t.sections.contact.description} />

        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="mx-auto max-w-xl space-y-4 rounded-card glass p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                {...register("name")}
                placeholder="Your name"
                className="field"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Your email"
                className="field"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <input
              {...register("subject")}
              placeholder="Subject"
              className="field"
            />
            {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
          </div>

          <div>
            <textarea
              {...register("message")}
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting || mutation.isPending} className="w-full">
            <FiSend size={15} />
            {mutation.isPending ? t.buttons.sending : t.buttons.sendMessage}
          </Button>
        </form>
      </Container>
    </section>
  );
}
