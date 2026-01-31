import { z } from "zod";

export const eventInputSchema = z.object({
  title: z
    .string("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100),

  category: z.string("Category is required").min(2),

  description: z.string("Description is required").min(10),

  date: z.coerce.date("Date is required"),

  startTime: z.string("Start time is required").min(1),

  endTime: z.string("End time is required").min(1),

  venue: z.string("Venue is required").min(3),

  city: z.string("City is required").min(2),

  location: z.string("Location is required").min(5),

  deadline: z.coerce.date("Deadline is required"),

  ticketPrice: z.coerce.number("Ticket price is required").min(0),

  ticketQuantity: z.coerce.number("Ticket quantity is required").min(1),
});
