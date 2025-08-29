import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;

export function getToken(): string | null {
  return localStorage.getItem('token');
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getToken();

  if (config.headers) {
    config.headers.Accept = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}

export const api = axios.create({
  baseURL: baseURL,
});
api.interceptors.request.use(authRequestInterceptor);
