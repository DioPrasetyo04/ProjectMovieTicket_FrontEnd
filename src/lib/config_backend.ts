import axios from "axios";
import { getSession, logoutAndRedirect } from "./utils";

const urlBackend = import.meta.env.VITE_CONFIG_BACKEND_URL ?? "";

export const globalInstance = axios.create({
  baseURL: urlBackend,
  headers: {
    Accept: "application/json",
  },
});

export const privateInstance = axios.create({
  baseURL: urlBackend,
});

// interceptors itu untuk menambahkan authorization token secara otomatis pada setiap request
privateInstance.interceptors.request.use((config) => {
  // get session by local storage
  const session = getSession();

  if (session?.token) {
    config.headers.Authorization = `${session.token}`;
  }

  return config;
});

// 🔥 HANDLE TOKEN EXPIRED DARI DATABASE (401)
privateInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.log("Session expired from server");
      logoutAndRedirect();
    }

    return Promise.reject(error);
  },
);
