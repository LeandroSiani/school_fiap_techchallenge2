import Image from "next/image";
import Navbar from "./navbar";
import EffectOne from "../assets/effect_one.svg";
import EffectTwo from "../assets/effect_two.svg";

interface HeaderProps {
  title?: string;
  height?: number;
}

export default function Header({ title = "GRUPO 17 BLOG", height = 300 }: HeaderProps) {
  return (
    <header className={`bg-[#0B1B2B] h-[${height}px] relative overflow-hidden`} style={{ height: `${height}px` }}>
      <Image src={EffectOne} alt="Effect One" />
      <Image src={EffectTwo} alt="Effect two" className="absolute right-0 top-0" />
      <div className="absolute top-[-80px] left-[-100px] w-[236px] h-[236px] bg-[#14589C] rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-0 right-0 w-[236px] h-[236px] bg-[#14589C] rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/2 w-[400px] h-[50px] bg-[#14589C] rounded-full opacity-80 blur-3xl rotate-45"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[50px] bg-[#14589C] rounded-full opacity-80 blur-3xl rotate-90"></div>
      <Navbar />

      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
        <h1 className="text-[#3294F8] text-2xl font-coda">{title}</h1>
      </div>
    </header>
  );
}
