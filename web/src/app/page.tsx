"use client";

import Header from "./components/header";
import CardGithubDevs from "./components/cardGithubDevs";
import SearchPost from "./components/searchPost";
import Post from "./components/Post";
import { IPost } from "./@types/post.interface";
import { useState, useEffect } from "react";

export default function Home({ initialPosts }: { initialPosts: IPost[] }) {
  const [searchPost, setSearchPost] = useState<string>("");
  console.log("🚀 ~ Home ~ searchPost:", searchPost)
  const [posts, setPosts] = useState<IPost[]>(initialPosts);

  // Faz a busca no endpoint sempre que searchPost muda
  useEffect(() => {
    const fetchPosts = async () => {
      let response;
    
      // Se a busca tiver menos de 3 caracteres, traz todos os posts
      if (searchPost.length < 3) {
        response = await fetch(`http://localhost:3000/posts`, { cache: "no-cache" });
      } else {
        // Se tiver 3 ou mais caracteres, faz a busca filtrada
        response = await fetch(`http://localhost:3000/posts/query/${searchPost}`, { cache: "no-cache" });
      }
    
      const filteredPosts = await response.json();
      setPosts(filteredPosts);
    };

    fetchPosts();
  }, [searchPost, initialPosts]); // Reexecuta sempre que searchPost mudar

  return (
    <div className="">
      <Header />

      <main className="w-full ">
        <CardGithubDevs />

        <SearchPost qtyPost={posts?.length} setSearchPost={setSearchPost} />

        <div className="w-full max-w-5xl m-auto mt-12 grid grid-cols-2 gap-8 pb-12 items-stretch">
          {posts?.map((post: IPost) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
}
