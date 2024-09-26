import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  "use server";
  
  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const credentials = btoa(`${username}:${password}`);

  const rawFormData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (response.ok) {
    redirect("/dashboard");
  }
}
