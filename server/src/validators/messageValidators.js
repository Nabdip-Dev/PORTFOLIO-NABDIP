import { z } from "zod";

export const messageSubmitSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(5).max(5000),
});
