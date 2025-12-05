import { privateInstance } from "@/lib/config_backend";
import type { BaseResponse } from "@/Types/BaseResponse";
import z from "zod";

export const theaterSchema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters"),
  city: z.string().min(3, "City is required and must be at least 3 characters"),
  address: z
    .string()
    .min(3, "Address is required and must be at least 3 characters"),
  layout: z.object({
    // coerce digunakan untuk mengkonversi string menjadi number
    total_rows: z.coerce.number(),
    seat_per_row: z.coerce.number(),
  }),
});

export type theaterValues = z.infer<typeof theaterSchema>;

export const getTheaters = async (): Promise<BaseResponse<theaterValues>> =>
  privateInstance.get("/admin/theaters").then((res) => res.data);

export const postTheater = async (
  data: theaterValues
): Promise<BaseResponse<theaterValues>> =>
  privateInstance.post("/admin/theaters", data).then((res) => res.data);

export const getDetailTheater = async (
  slug: string
): Promise<BaseResponse<theaterValues>> =>
  privateInstance.get(`/admin/theater/${slug}`).then((res) => res.data);

export const updateTheater = async (
  slug: string,
  data: theaterValues
): Promise<BaseResponse<theaterValues>> =>
  privateInstance.put(`/admin/theater/${slug}`, data).then((res) => res.data);

export const deleteTheater = async (
  slug: string
): Promise<BaseResponse<theaterValues>> =>
  privateInstance.delete(`/admin/theater/${slug}`).then((res) => res.data);
