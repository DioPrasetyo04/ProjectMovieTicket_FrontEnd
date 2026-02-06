import { z } from "zod";
import type { Genre } from "../genre/genre.type";
import type { Seat, Theater } from "../theater/theater.type";
import type { filterSchema } from "./schema";

export interface MovieCustomer {
  _id: string;
  title: string;
  slug: string;
  genre: Pick<Genre, "_id", "name">;
  theaters: Pick<
    Theater,
    "_id",
    "name",
    "slug",
    "city",
    "layout",
    "address",
    "total_seats"
  >[];
  description: string;
  thumbnail?: string;
  video_trailer?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  price: number;
  available: boolean;
  bonus: string;
}

export interface GenreCustomer {
  _id: string;
  name: string;
  slug: string;
}

export interface MovieFiltered {
  filteredMovies: MovieCustomer[];
  allDataMovies: MovieCustomer[];
}

export type FilterValues = z.infer<typeof filterSchema>;

export interface DataMovieDetail {
  movie: MovieDetail;
}

export interface MovieDetail extends MovieCustomer {
  times: string[];
}

export interface SelectedSeat {
  seat_number: string;
  _id: string;
}

export interface Balance {
  balance: number;
}

export type TransactionValues = z.infer<typeof transactionSchema>;
