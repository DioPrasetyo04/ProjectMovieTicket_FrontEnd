import type { BaseResponse } from "@/Types/BaseResponse";
import { z } from "zod";
import type { LoginResponse } from "./auth.type";
import { globalInstance } from "@/lib/config_backend";

export const authSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name is required and must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["customer", "admin"]),
  })
  .strict();

export const signUpSchema = authSchema.omit({ role: true }).extend({
  photo: z
    .any()
    .refine((file: File) => file?.name, { message: "Photo is required" }),
});

// mengecualikan atribute name (omit)
export const loginSchema = authSchema.omit({ name: true });

// z.infer itu digunakan untuk mengambil tipe data dari schema
export type LoginValues = z.infer<typeof loginSchema>;

export type RegisterValues = z.infer<typeof signUpSchema>;

export const login = async (
  data: LoginValues
): Promise<BaseResponse<LoginResponse>> =>
  globalInstance.post("/login", data).then((res) => res.data);

export const signUp = async (data: FormData) =>
  globalInstance.post("/register", data).then((res) => res.data);
