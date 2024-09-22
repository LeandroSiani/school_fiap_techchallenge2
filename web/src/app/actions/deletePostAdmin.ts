import { toast } from "react-toastify";

export async function deletePostAdmin(id: number) {
  "use client";

  const username = "admin";
  const password = "supersecret";

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
