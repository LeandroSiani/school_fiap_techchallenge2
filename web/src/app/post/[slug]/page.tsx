import Header from "@/app/components/header";
import HeaderTitlePostBlog from "@/app/components/HeaderTitlePostBlog";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Header />

      <HeaderTitlePostBlog />

      <main className="w-full max-w-5xl m-auto py-10 px-8">
        <p className="text-[#AFC2D4] text-base font-nunito">
          Programming languages all have built-in data structures, but these often differ from one language to another.
          This article attempts to list the built-in data structures available in JavaScript and what properties they
          have. These can be used to build other data structures. Wherever possible, comparisons with other languages
          are drawn. Dynamic typing JavaScript is a loosely typed and dynamic language. Variables in JavaScript are not
          directly associated with any particular value type, and any variable can be assigned (and re-assigned) values
          of all types:
        </p>
      </main>
    </>
  );
}
