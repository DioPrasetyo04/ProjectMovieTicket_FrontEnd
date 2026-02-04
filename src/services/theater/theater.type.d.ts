import type { Movie } from "../movie/movies";

export interface Theater {
  layout: Layout;
  _id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  movies: Pick<Movie, "_id", "title", "slug">[];
  createdAt: string;
  updatedAt: string;
  total_seats: number;
}

export interface Layout {
  total_rows: number;
  seat_per_row: number;
  seats: Seat[];
}

export type SeatStatus = "available" | "unavailable" | "booked";

export interface Seat {
  seat_number: string;
  status: SeatStatus;
  _id: string;
}
