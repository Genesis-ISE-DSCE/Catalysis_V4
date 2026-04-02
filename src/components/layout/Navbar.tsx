"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Contact", id: "faq" },
  { label: "Support", id: "footer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      // Show if we scrolled up, or if we are at the top
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Hide if we scroll down and are not at the top
        // But only fade if the menu is closed
        setIsOpen((prev) => {
           if (!prev) setIsVisible(false);
           return prev;
        });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleScroll = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      setIsOpen(false);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        <div className="cursor-pointer" onClick={() => handleScroll("hero")}>
          <Image src="/catalysis.png" alt="Catalysis" width={110} height={45} />
        </div>

        <div className="hidden md:flex gap-8 font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="hover:text-red-500 transition"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="hidden md:block cursor-pointer"
          onClick={() => router.push("/register")}
        >
          <Image src="/nav-register-now.png" alt="Register" width={110} height={50} />
        </div>

        <div
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer z-[60]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-6 h-[2px] bg-black mb-1 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black mb-1 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-[#FFEEF0]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >

        <div className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="
                font-gliker
                text-[24px]
                tracking-[-0.01em]
                text-[#3A001D]
                hover:scale-110
                transition
              "
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => { router.push("/register"); setIsOpen(false); }}
          className="
            mt-4
            bg-[#E63946]
            text-white
            px-6 py-3
            rounded-full
            border-2 border-black
            shadow-[3px_3px_0px_black]
            font-semibold
            hover:scale-105
            active:scale-95
            transition
          "
        >
          Register Now
        </button>
      </div>
    </nav>
  );
}