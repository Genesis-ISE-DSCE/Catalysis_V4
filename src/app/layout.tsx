import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import PokeCursor from "@/components/ui/Pokecursor";
import AudioPlayer from "@/components/ui/AudioPlayer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Catalysis V4.0 — Club Genesis, ISE Dept, DSCE",
  description: "Catalysis V4.0 is a 2-day interdepartmental technical fest organised by Club Genesis, Department of Information Science & Engineering, DSCE Bangalore.",
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
      <head>
        {/* Anti-flash: apply saved theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('catalysis-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <PokeCursor />
          <AudioPlayer />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}