interface seePostAdminProps {
  params: {
    slug: string;
  };
  formData?: FormData;
}

export async function seePostAdmin({ params }: seePostAdminProps) {
  "use server";

  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const credentials = btoa(`${username}:${password}`);

  const data = await fetch(`http://localhost:3000/posts/${params.slug}`, {
    cache: "no-cache",
    headers: { Authorization: "Basic " + credentials },
  });
  const posts = await data.json();

  return posts;
}
