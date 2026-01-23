import { z } from "zod";

export const OrganizerDetailsSchema = z.object({
  fullName: z
    .string()
    .nonempty("Full name is required")
    .min(3, "Name too short")
    .max(50, "Name too long"),

  organizerType: z
    .string()
    .nonempty("Organizer Type is required")
    .min(3, "Organizer type too short")
    .max(50, "Organizer type too long"),

  city: z
    .string()
    .nonempty("City is required")
    .min(3, "City too short")
    .max(50, "City too long"),
  state: z
    .string()
    .nonempty("State is required")
    .min(3, "State too short")
    .max(50, "State too long"),
  contactNo: z
    .string()
    .nonempty("Contact No is required")
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
});
