"use client";

import { CaretLeft, Student, CalendarDot, XCircle, Trash, Pencil } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";

interface HeaderTitlePostBlogProps {
  seePost?: boolean;
}

export default function HeaderTitlePostBlog({ seePost }: HeaderTitlePostBlogProps) {
  const params = usePathname();

  return (
    <div className="w-full max-w-5xl m-auto flex flex-col gap-5 bg-[#0B1B2B] py-8 px-10 rounded-[10px] mt-[-80px] shadow-custom relative">
      <div className="flex justify-between items-start">
        <Link href={params?.includes("/dashboard") ? "/dashboard" : "/"} className="flex items-center gap-2">
          <CaretLeft size={12} color="#3294F8" />
          <p className="text-[#3294F8] text-xs font-nunito font-bold">VOLTAR</p>
        </Link>

        {seePost && (
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger>
                <Trash size={18} color="#ef4444" />
              </DialogTrigger>
              <DialogContent className="bg-[#0B1B2B] w-72">
                <DialogHeader>
                  <DialogTitle className="text-[#AFC2D4] text-xl font-nunito">
                    Você tem certeza que deseja deletar?
                  </DialogTitle>
                  <DialogDescription className="pt-10 flex justify-between ">
                    <DialogClose asChild>
                      <button type="button" className="text-[#7B96B2] text-sm font-nunito">
                        Cancelar
                      </button>
                    </DialogClose>

                    <button className="text-[#7B96B2] text-sm font-nunito">Deletar</button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Link href="/dashboard/editPost/1" className="flex items-center gap-2 text-yellow-500">
              <Pencil size={18} />
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h2 className="text-[#E7EDF4] text-2xl font-nunito font-bold">JavaScript data types and data structures</h2>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Student size={18} color="#3A536B" />
            <p className="text-[#7B96B2] text-base font-nunito ">Professor</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDot size={18} color="#3A536B" />
            <p className="text-[#7B96B2] text-base font-nunito ">Há 1 dia</p>
          </div>
          {seePost && (
            <div className="flex items-center gap-2">
              <XCircle size={18} color="#6b3a3a" />
              <p className="text-[#7B96B2] text-base font-nunito ">Não publicado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}