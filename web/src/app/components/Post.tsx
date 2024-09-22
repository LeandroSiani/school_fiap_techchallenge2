import Link from "next/link";
import { IPost } from "../@types/post.interface";
import { formatDateCustom } from "@/hook/formatedDate";

export default function Post(post: IPost) {
  return (
    <Link href={`/post/${post.id}`} className="h-full flex">
      <div className="w-full bg-[#112131] rounded-[10px] p-8 flex flex-col gap-5 cursor-pointer justify-between">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[#E7EDF4] text-xl font-nunito font-bold">{post.title}</h2>
          <p className="text-[#7B96B2] text-sm font-nunito whitespace-nowrap">{formatDateCustom(post.publishDate)}</p>
        </div>

        <p className="text-[#AFC2D4] text-base font-nunito">
          {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
        </p>
      </div>
    </Link>
  );
}
