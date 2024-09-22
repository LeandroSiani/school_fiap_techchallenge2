import type { Metadata } from "next";
import { Nunito, Coda } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const nunito = Nunito({
  variable: "--nunito",
  subsets: ["latin"],
});

const coda = Coda({
  variable: "--coda",
  weight: ["400", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRUPO 17 BLOG",
  description: "Blog do grupo 17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${nunito.variable} ${coda.variable} antialiased`}>
        <ToastContainer />

        {children}
      </body>
    </html>
  );
}
