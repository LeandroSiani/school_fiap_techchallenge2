import api from "@/config/axiosConfig";
import { NEXT_PUBLIC_ADMIN_USERNAME, NEXT_PUBLIC_ADMIN_PASSWORD } from "@env";

export async function deletePostAdmin(id: string | number): Promise<void> {
  const credentials = btoa(
    `${NEXT_PUBLIC_ADMIN_USERNAME}:${NEXT_PUBLIC_ADMIN_PASSWORD}`
  );

  try {
    const response = await api.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Post deletado com sucesso:", response.data);
  } catch (error: any) {
    console.error(
      "Erro ao deletar o post:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao deletar o post.");
  }
}
