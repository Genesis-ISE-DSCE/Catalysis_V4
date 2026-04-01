"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Contact", id: "faq" },
  { label: "Support", id: "footer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFEEF0]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        <div className="cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => handleScrollTo("hero")}>
          <Image
            src="/catalysis.png"
            alt="Catalysis"
            width={150}
            height={60}
            className="w-[120px] md:w-[150px] h-auto"
          />
        </div>

        <div className="hidden md:flex gap-10 font-semibold text-[17px] text-black">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="hover:text-red-500 hover:scale-105 transition-all duration-200 origin-center"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="hidden md:block cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => handleScrollTo("cta")}
        >
          <Image
            src="/nav-register-now.png"
            alt="Register"
            width={130}
            height={60}
            className="w-[120px] md:w-[130px] h-auto"
          />
        </div>

        <div
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-7 h-[3px] bg-black mb-1.5 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-[3px] bg-black mb-1.5 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[3px] bg-black transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#FFEEF0] shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[400px] py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 font-semibold text-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="text-black text-xl hover:text-red-500 hover:scale-105 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}

          <div
            className="cursor-pointer mt-2 transition-transform duration-200 hover:scale-105"
            onClick={() => handleScrollTo("cta")}
          >
            <Image
              src="/nav-register-now.png"
              alt="Register"
              width={130}
              height={60}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}