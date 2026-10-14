import { z } from "zod";

// One schema for both sides: the form validates with it in the browser
// and the API route runs it again on the server.
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "That's too long"),
  email: z.string().trim().email("That email doesn't look right").max(254, "That's too long"),
  subject: z.string().trim().min(3, "Add a short subject").max(150, "That's too long"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a bit more, 10 characters minimum")
    .max(5000, "That's too long, 5000 characters max"),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;