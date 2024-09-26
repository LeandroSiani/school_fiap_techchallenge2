"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { deletePostAdmin } from "../actions/deletePostAdmin";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DeleteDialog({ postId, onDelete }: { postId: number; onDelete?: () => void }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const response = await deletePostAdmin(postId);
      
    if (response.ok) {
      setIsOpen(false);
      toast.success("Post deletado com sucesso.");
      onDelete && onDelete();

      router.push("/dashboard");
    } else {
      toast.error("Falha ao deletar o post.");
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Trash size={18} color="#ef4444" />
      </DialogTrigger>
      <DialogContent className="bg-[#0B1B2B] w-72 border-transparent">
        <DialogHeader>
          <DialogTitle className="text-[#AFC2D4] text-xl font-nunito">Você tem certeza que deseja deletar?</DialogTitle>
          <DialogDescription className="pt-10 flex justify-between">
            <DialogClose asChild>
              <button type="button" className="text-[#7B96B2] text-sm font-nunito" disabled={isLoading}>
                Cancelar
              </button>
            </DialogClose>

            <button className="text-[#7B96B2] text-sm font-nunito" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deletando..." : "Deletar"}
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
