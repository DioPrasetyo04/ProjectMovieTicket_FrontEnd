import type { Genre } from "../genre/genre.type";
import type { Theater } from "../theater/theater.type";

export interface Movie {
  _id: string;
  title: string;
  slug: string;
  genre: Pick<Genre, "_id", "name">;
  theaters: Pick<Theater, "_id", "name">[];
  description: string;
  thumbnail: string;
  video_trailer: string;
  price: number;
  available: boolean;
  bonus: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}
