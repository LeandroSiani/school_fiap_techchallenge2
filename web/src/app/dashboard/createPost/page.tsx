import { createPost } from "@/app/actions/createPost";
import Header from "@/app/components/header";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NewPost() {  
  return (
    <div>
      <Header title="Novo Post" height={200} />

      <div className="w-full max-w-3xl m-auto mt-4 ">
        <Link href="/dashboard" className="flex items-center gap-2 ">
          <CaretLeft size={12} color="#3294F8" />
          <p className="text-[#3294F8] text-xs font-nunito font-bold">VOLTAR</p>
        </Link>
      </div>

      <main className="w-full">
        <div className="w-full max-w-3xl m-auto mt-8 ">
          <div className="w-full">
            <h1 className="text-2xl font-coda text-[#E7EDF4]">Criar novo post</h1>
            <form className="mt-4" action={createPost}>
              <label htmlFor="title" className="block text-sm font-medium text-[#7B96B2]">
                Título
              </label>
              <input
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                placeholder="Título do post"
                className="mt-2 text-[#AFC2D4] bg-[#040F1A]  block w-full shadow-sm sm:text-sm border-[1px] border-[#1C2F41] rounded-md p-2 focus:outline-none focus:[#3294F8] focus:ring-1 focus:[#3294F8]"
              />
              <label htmlFor="content" className="block text-sm font-medium text-[#7B96B2] mt-4">
                Conteúdo
              </label>
              <textarea
                id="content"
                name="content"
                rows={5}
                placeholder="Escreva o conteúdo aqui"
                className="mt-2 text-[#AFC2D4] bg-[#040F1A] block w-full shadow-sm sm:text-sm  border-[1px] border-[#1C2F41]  rounded-md p-2 focus:outline-none focus:[#3294F8] focus:ring-1 focus:[#3294F8]"
                defaultValue={""}
              />

              <div className="w-full flex justify-center mt-8">
                <button
                  type="submit"
                  className="mt-4 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3294F8] hover:bg-[#1E6A9E] "
                >
                  Criar post
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
