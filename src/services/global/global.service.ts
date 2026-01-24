import type { BaseResponse } from "@/Types/BaseResponse";
import { privateInstance } from "@/lib/config_backend";
import type {
  GenreCustomer,
  MovieCustomer,
  MovieFiltered,
} from "./global.type";

export const getMovies = async (): Promise<BaseResponse<MovieCustomer[]>> =>
  privateInstance.get("/customer/movies").then((res) => res.data);

export const getGenres = async (): Promise<BaseResponse<GenreCustomer[]>> =>
  privateInstance.get("/customer/genres").then((res) => res.data);

export const getMovieByGenre = async (
  genreId: string,
): Promise<BaseResponse<MovieFiltered>> =>
  privateInstance
    .get(`/customer/browse-movies/${genreId}`)
    .then((res) => res.data);
