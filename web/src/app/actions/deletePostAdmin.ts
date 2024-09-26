import { redirect } from "next/navigation";

export async function deletePostAdmin(id: number) {
  "use client";

  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const credentials = btoa(`${username}:${password}`);

  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/json",
    },
  });

  return response;
}
