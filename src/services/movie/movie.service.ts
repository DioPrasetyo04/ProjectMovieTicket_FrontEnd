import type { BaseResponse } from "@/Types/BaseResponse";
import z from "zod";
import type { Movie } from "./movies";
import { privateInstance } from "@/lib/config_backend";

export const movieSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  genre: z.string().min(1, "Genre is required"), // ObjectId biasanya panjang
  theaters: z
    .array(z.string().min(1))
    .min(1, "At least one theater is required"),
  available: z.boolean().optional(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  price: z.number(),
  bonus: z.string().optional(),
  //   refine digunakan untuk mengupload atau menyimpan file
  thumbnail: z.any().refine((file: File) => file?.name, {
    message: "Thumbnail is required",
  }),
  video_trailer: z.any().refine((file: File) => file?.name, {
    message: "Video trailer is required",
  }),
});

export type movieValues = z.infer<typeof movieSchema>;

export const getMovies = (): Promise<BaseResponse<Movie[]>> =>
  privateInstance.get("/admin/movies").then((res) => res.data);

// karena bentuknya file yang akan dikirim tidak bisa menggunakan response json dari movieValues sehingga menggunakan format formData agar bisa get dan transfer data file
export const postMovies = (data: FormData): Promise<BaseResponse<Movie>> =>
  privateInstance
    .post("/admin/movies", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const getDetailMovie = async (
  slug: string
): Promise<BaseResponse<Movie>> =>
  privateInstance.get(`/admin/movie/${slug}`).then((res) => res.data);

export const updateMovie = async (
  slug: string,
  data: FormData
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
