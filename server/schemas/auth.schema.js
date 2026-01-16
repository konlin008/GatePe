import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name too short").max(50, "Name too long"),

  email: z.email().max(255, "Email too long"),

  password: z.string().min(6).max(72, "Password too long"),
});
export const loginSchema = z.object({
  email: z.email().max(255, "Email too long"),
  password: z.string().min(6).max(72, "Password too long"),
});
