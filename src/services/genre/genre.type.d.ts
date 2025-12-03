import type { Movie } from "../movie/movie.type";

export interface Genre {
  _id: string;
  name: string;
  slug: string;
  movies: Movie[];
  createdAt: string;
  updatedAt: string;
}
