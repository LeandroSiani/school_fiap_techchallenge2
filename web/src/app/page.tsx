"use client";

import Header from "./components/header";
import CardGithubDevs from "./components/cardGithubDevs";
import SearchPost from "./components/searchPost";
import Post from "./components/Post";
import { IPost } from "./@types/post.interface";
import { useState, useEffect } from "react";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

export default function Home({ initialPosts }: { initialPosts: IPost[] }) {
  const [searchPost, setSearchPost] = useState<string>("");
  const [posts, setPosts] = useState<IPost[]>(initialPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      let response;
    
      if (searchPost.length < 3) {
        response = await fetch(`http://localhost:3000/posts`, { cache: "no-cache" });
      } else {
        response = await fetch(`http://localhost:3000/posts/query/${searchPost}`, { cache: "no-cache" });
      }
    
      const filteredPosts = await response.json();
      setPosts(filteredPosts);
    };

    fetchPosts();
  }, [searchPost, initialPosts]); 

  return (
    <div className="">
      <Header />

      <main className="w-full px-10">
        <CardGithubDevs />

        <SearchPost qtyPost={posts?.length} setSearchPost={setSearchPost} />

        {posts?.length > 0 ? (
          <div className="w-full max-w-5xl m-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 items-stretch">
            {posts?.map((post: IPost) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 mt-[10%]">
            <div className="flex items-center gap-3">
            <WarningCircle size={32} color="#3A536B" />
            <p className="text-[#3A536B] text-3xl font-nunito ">OPS!</p>
            </div>
            <p className="text-[#3A536B] text-2xl font-nunito ">Sem posts no momento!</p>
          </div>
        )}
      </main>
    </div>
  );
}
