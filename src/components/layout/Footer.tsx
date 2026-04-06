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

      <div className="bg-white dark:bg-[#0A0018] text-gray-800 dark:text-white/50 pt-16 pb-12 text-center border-t-[3px] border-black dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
          <p className="font-nunito font-black text-base tracking-tight text-[#3A001D] dark:text-white/70">
            Catalysis V4.0
          </p>
          <p className="font-nunito text-sm text-gray-500 dark:text-white/40">
            Organised by <span className="font-bold text-[#DD273E]">Club Genesis</span> · Department of Information Science &amp; Engineering · DSCE Bangalore
          </p>
          <p className="font-nunito text-xs text-gray-400 dark:text-white/25 mt-1">
            © 2026 Club Genesis, ISE Dept, DSCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}