import { z } from "zod";
export const authSchema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["customer", "admin"]).default("customer"),
});
