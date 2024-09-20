import Image from "next/image";
import Header from "./components/header";
import CardGithubDevs from "./components/cardGithubDevs";
import SearchPost from "./components/searchPost";
import Post from "./components/Post";

export default function Home() {
  return (
    <div className="">
      <Header />

      <main className="w-full ">
        <CardGithubDevs />

        <SearchPost />

        <div className="w-full max-w-5xl m-auto mt-12 grid grid-cols-2 gap-8 pb-12">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </main>
    </div>
  );
}
