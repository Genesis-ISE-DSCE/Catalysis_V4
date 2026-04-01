"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Contact", id: "faq" },
  { label: "Support", id: "footer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

        {/* LOGO */}
        <div className="cursor-pointer" onClick={() => handleScroll("hero")}>
          <Image src="/catalysis.png" alt="Catalysis" width={110} height={45} />
        </div>

        {/* DESKTOP NAV */}
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

        {/* DESKTOP BUTTON */}
        <div
          className="hidden md:block cursor-pointer"
          onClick={() => handleScroll("cta")}
        >
          <Image src="/nav-register-now.png" alt="Register" width={110} height={50} />
        </div>

        {/* HAMBURGER */}
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

      {/* 🔥 MOBILE OVERLAY MENU */}
      <div
        className={`md:hidden fixed inset-0 bg-[#FFEEF0]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* NAV ITEMS */}
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

        {/* CTA BUTTON */}
        <button
          onClick={() => handleScroll("cta")}
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