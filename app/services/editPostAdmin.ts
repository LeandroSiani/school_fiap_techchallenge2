import api from "@/config/axiosConfig";
import { NEXT_PUBLIC_ADMIN_USERNAME, NEXT_PUBLIC_ADMIN_PASSWORD } from "@env";

export async function editPostAdmin(
  newForm: { title: string; content: string },
  slug: number
) {
  const username = NEXT_PUBLIC_ADMIN_USERNAME;
  const password = NEXT_PUBLIC_ADMIN_PASSWORD;

  const credentials = btoa(`${username}:${password}`);

  const rawFormData = {
    title: newForm.title,
    content: newForm.content,
    date: new Date(),
    isPublished: false,
  };

  try {
    const response = await api.put(`/posts/${slug}`, rawFormData, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Post atualizado com sucesso:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao atualizar post:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao atualizar post.");
  }
}
