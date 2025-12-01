import axios from "axios";
import { getSession } from "./utils";

const urlBackend = import.meta.env.VITE_CONFIG_BACKEND_URL ?? "";

export const configBackend = axios.create({
  baseURL: urlBackend,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const privateInstance = axios.create({
  baseURL: urlBackend,
});

// interceptors itu untuk menambahkan authorization token secara otomatis pada setiap request
privateInstance.interceptors.request.use((config) => {
  // get session by local storage
  const session = getSession();

  config.headers.Authorization = `${session?.token}`;

  return config;
});
