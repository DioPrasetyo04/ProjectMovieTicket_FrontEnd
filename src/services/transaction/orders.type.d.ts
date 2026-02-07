import type { Movie } from "../movie/movies";
import type { Theater } from "../theater/theater.type";

type MovieOrders = Pick<
  Movie,
  "title" | "genre" | "thumbnail" | "thumbnailUrl" | "price" | "bonus"
>;

type TheaterOrders = Pick<Theater, "name" | "city" | "address">;

type SeatOrders = Pick<Seat, "seat_number">;

export interface Orders {
  _id: string;
  movie_id: MovieOrders;
  theater_id: TheaterOrders;
  date: string;
  seats: SeatOrders[];
  subtotal: number;
  total: number;
  bookingFee: number;
  tax: number;
}
