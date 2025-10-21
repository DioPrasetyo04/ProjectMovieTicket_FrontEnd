import axios from "axios";

const urlBackend = import.meta.env.VITE_CONFIG_BACKEND_URL ?? "";

export const configBackend = axios.create({
  baseURL: urlBackend,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
