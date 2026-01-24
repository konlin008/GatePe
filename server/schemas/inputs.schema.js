import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID");
export const cityName = z
  .string()
  .min(3, "City name is required")
  .max(50, "City name is too long");
