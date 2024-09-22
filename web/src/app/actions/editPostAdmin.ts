export async function editPostAdmin(newForm: { title: string; content: string }, slug: string) {
  const username = "admin";
  const password = "supersecret";

  const credentials = btoa(`${username}:${password}`);

  const rawFormData = {
    title: newForm.title,
    content: newForm.content,
    date: new Date(),
    publishDate: null,
    isPublished: false,
  };

  const response = await fetch(`http://localhost:3000/posts/${slug}`, {
    method: "PUT",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  return response;
}