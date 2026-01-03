import type { Movie } from "../movie/movies";
import type { Theater } from "../theater/theater.type";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  photoUrl: string;
}

export interface Transaction {
  _id: string;
  subtotal: number;
  total: number;
  bookingFee: number;
  tax: number;
  user_id: Pick<User, "name">;
  movie_id: Pick<Movie, "title">;
  theater_id: Pick<Theater, "name">;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  user: Pick<User, "name">;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  _id: string;
  wallet: Wallet;
  price: number;
  createdAt: string;
  updatedAt: string;
}
