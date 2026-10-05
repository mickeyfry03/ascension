import { z } from "zod";
import { CATEGORIES } from "./types";

export const createRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  title: z.string().trim().min(5, "Give your request a short title").max(120),
  story: z.string().trim().min(30, "Please share a little more detail (30+ characters)").max(3000),
  category: z.enum(CATEGORIES),
  location: z.string().trim().min(2, "Please enter your city or region").max(100),
  amount: z.coerce.number().int("Use a whole dollar amount").min(10, "Minimum is $10").max(50000, "Maximum is $50,000"),
});
export type CreateRequestInput = z.infer<typeof createRequestSchema>;

export const supportSchema = z.object({
  requestId: z.string().min(1),
  donorName: z.string().trim().min(2, "Please enter your name").max(100),
  amount: z.coerce.number().int("Use a whole dollar amount").min(1, "Minimum is $1").max(50000),
  message: z.string().trim().max(500).optional().transform((v) => v || undefined),
});
export type SupportInput = z.infer<typeof supportSchema>;

export const reviewSchema = z.object({
  requestId: z.string().min(1),
  decision: z.enum(["IN_REVIEW", "VERIFIED", "REJECTED"]),
  notes: z.string().trim().max(1000).optional().transform((v) => v || undefined),
});
export type ReviewInput = z.infer<typeof reviewSchema>;
