import BASE from "@/config";
import axios from "axios";
import { toast } from "react-toastify";

let isRedirecting = false; 
export const api = axios.create({
  baseURL: BASE.PRODUCT_BASE,
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !isRedirecting &&
      !window.location.pathname.includes("/login")
    ) {
      isRedirecting = true;

      toast.error("Session expired. Please login again.");

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");


      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }

    return Promise.reject(error);
  }
);