import Link from "next/link";

export default function Post() {
  return (
    <Link href="/post/1">
      <div className="w-full bg-[#112131] rounded-[10px] p-8 flex flex-col gap-5 cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[#E7EDF4] text-xl font-nunito font-bold">JavaScript data types and data structures</h2>
          <p className="text-[#7B96B2] text-sm font-nunito whitespace-nowrap">Há 1 dia</p>
        </div>

        <p className="text-[#AFC2D4] text-base font-nunito">
          Programming languages all have built-in data structures, but these often differ from one language to another.
          This article attempts to list the built-in data structures available in JavaScript and what properties they
          have. These can be used to build other data structures. Wherever possible, comparisons with other languages
          are drawn. Dynamic typing JavaScript is a loosely typed and dynamic language. Variables in JavaScript are not
          directly associated with any particular value type, and any variable can be assigned (and re-assigned) values
          of all types: let foo = 42; // foo is now a number foo = 'bar'; // foo is now a string foo = true; // foo is
          now a boolean
        </p>
      </div>
    </Link>
  );
}
