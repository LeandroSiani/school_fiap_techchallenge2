import Header from "@/app/components/header";
import HeaderTitlePostBlog from "@/app/components/HeaderTitlePostBlog";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await fetch(`http://localhost:3000/posts/${params.slug}`, { cache: "no-cache" });
  const post = await data.json();

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
