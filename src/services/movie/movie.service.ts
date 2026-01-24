import type { BaseResponse } from "@/Types/BaseResponse";
import z from "zod";
import type { Movie } from "./movies";
import { privateInstance } from "@/lib/config_backend";

/* =========================
   FILE VALIDATORS
========================= */

// WAJIB (CREATE)
const fileRequired = z
  .any()
  .refine((file) => file instanceof File && file.size > 0, {
    message: "File is required",
  });

// OPSIONAL (UPDATE)
const fileOptional = z
  .any()
  .optional()
  .refine(
    (file) =>
      file === undefined ||
      file === null ||
      (file instanceof File && file.size > 0),
    { message: "Invalid file" },
  );

/* =========================
   CREATE SCHEMA
========================= */

export const movieCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  genre: z.string().min(1, "Genre is required"),
  theaters: z
    .array(z.string().min(1))
    .min(1, "At least one theater is required"),
  available: z.boolean().optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  price: z.number().min(4, "Price must be at least 4"),
  bonus: z.string().optional(),

  // FILE WAJIB
  thumbnail: fileRequired,
  video_trailer: fileRequired,
});

/* =========================
   UPDATE SCHEMA
========================= */

export const movieUpdateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  genre: z.string().min(1, "Genre is required"),
  theaters: z
    .array(z.string().min(1))
    .min(1, "At least one theater is required"),
  available: z.boolean().optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  price: z.number().min(4, "Price must be at least 4"),
  bonus: z.string().optional(),

  // FILE OPSIONAL
  thumbnail: fileOptional,
  video_trailer: fileOptional,
});

/* =========================
   TYPES
========================= */

export type movieCreateValues = z.infer<typeof movieCreateSchema>;
export type movieUpdateValues = z.infer<typeof movieUpdateSchema>;

/* =========================
   API SERVICES
========================= */

export const getMovies = (): Promise<BaseResponse<Movie[]>> =>
  privateInstance.get("/admin/movies").then((res) => res.data);

export const postMovies = (data: FormData): Promise<BaseResponse<Movie>> =>
  privateInstance
    .post("/admin/movies", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const getDetailMovie = async (
  slug: string,
): Promise<BaseResponse<Movie>> =>
  privateInstance.get(`/admin/movie/${slug}`).then((res) => res.data);

export const updateMovie = async (
  slug: string,
  data: FormData,
): Promise<BaseResponse<Movie>> =>
  privateInstance
    .put(`/admin/movie/${slug}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const deleteMovie = async (slug: string): Promise<BaseResponse<Movie>> =>
  privateInstance.delete(`/admin/movie/${slug}`).then((res) => res.data);
