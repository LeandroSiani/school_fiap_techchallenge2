export async function createPost(formData: FormData) {
  "use server";

  const username = "admin";
  const password = "supersecret";

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
}
