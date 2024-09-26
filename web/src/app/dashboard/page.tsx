"use client";

import { Suspense, useEffect, useState } from "react";
import { Eye, FileText, Pencil, Plus,  X } from "@phosphor-icons/react/dist/ssr";
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
import DeleteDialog from "../components/DeleteDialog";
import { toast } from "react-toastify";
import PublishDialog from "../components/publishDialog";

export default function dashboard() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch("http://localhost:3000/posts/admin", {
        cache: "no-cache",
        headers: { Authorization: "Basic " + credentials },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      toast.error("Erro ao buscar posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rows = posts?.map((post: IPost) => {
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
    { headerName: "Titulo", field: "title", minWidth: 150, flex: 1 },
    { headerName: "Conteúdo post", field: "content", minWidth: 150, flex: 1 },
    {
      headerName: "Data post criado",
      field: "date",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (params.value != null ? dayjs(params.value).format("DD/MM/YY HH:mm") : "--"),
    },
    {
      headerName: "Data publicação",
      field: "publishDate",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        const date = params.value;
        
        if (date && dayjs(date).isValid() && date !== '1970-01-01T00:00:00.000Z') {
          return dayjs(date).format("DD/MM/YY HH:mm");
        } else {
          return "--";  
        }
      }
    },
    {
      headerName: "Já foi publicado?",
      field: "isPublished",
      minWidth: 90,
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <div className="flex items-center h-full">
            <FileText size={18} color="#10b981" />
          </div>
        ) : (
          <div className="flex items-center h-full">
            <PublishDialog postId={params.row.id} onPublish={fetchPosts} />
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
          <DeleteDialog postId={params.value} onDelete={fetchPosts}/>
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

      <div className="w-full max-w-5xl m-auto mt-4 flex justify-end px-10">
        <Link href="dashboard/createPost" className="flex items-center gap-2 ">
          <Plus size={12} color="#3294F8" />
          <p className="text-[#3294F8] text-xs font-nunito font-bold">NOVO POST</p>
        </Link>
      </div>

      <div className="w-full max-w-5xl m-auto pt-8 px-10">
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
