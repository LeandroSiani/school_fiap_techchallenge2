// components/DeleteDialog.jsx
"use client";

import React, { useState } from "react";
import {  X } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { publishPostAdmin } from "../actions/publishPostAdmin";

export default function PublishDialog({ postId, onPublish }: { postId: number; onPublish: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(postId);
  

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const response = await publishPostAdmin(postId);
      if (response.ok) {
        setIsOpen(false);
        toast.success("Post publicado com sucesso.");
        onPublish(); 
      } else {
        toast.error("Falha ao publicar o post.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao publicar o post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
       <DialogTrigger>
        <X size={18} color="#ef4444" />
      </DialogTrigger>
      <DialogContent className="bg-[#0B1B2B] w-72 border-transparent">
        <DialogHeader>
          <DialogTitle className="text-[#AFC2D4] text-xl font-nunito">
            Você tem certeza que deseja publicar o post?
          </DialogTitle>
          <DialogDescription className="pt-10 flex justify-between ">
            <DialogClose asChild>
              <button type="button" className="text-[#7B96B2] text-sm font-nunito">
                Cancelar
              </button>
            </DialogClose>

            <button className="text-[#7B96B2] text-sm font-nunito" onClick={handlePublish} disabled={isLoading}>Publicar</button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
</Dialog>
  );
}
