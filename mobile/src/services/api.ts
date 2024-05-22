import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/",
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message));
  }
  return Promise.reject(
    new AppError("Erro no servidor, tente novamente mais tarde")
  );
});

export { api }