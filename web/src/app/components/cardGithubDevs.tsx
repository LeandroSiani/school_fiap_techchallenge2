import { ArrowSquareOut, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const arrayDados = [
  {
    nome: "Leandro lombaldo da silva",
    descricao: "Desenvolvedor front end, estudando para se tornar um desenvolvedor full stack, gosta de desafios, e curte jogar um video game nas horas vagas.",
    image: "https://avatars.githubusercontent.com/u/11528359?v=4",
    github: "https://github.com/leandrolombaldo",
    linkedin: "https://www.linkedin.com/in/dev-leandro-lombaldo/",
    inLinkedIn: "in/dev-leandro-lombaldo"
  },
  {
    nome: "Leandro lombaldo da silva2",
    descricao: "Desenvolvedor front end, estudando para se tornar um desenvolvedor full stack, gosta de desafios, e curte jogar um video game nas horas vagas.",
    image: "https://avatars.githubusercontent.com/u/11528359?v=4",
    github: "https://github.com/leandrolombaldo",
    linkedin: "https://www.linkedin.com/in/dev-leandro-lombaldo/",
    inLinkedIn: "in/dev-leandro-lombaldo"
  },
  {
    nome: "Leandro lombaldo da silva3",
    descricao: "Desenvolvedor front end, estudando para se tornar um desenvolvedor full stack, gosta de desafios, e curte jogar um video game nas horas vagas.",
    image: "https://avatars.githubusercontent.com/u/11528359?v=4",
    github: "https://github.com/leandrolombaldo",
    linkedin: "https://www.linkedin.com/in/dev-leandro-lombaldo/",
    inLinkedIn: "in/dev-leandro-lombaldo"
  },
];

export default function UserProfile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false); // Oculta o item atual
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % arrayDados.length);
        setIsVisible(true); // Mostra o próximo item
      }, 300); // Tempo para ocultar (mesmo tempo da transição)
    }, 10000); // 10000ms = 10s

    return () => clearInterval(intervalId);
  }, []);

  const currentData = arrayDados[currentIndex];

  return (
    <div className="w-full max-w-5xl m-auto flex gap-8 bg-[#0B1B2B] py-8 px-10 rounded-[10px] mt-[-80px] shadow-custom relative transition-opacity duration-300 ease-in-out opacity-100 flex-col md:flex-row">
      <div className="flex justify-between items-start">
        <Image
          src={currentData.image}
          alt="Profile Image"
          width={148}
          height={148}
          className={`rounded-lg transition-transform duration-300 ease-in-out transform ${isVisible ? 'scale-100' : 'scale-90 opacity-0'}`}
          />

          <Link href={currentData.github} target="_blank" className="flex md:hidden items-center gap-2">
            <p className="text-[#3294F8] text-xs font-nunito font-bold">GITHUB</p>
            <ArrowSquareOut size={12} color="#3294F8" />
          </Link>
        </div>

      <div className={`flex flex-col gap-2 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-start justify-between">
          <h2 className="text-[#E7EDF4] text-2xl font-nunito font-bold">{currentData.nome}</h2>
          <Link href={currentData.github} target="_blank" className="hidden md:flex items-center gap-2">
            <p className="text-[#3294F8] text-xs font-nunito font-bold">GITHUB</p>
            <ArrowSquareOut size={12} color="#3294F8" />
          </Link>
        </div>
        <p className="text-[#AFC2D4] text-base font-nunito">
          {currentData.descricao}
        </p>

        <div className="mt-5">
          <Link
            href={currentData.linkedin}
            target="_blank"
            className="flex items-center gap-2"
          >
            <LinkedinLogo size={18} color="#3A536B" />
            <p className="text-[#7B96B2] text-base font-nunito ">{currentData.inLinkedIn}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}