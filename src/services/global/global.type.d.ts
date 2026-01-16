import type { Genre } from "../genre/genre.type";
import type { Theater } from "../theater/theater.type";

export interface MovieCustomer {
  _id: string;
  title: string;
  slug: string;
  genre: Pick<Genre, "_id", "name">;
  theaters: Pick<Theater, "_id", "name">[];
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

export interface TheaterCustomer {
  _id: string;
  name: string;
  slug: string;
  city: string;
}
