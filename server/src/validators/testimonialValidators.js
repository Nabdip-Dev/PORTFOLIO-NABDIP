import { z } from "zod";

export const testimonialSubmitSchema = z.object({
  name: z.string().trim().min(2).max(100),
  country: z.string().trim().max(100).optional(),
  company: z.string().trim().max(100).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(5).max(1000),
  photo: z.object({ url: z.string().url(), publicId: z.string() }).optional(),
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});
