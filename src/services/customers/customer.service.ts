import type { BaseResponse } from "@/Types/BaseResponse";
import type { User } from "./user.type";
import { privateInstance } from "@/lib/config_backend";
import z from "zod";

const fileRequired = z
  .any()
  .refine((file) => file instanceof File && file.size > 0, {
    message: "File Photo is required",
  });

const fileOptional = z
  .any()
  .optional()
  .refine(
    (file) =>
      file === undefined ||
      file === null ||
      (file instanceof File && file.size > 0),
    { message: "Invalid file" }
  );

export const UserCreateSchema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  photo: fileRequired,
  role: z.enum(["customer", "admin"]).optional(),
});

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required and must be at least 3 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  photo: fileOptional,
  role: z.enum(["customer", "admin"]).optional(),
});

export type userCreateValue = z.infer<typeof UserCreateSchema>;

export type userUpdateValue = z.infer<typeof UserUpdateSchema>;

export const getCustomers = async (): Promise<BaseResponse<User[]>> =>
  privateInstance.get("/admin/users").then((res) => res.data);

export const postCustomer = async (
  data: FormData
): Promise<BaseResponse<User>> =>
  privateInstance
    .post("/admin/users", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const getDetailCustomer = async (
  email: string
): Promise<BaseResponse<User>> =>
  privateInstance.get(`/admin/user/${email}`).then((res) => res.data);

export const updateCustomer = async (
  email: string,
  data: FormData
): Promise<BaseResponse<User>> =>
  privateInstance
    .put(`/admin/user/${email}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const deleteCustomer = async (
  email: string
): Promise<BaseResponse<User>> =>
  privateInstance.delete(`/admin/user/${email}`).then((res) => res.data);
