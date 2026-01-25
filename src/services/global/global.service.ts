import type { BaseResponse } from "@/Types/BaseResponse";
import { privateInstance } from "@/lib/config_backend";
import type {
  GenreCustomer,
  MovieCustomer,
  MovieFiltered,
} from "./global.type";
import type { FilterState } from "@/redux/features/filter/filterSlice";

export const getMovies = async (): Promise<BaseResponse<MovieCustomer[]>> =>
  privateInstance.get("/customer/movies").then((res) => res.data);

export const getGenres = async (): Promise<BaseResponse<GenreCustomer[]>> =>
  privateInstance.get("/customer/genres").then((res) => res.data);

export const getMovieByGenre = async (
  genreId: string,
  params?: FilterState,
): Promise<BaseResponse<MovieFiltered>> =>
  privateInstance
    .get(`/customer/browse-movies/${genreId}`, {
      params: params,
    })
    .then((res) => res.data);
