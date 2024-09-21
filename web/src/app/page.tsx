import Header from "./components/header";
import CardGithubDevs from "./components/cardGithubDevs";
import SearchPost from "./components/searchPost";
import Post from "./components/Post";
import { IPost } from "./@types/post.interface";

export default async function Home() {
  const data = await fetch("http://localhost:3000/posts", { cache: "no-cache" });
  const posts = await data.json();

  return (
    <div className="">
      <Header />

      <main className="w-full ">
        <CardGithubDevs />

        <SearchPost qtyPost={posts?.length} />

        <div className="w-full max-w-5xl m-auto mt-12 grid grid-cols-2 gap-8 pb-12">
          {posts?.map((post: IPost) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
}
