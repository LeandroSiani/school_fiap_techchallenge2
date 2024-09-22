"use client";

import { Eye, FileText, Pencil, Plus, Trash, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../components/header";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IPost } from "../@types/post.interface";
import dayjs from "dayjs";
import { Suspense, useState } from "react";
import { deletePostAdmin } from "../actions/deletePostAdmin";
import DeleteDialog from "../components/DeleteDialog";

export default async function dashboard() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const username = "admin";
  const password = "supersecret";

  const credentials = btoa(`${username}:${password}`);

  const data = await fetch("http://localhost:3000/posts/admin", {
    cache: "no-cache",
    headers: { Authorization: "Basic " + credentials },
  });
  const posts = await data.json();

  const rows = posts.map((post: IPost) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date,
      publishDate: post.publishDate,
      isPublished: post.isPublished,
      buttonDelete: post.id,
      buttonEdit: `/dashboard/editPost/${post.id}`,
      buttonSee: `/dashboard/seePost/${post.id}`,
    };
  });

  const columns: GridColDef[] = [
    { headerName: "Titulo", field: "title", width: 150, flex: 1 },
    { headerName: "Conteúdo post", field: "content", width: 150, flex: 1 },
    {
      headerName: "Data post criado",
      field: "date",
      width: 150,
      flex: 1,
      renderCell: (params) => (params.value != null ? dayjs(params.value).format("DD/MM/YY HH:mm") : "--"),
    },
    {
      headerName: "Data publicação",
      field: "publishDate",
      width: 150,
      flex: 1,
      renderCell: (params) => (params.value != null ? dayjs(params.value).format("DD/MM/YY HH:mm") : "--"),
    },
    {
      headerName: "Já foi publicado?",
      field: "isPublished",
      width: 60,
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <div className="flex items-center h-full">
            <FileText size={18} color="#10b981" />
          </div>
        ) : (
          <div className="flex items-center h-full">
            <Dialog>
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

                    <button className="text-[#7B96B2] text-sm font-nunito">Publicar</button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ),
    },
    {
      field: "buttonDelete",
      headerName: "",
      maxWidth: 60,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full">
          <DeleteDialog postId={params.value} />
        </div>
      ),
    },
    {
      field: "buttonEdit",
      headerName: "",
      maxWidth: 60,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full">
          {!params.row.isPublished ? (
            <Link href={params.value} className="text-yellow-500">
              <Pencil size={18} />
            </Link>
          ) : null}
        </div>
      ),
    },
    {
      field: "buttonSee",
      headerName: "",
      maxWidth: 60,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center justify-center h-full">
          <Link href={params.value} className="text-blue-500">
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header title="DASHBOARD BLOG" height={220} />

      <div className="w-full max-w-5xl m-auto mt-4 flex justify-end ">
        <Link href="dashboard/createPost" className="flex items-center gap-2 ">
          <Plus size={12} color="#3294F8" />
          <p className="text-[#3294F8] text-xs font-nunito font-bold">NOVO POST</p>
        </Link>
      </div>

      <div className="w-full max-w-5xl m-auto pt-8">
        <DataGrid
          className="dark:bg-gray-800"
          sx={{
            color: "#fff",
            "& .MuiDataGrid-row--borderBottom": {
              backgroundColor: "#1C2F41 !important",
              color: "#C4D4E3",
            },
            "& .MuiTablePagination-toolbar p": {
              color: "#fff",
            },
            "& .MuiDataGrid-selectedRowCount": {
              display: "none",
            },
            "& .MuiTablePagination-root ": {
              marginLeft: "auto",
            },
          }}
          rows={rows}
          columns={columns}
        />
      </div>
    </Suspense>
  );
}
