import api from "@/config/axiosConfig";
import { NEXT_PUBLIC_ADMIN_USERNAME, NEXT_PUBLIC_ADMIN_PASSWORD } from "@env";

export async function createPost(formData: {
  title: string;
  content: string;
}): Promise<void> {
  const credentials = btoa(
    `${NEXT_PUBLIC_ADMIN_USERNAME}:${NEXT_PUBLIC_ADMIN_PASSWORD}`
  );

  try {
    const response = await api.post(
      "/posts",
      { title: formData.title, content: formData.content },
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      console.log("Post criado com sucesso!");
    }
  } catch (error: any) {
    console.error("Erro ao criar post:", error.response?.data || error.message);
    throw new Error("Erro ao criar post.");
  }
}
