import { seePostAdmin } from "@/app/actions/seePostAdmin";
import Header from "@/app/components/header";
import HeaderTitlePostBlog from "@/app/components/HeaderTitlePostBlog";

export default async function SeePost({ params }: { params: { slug: string } }) {
  const posts = await seePostAdmin({ params });

  return (
    <div>
      <Header title="" height={200} />

      <HeaderTitlePostBlog
        seePost
        id={posts.id}
        title={posts.title}
        date={posts.date}
        publishDate={posts.publishDate}
        isPublished={posts.isPublished}
      />

      <main className="w-full max-w-5xl m-auto mt-8">
        <p className="text-[#AFC2D4] text-base font-nunito">{posts.content}</p>
      </main>
    </div>
  );
}
