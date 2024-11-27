import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.120:3000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta:", error.message);
    return Promise.reject(error);
  }
);

export default api;
