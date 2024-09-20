import Header from "@/app/components/header";
import HeaderTitlePostBlog from "@/app/components/HeaderTitlePostBlog";

export default function SeePost() {
  return (
    <div>
      <Header title="" height={200} />

      <HeaderTitlePostBlog seePost />

      <main className="w-full max-w-5xl m-auto mt-8">
        <p className="text-[#AFC2D4] text-base font-nunito">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero recusandae quos error quia perferendis. Non
          dignissimos a mollitia blanditiis in nisi, temporibus beatae ad, accusantium labore esse, architecto quia
          consequatur?
        </p>
      </main>
    </div>
  );
}
