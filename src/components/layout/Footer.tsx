"use client";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer id="footer" className="relative w-full">
      <div className="relative h-6 bg-black w-full flex justify-center items-center z-40">

        <div className="absolute w-24 h-24 bg-black rounded-full flex justify-center items-center">

          <div className="w-16 h-16 bg-white rounded-full border-[6px] border-black flex justify-center items-center">

            <div className="w-8 h-8 bg-white rounded-full border-7 border-black shadow-inner"></div>
          </div>
        </div>
      </div>

      <div className="bg-white text-gray-800 pt-16 pb-12 text-center border-t-[3px] border-black">
        <div className="max-w-7xl mx-auto">
          <p className="font-nunito text-xl tracking-tight">
            © Copyright Genesis 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}