import Header from "@/app/components/header";
import HeaderTitlePostBlog from "@/app/components/HeaderTitlePostBlog";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("🚀 ~ Page ~", params.slug);

  const data = await fetch(`http://localhost:3000/posts/${params.slug}`, { cache: "no-cache" });
  const post = await data.json();
  console.log("🚀 ~ Page ~ slug:", post);

  return (
    <>
      <Header />

      <HeaderTitlePostBlog {...post} />

      <main className="w-full max-w-5xl m-auto py-10 px-8">
        <p className="text-[#AFC2D4] text-base font-nunito">{post.content}</p>
      </main>
    </>
  );
}
