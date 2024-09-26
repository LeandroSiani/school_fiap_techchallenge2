// src/app/dashboard/editPost/[slug]/page.tsx
import { seePostAdmin } from "@/app/actions/seePostAdmin";
import EditPostForm from "@/app/components/EditPostForm";
import Header from "@/app/components/header";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Suspense } from "react";

interface SeePostAdminProps {
  params: {
    slug: string;
  };
}

export default async function EditPostPage({ params }: SeePostAdminProps) {
  const post = await seePostAdmin({ params });

  return (
    <div>
      <Header title="Editar Post" height={200} />

      <div className="w-full max-w-3xl m-auto mt-4 px-10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <CaretLeft size={12} color="#3294F8" />
          <p className="text-[#3294F8] text-xs font-nunito font-bold">VOLTAR</p>
        </Link>
      </div>

      <main className="w-full px-10">
        <div className="w-full max-w-3xl m-auto mt-8">
          <div className="w-full">
            <h1 className="text-2xl font-coda text-[#E7EDF4]">Editar post</h1>
            <Suspense fallback={<div>Loading...</div>}>
              <EditPostForm initialPost={post} slug={params.slug} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
