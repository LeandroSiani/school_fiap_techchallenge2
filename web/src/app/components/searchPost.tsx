export default function SearchPost() {
  return (
    <div className="w-full max-w-5xl m-auto mt-[72px] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[#C4D4E3] text-lg font-nunito">Publicações</p>
        <p className="text-[#7B96B2] text-sm font-nunito">6 publicações</p>
      </div>

      <input
        type="text"
        placeholder="Buscar conteúdo"
        className="w-full rounded-md py-3 px-4 border-[1px] border-[#1C2F41] bg-[#040F1A] font-nunito text-[#AFC2D4] focus:outline-none focus:[#3294F8] focus:ring-1 focus:[#3294F8]"
      />
    </div>
  );
}
