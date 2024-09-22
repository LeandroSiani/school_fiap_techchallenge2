interface seePostAdminProps {
  params: {
    slug: string;
  };
  formData?: FormData;
}

export async function seePostAdmin({ params }: seePostAdminProps) {
  console.log("🚀 ~ seePostAdmin ~ params:", params);
  ("use server");

  const username = "admin";
  const password = "supersecret";

  const credentials = btoa(`${username}:${password}`);

  const data = await fetch(`http://localhost:3000/posts/${params.slug}`, {
    cache: "no-cache",
    headers: { Authorization: "Basic " + credentials },
  });
  const posts = await data.json();

  return posts;
}
