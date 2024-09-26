"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { editPostAdmin } from "../actions/editPostAdmin";
import { toast } from "react-toastify";

interface EditPostFormProps {
  initialPost: {
    title: string;
    content: string;
  };
  slug: string;
}

export default function EditPostForm({ initialPost, slug }: EditPostFormProps) {
  const [post, setPost] = useState({ title: initialPost.title, content: initialPost.content });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    let newForm = {
      title: (form[0] as HTMLInputElement).value,  
      content: (form[1] as HTMLTextAreaElement).value,
    };

    const response = await editPostAdmin(newForm, slug);

    if (response.ok) {
      toast.success("Post editado com sucesso!");
      router.push("/dashboard");
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <label htmlFor="title" className="block text-sm font-medium text-[#7B96B2]">
        Título
      </label>
      <input
        type="text"
        name="title"
        id="title"
        autoComplete="title"
        placeholder="Título do post"
        value={post.title}
        onChange={handleInputChange}
        className="mt-2 text-[#AFC2D4] bg-[#040F1A] block w-full shadow-sm sm:text-sm border-[1px] border-[#1C2F41] rounded-md p-2 focus:outline-none focus:[#3294F8] focus:ring-1 focus:[#3294F8]"
      />
      <label htmlFor="content" className="block text-sm font-medium text-[#7B96B2] mt-4">
        Conteúdo
      </label>
      <textarea
        id="content"
        name="content"
        rows={5}
        placeholder="Escreva o conteúdo aqui"
        value={post.content}
        onChange={handleInputChange}
        className="mt-2 text-[#AFC2D4] bg-[#040F1A] block w-full shadow-sm sm:text-sm border-[1px] border-[#1C2F41] rounded-md p-2 focus:outline-none focus:[#3294F8] focus:ring-1 focus:[#3294F8]"
      />

      <div className="w-full flex justify-center mt-8">
        <button
          type="submit"
          className="mt-4 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3294F8] hover:bg-[#1E6A9E]"
        >
          Atualizar post
        </button>
      </div>
    </form>
  );
}
