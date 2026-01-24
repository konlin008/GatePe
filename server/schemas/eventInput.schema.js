import { z } from "zod";

export const eventInputSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  category: z.string().min(2, "Category is required").max(50),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),

  date: z.coerce.date(),

  startTime: z.string().min(1, "Start time is required"),

  endTime: z.string().min(1, "End time is required"),

  venue: z.string().min(3, "Venue must be at least 3 characters").max(150),

  city: z.string().min(2, "City name is required").max(50),

  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200),

  deadline: z.coerce.date(),

  ticketPrice: z.coerce
    .number()
    .min(0, "Ticket price cannot be negative")
    .max(100000, "Ticket price too high"),

  ticketQuantity: z.coerce
    .number()
    .min(1, "At least 1 ticket required")
    .max(10000, "Ticket quantity too large"),
});
