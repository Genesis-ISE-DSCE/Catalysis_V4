"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Timeline", id: "timeline" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // ✅ Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      if (isOpen) return;

      const y = window.scrollY;

      if (y > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (y < lastScrollY.current || y < 50) {
        setIsVisible(true);
      } else if (y > lastScrollY.current && y > 50) {
        setIsVisible(false);
      }

      lastScrollY.current = y;

      if (isHome) {
        const mid = y + window.innerHeight * 0.4;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(navItems[i].id);
          if (el && el.offsetTop <= mid) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, isOpen]);

  // ✅ Lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const handleNavClick = (id: string) => {
    if (isHome) scrollTo(id);
    else {
      router.push(`/#${id}`);
      setIsOpen(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#FFEEF0]/95 backdrop-blur-md border-b-4 border-black shadow-[0px_4px_0px_rgba(0,0,0,1)] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 transition-all duration-300">
          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0 z-[110] transition-transform duration-300 hover:scale-105"
            onClick={() => handleNavClick("hero")}
          >
            <Image
              src="/catalysis.png"
              alt="Catalysis"
              width={isScrolled ? 100 : 120}
              height={isScrolled ? 36 : 44}
              className="h-auto w-auto drop-shadow-md"
            />
          </div>

          {/* Desktop nav */}
          <div className={`hidden md:flex items-center gap-1 lg:gap-3 px-4 py-2 rounded-2xl transition-all duration-300 ${isScrolled ? "bg-white/50 border-2 border-black/10 backdrop-blur-sm" : ""}`}>
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm lg:text-base font-bold rounded-xl transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white bg-[#DD273E] border-2 border-black shadow-[2px_2px_0px_black]"
                      : "text-black/80 hover:text-black hover:bg-black/5"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop button */}
          <button
            onClick={handleRegister}
            className="hidden md:flex items-center gap-2 bg-[#DD273E] text-white font-black text-sm lg:text-base px-6 py-2.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_black] active:translate-y-0.5 active:shadow-[2px_2px_0px_black] transition-all"
          >
            REGISTER NOW
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          {/* Hamburger Menu - Fixed position to stay above overlay */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-12 h-12 cursor-pointer z-[110] bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_black] active:shadow-[2px_2px_0px_black] active:translate-x-[2px] active:translate-y-[2px] transition-all ${
              isOpen ? "bg-[#FFEEF0]" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute block w-6 h-[3px] bg-black rounded-full transition-all duration-300 ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute block w-6 h-[3px] bg-black rounded-full transition-all duration-200 top-2 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block w-6 h-[3px] bg-black rounded-full transition-all duration-300 ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU PANEL */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-[340px] z-[108] bg-[#FFEEF0] border-l-4 border-black shadow-[-15px_0px_40px_rgba(0,0,0,0.3)] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-10">
          <div className="flex flex-col gap-5">
            {navItems.map((item, index) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ transitionDelay: isOpen ? `${150 + index * 50}ms` : '0ms' }}
                  className={`text-left text-3xl font-black italic uppercase transition-all duration-300 flex items-center justify-between group py-2 border-b-2 ${
                    isActive ? "border-[#DD273E]" : "border-black/10 hover:border-black/30"
                  } ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                  }`}
                >
                  <span className={`transition-colors ${isActive ? "text-[#DD273E]" : "text-[#3A001D] group-hover:text-[#DD273E]"}`}>
                    {item.label}
                  </span>
                  
                  <span className={`transform transition-transform ${isActive ? "translate-x-0 opacity-100 text-[#DD273E]" : "-translate-x-4 opacity-0 text-black/20 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#DD273E]"}`}>
                    &rarr;
                  </span>
                </button>
              );
            })}
          </div>

          <div className={`mt-auto pt-10 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100 delay-500" : "translate-y-12 opacity-0"}`}>
            <button
              onClick={handleRegister}
              className="w-full relative group overflow-hidden bg-[#DD273E] text-white text-xl font-bold px-8 py-5 rounded-2xl border-4 border-black shadow-[6px_6px_0px_black] active:shadow-none active:translate-x-1.5 active:translate-y-1.5 transition-all"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                REGISTER NOW
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}