import type { LoginResponse } from "@/services/auth/auth.type";
import { clsx, type ClassValue } from "clsx";
import secureLocalStorage from "react-secure-storage";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get manual atribute response pick
// export type Session = Pick<
//   LoginResponse,
//   "name" | "email" | "role" | "photoUrl"
// >;

export const SESSION_KEY = import.meta.env.VITE_SESSION_KEY_GENERATE_SECRET;

export function getSession() {
  // const storedAuth = secureLocalStorage.getItem(SESSION_KEY);
  // const userAuth =
  //   typeof storedAuth === "object" && storedAuth !== null
  //     ? (storedAuth as Partial<LoginResponse>)
  //     : null;
  // return {
  //   name: userAuth?.name,
  //   email: userAuth?.email,
  //   role: userAuth?.role,
  //   photoUrl: userAuth?.photoUrl,
  // };

  const storedAuth = secureLocalStorage.getItem(SESSION_KEY) as LoginResponse;

  if (!storedAuth) {
    return null;
  }

  // return {
  //   email: storedAuth?.email,
  //   name: storedAuth?.name,
  //   role: storedAuth?.role,
  //   photoUrl: storedAuth?.photoUrl,
  // };

  return storedAuth;
}

export function rupiahFormat(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
