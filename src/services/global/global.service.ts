import type { BaseResponse } from "@/Types/BaseResponse";
import { privateInstance } from "@/lib/config_backend";
import type {
  Balance,
  DataMovieDetail,
  GenreCustomer,
  MovieCustomer,
  MovieFiltered,
  SelectedSeat,
  TransactionValues,
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

export const getMovieDetail = async (
  movieSlug: string,
): Promise<BaseResponse<DataMovieDetail>> =>
  privateInstance.get(`/customer/movie/${movieSlug}`).then((res) => res.data);

export const checkSeats = async (
  movieId: string,
  date: string,
): Promise<BaseResponse<SelectedSeat[]>> =>
  privateInstance
    .get(`/customer/check-seats/${movieId}`, {
      params: {
        date: date.replace(".", ":"),
      },
    })
    .then((res) => res.data);

export const getBalance = async (): Promise<BaseResponse<Balance>> =>
  privateInstance.get("/customer/check-balance").then((res) => res.data);

export const BuyTicket = async (data: TransactionValues) =>
  privateInstance
    .post("/customer/transaction/buy", data)
    .then((res) => res.data);
