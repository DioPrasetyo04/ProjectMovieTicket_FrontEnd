import { privateInstance } from "@/lib/config_backend";
import type { BaseResponse } from "@/Types/BaseResponse";
import z from "zod";

export const theaterSchema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters"),
  city: z.string().min(3, "City is required and must be at least 3 characters"),
  address: z
    .string()
    .min(3, "Address is required and must be at least 3 characters"),
  movies: z.array(z.string()).optional(),
  layout: z.object({
    total_rows: z.number(),
    seat_per_row: z.number(),
    seats: z.array(
      z.object({
        seat_number: z.string(),
        status: z.string(),
      })
    ),
  }),
});

export type theaterValues = z.infer<typeof theaterSchema>;

export const getTheaters = async (): Promise<BaseResponse<theaterValues>> =>
  privateInstance.get("/admin/theaters").then((res) => res.data);
