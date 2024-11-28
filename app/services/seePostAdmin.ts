import api from "@/config/axiosConfig";
import { NEXT_PUBLIC_ADMIN_USERNAME, NEXT_PUBLIC_ADMIN_PASSWORD } from "@env";

interface seePostAdminProps {
  slug: number;
}

export async function seePostAdmin({ slug }: seePostAdminProps): Promise<any> {
  const username = NEXT_PUBLIC_ADMIN_USERNAME;
  const password = NEXT_PUBLIC_ADMIN_PASSWORD;

  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await api.get(`/posts/${slug}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao buscar post:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao buscar post.");
  }
}
