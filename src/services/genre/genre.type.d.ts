import type { Movie } from "../movie/movies";

export interface Genre {
  _id: string;
  name: string;
  slug: string;
  movies: Pick<Movie, "_id", "title", "slug">[];
  createdAt: string;
  updatedAt: string;
}
