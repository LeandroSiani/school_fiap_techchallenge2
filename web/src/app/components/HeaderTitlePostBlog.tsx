"use client";

import { CaretLeft, Student, CalendarDot, XCircle, Pencil, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { formatDateCustom } from "@/hook/formatedDate";
import DeleteDialog from "./DeleteDialog";

interface HeaderTitlePostBlogProps {
  seePost?: boolean;
  id: number;
  title: string;
  date?: Date;
  publishDate: Date;
  isPublished?: boolean;
}

export default function HeaderTitlePostBlog({
  seePost,
  id,
  title,
  date,
  publishDate,
  isPublished,
}: HeaderTitlePostBlogProps) {
  const params = usePathname();
  const displayDate = publishDate || date || new Date();

  return (
    <div className="w-full max-w-5xl m-auto flex flex-col gap-5 bg-[#0B1B2B] py-8 px-10 rounded-[10px] mt-[-80px] shadow-custom relative">
      <div className="flex justify-between items-start">
        <Link href={params?.includes("/dashboard") ? "/dashboard" : "/"} className="flex items-center gap-2">
          <CaretLeft size={12} color="#3294F8" />
          <p className="text-[#3294F8] text-xs font-nunito font-bold">VOLTAR</p>
        </Link>

        {seePost && (
          <div className="flex items-center gap-3">
           <DeleteDialog postId={id} />
            <Link href="/dashboard/editPost/1" className="flex items-center gap-2 text-yellow-500">
              <Pencil size={18} />
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h2 className="text-[#E7EDF4] text-2xl font-nunito font-bold">{title}</h2>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Student size={18} color="#3A536B" />
            <p className="text-[#7B96B2] text-base font-nunito ">Professor</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDot size={18} color="#3A536B" />
            <p className="text-[#7B96B2] text-base font-nunito ">{formatDateCustom(displayDate)}</p>
          </div>
          {seePost && (
            <div className="flex items-center gap-2">
              {isPublished ? <CheckCircle size={18} color="#16a34a" /> : <XCircle size={18} color="#6b3a3a" />}
              <p className="text-[#7B96B2] text-base font-nunito ">{isPublished ? "Publicado" : "Não publicado"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
