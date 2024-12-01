import axios, { AxiosInstance } from "axios";
import { IP_CONFIG_AXIOS_BASE_URL } from "@env";

const api: AxiosInstance = axios.create({
  baseURL: `${IP_CONFIG_AXIOS_BASE_URL}:3000`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na resposta:", error.message);
    return Promise.reject(error);
  }
);

export default api;
