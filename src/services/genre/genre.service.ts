import type { BaseResponse } from "@/Types/BaseResponse";
import type { Genre } from "./genre.type";
import { privateInstance } from "@/lib/config_backend";
import z from "zod";

export const genreSchema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters"),
});

export type GenreValues = z.infer<typeof genreSchema>;

export const getGenres = async (): Promise<BaseResponse<Genre[]>> =>
  privateInstance.get("/admin/genres").then((res) => res.data);

export const postGenres = async (
  data: GenreValues
): Promise<BaseResponse<Genre>> =>
  privateInstance.post("/admin/genres", data).then((res) => res.data);

export const getDetailGenre = async (
  slug: string
): Promise<BaseResponse<Genre>> =>
  privateInstance.get(`/admin/genre/${slug}`).then((res) => res.data);

export const updateGenre = async (
  slug: string,
  data: GenreValues
): Promise<BaseResponse<Genre>> =>
  privateInstance.put(`/admin/genre/${slug}`, data).then((res) => res.data);

export const deleteGenre = async (slug: string): Promise<BaseResponse<Genre>> =>
  privateInstance.delete(`/admin/genre/${slug}`).then((res) => res.data);
