import type { Movie } from "../movie/movies";
import type { Theater } from "../theater/theater.type";

type MovieOrders = Pick<
  Movie,
  "title" | "genre" | "thumbnail" | "thumbnailUrl"
>;

type TheaterOrders = Pick<Theater, "name" | "city">;

type SeatOrders = Pick<Seat, "seat_number">;

export interface Orders {
  _id: string;
  movie_id: MovieOrders;
  theater_id: TheaterOrders;
  date: string;
  seats: SeatOrders[];
}
