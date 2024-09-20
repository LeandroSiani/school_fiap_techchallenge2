import { ArrowSquareOut, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default function CardGithubDevs() {
  return (
    <div className="w-full max-w-5xl m-auto flex gap-8 bg-[#0B1B2B] py-8 px-10 rounded-[10px] mt-[-80px] shadow-custom relative">
      <Image
        src="https://avatars.githubusercontent.com/u/11528359?v=4"
        alt="Github"
        width={148}
        height={148}
        className="rounded-lg"
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h2 className="text-[#E7EDF4] text-2xl font-nunito font-bold">Leandro lombaldo da silva</h2>
          <Link href="https://github.com/leandrolombaldo" target="_blank" className="flex items-center gap-2">
            <p className="text-[#3294F8] text-xs font-nunito font-bold">GITHUB</p>
            <ArrowSquareOut size={12} color="#3294F8" />
          </Link>
        </div>
        <p className="text-[#AFC2D4] text-base font-nunito ">
          Desenvolvedor front end, estudando para se tornar um desenvolvedor full stack, gosta de desafios, e curte
          jogar um video game nas horas vagas.
        </p>

        <div className="mt-5">
          <Link
            href="https://www.linkedin.com/in/dev-leandro-lombaldo/"
            target="_blank"
            className="flex items-center gap-2"
          >
            <LinkedinLogo size={18} color="#3A536B" />
            <p className="text-[#7B96B2] text-base font-nunito ">in/dev-leandro-lombaldo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
