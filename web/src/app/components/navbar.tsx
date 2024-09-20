// "use strict";
"use client";

import { SignOut, Student } from "@phosphor-icons/react/dist/ssr";
import { useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signup } from "../actions/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const params = usePathname();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const result = await signup(formData);

    if (result?.errors) {
      // Handle errors
      console.log(result.errors);
    } else if (result?.success) {
      // Save the token to localStorage
      localStorage.setItem("authToken", result.token);
      // Redirect or show success message
      console.log("Form submitted successfully");
      router.push("/dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLogged(true);
    }
  }, []);

  return (
    <nav className="flex justify-end px-10 py-4 absolute top-0 right-0">
      {params?.includes("/dashboard") ? (
        <button onClick={handleLogout} className="flex items-center gap-3">
          <SignOut size={32} color="#E7EDF4" />
        </button>
      ) : isLogged ? (
        <button onClick={() => router.push("/dashboard")} className="flex items-center gap-3">
          <Student size={32} color="green" />
        </button>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Student size={32} color="#E7EDF4" />
          </DialogTrigger>
          <DialogContent className="bg-[#0B1B2B] w-72 border-transparent">
            <DialogHeader>
              <DialogTitle className="text-[#AFC2D4] text-2xl font-nunito">Login</DialogTitle>
              <DialogDescription className="pt-10 ">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-[1px]">
                    <label htmlFor="name" className="text-[#AFC2D4] text-base font-nunito">
                      Usuário
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Name"
                      className="mt-2 text-[#AFC2D4] bg-[#040F1A] block w-full shadow-sm sm:text-sm border-[1px] border-[#1C2F41] rounded-md p-2 focus:outline-none focus:border-[#3294F8] focus:ring-1 focus:ring-[#3294F8]"
                      autoComplete="off"
                    />
                  </div>
                  <div className="flex flex-col gap-[1px] mt-4">
                    <label htmlFor="password" className="text-[#AFC2D4] text-base font-nunito">
                      Senha
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="mt-2 text-[#AFC2D4] bg-[#040F1A] block w-full shadow-sm sm:text-sm border-[1px] border-[#1C2F41] rounded-md p-2 focus:outline-none focus:border-[#3294F8] focus:ring-1 focus:ring-[#3294F8]"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="mt-8 flex justify-between">
                    <DialogClose asChild>
                      <button type="button" className="text-[#7B96B2] text-sm font-nunito">
                        Cancelar
                      </button>
                    </DialogClose>
                    <button type="submit" className="bg-[#3294F8] text-white py-2 px-4 rounded-md hover:bg-[#2673c1]">
                      Entrar
                    </button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </nav>
  );
}
