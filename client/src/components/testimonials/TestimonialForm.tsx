"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiStar } from "react-icons/fi";
import { useState } from "react";
import { submitTestimonial } from "@/services/api/testimonialService";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  country: z.string().trim().max(100).optional(),
  company: z.string().trim().max(100).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(5, "Please write a bit more").max(1000),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

export function TestimonialForm() {
  const queryClient = useQueryClient();
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { rating: 5 } });

  const rating = watch("rating");

  const mutation = useMutation({
    mutationFn: submitTestimonial,
    onSuccess: () => {
      toast.success("Thank you! Your review is pending approval.");
      reset();
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      className="mx-auto max-w-lg space-y-4 rounded-card glass p-6"
    >
      <h3 className="font-display text-lg font-semibold">Leave a review</h3>

      {/* Honeypot: real visitors never see or fill this. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("honeypot")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            {...register("name")}
            placeholder="Your name"
            className="field"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <input
          {...register("company")}
          placeholder="Company (optional)"
          className="field"
        />
      </div>

      <input
        {...register("country")}
        placeholder="Country (optional)"
        className="field"
      />

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setValue("rating", n, { shouldValidate: true })}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <FiStar
              size={20}
              fill={(hoverRating || rating) >= n ? "var(--accent)" : "none"}
              color={(hoverRating || rating) >= n ? "var(--accent)" : "var(--foreground-muted)"}
            />
          </button>
        ))}
      </div>

      <div>
        <textarea
          {...register("comment")}
          placeholder="Share your experience working with me..."
          rows={4}
          className="field resize-none"
        />
        {errors.comment && <p className="mt-1 text-xs text-red-400">{errors.comment.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting || mutation.isPending} className="w-full">
        {mutation.isPending ? "Submitting..." : "Submit review"}
      </Button>
    </form>
  );
}
