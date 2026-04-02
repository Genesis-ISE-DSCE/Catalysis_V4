import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import PokeCursor from "@/components/ui/Pokecursor";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Catalysis V4",
  description: "Spark innovation and accelerate ideas into reality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="flex flex-col min-h-screen">
        <PokeCursor />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}