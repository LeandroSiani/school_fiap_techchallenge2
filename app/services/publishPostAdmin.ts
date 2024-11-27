import api from "@/config/axiosConfig";
import { NEXT_PUBLIC_ADMIN_USERNAME, NEXT_PUBLIC_ADMIN_PASSWORD } from "@env";

export async function publishPostAdmin(id: number): Promise<void> {
  const username = NEXT_PUBLIC_ADMIN_USERNAME;
  const password = NEXT_PUBLIC_ADMIN_PASSWORD;

  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await api.put(`/posts/publish/${id}`, null, {
      headers: {
        Authorization: "Basic " + credentials,
      },
    });

    console.log("Post publicado com sucesso:", response.data);
  } catch (error: any) {
    console.error(
      "Erro ao publicar o post:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao publicar o post.");
  }
}
