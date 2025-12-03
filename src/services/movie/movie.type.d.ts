import type { Genre } from "../genre/genre.type";

export interface Movie {
  _id: string;
  title: string;
  slug: string;
  genres: Genre;
  createdAt: string;
  updatedAt: string;
}
