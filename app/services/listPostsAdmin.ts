import api from "@/config/axiosConfig";
import { NEXT_PUBLIC_ADMIN_USERNAME, NEXT_PUBLIC_ADMIN_PASSWORD } from "@env";

export const listPostsAdmin = async (): Promise<any[]> => {
  const credentials = btoa(
    `${NEXT_PUBLIC_ADMIN_USERNAME}:${NEXT_PUBLIC_ADMIN_PASSWORD}`
  );

  try {
    const response = await api.get("/posts/admin", {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar posts administrativos:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao buscar posts administrativos.");
  }
};
