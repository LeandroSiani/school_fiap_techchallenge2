import api from "@/config/axiosConfig";

// Busca todos os posts
export const getAllPosts = async () => {
  const response = await api.get("/posts");
  return response.data; // Retorna os dados diretamente
};

// Busca posts filtrados por termo de busca
export const getPostsByQuery = async (query: string) => {
  const response = await api.get(`/posts/query/${query}`);
  return response.data;
};
