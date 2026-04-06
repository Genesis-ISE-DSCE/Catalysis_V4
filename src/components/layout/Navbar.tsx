"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ui/ThemeProvider";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Timeline", id: "timeline" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
];

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      if (isOpen) return;
      const y = window.scrollY;
      setIsScrolled(y > 20);
      if (y < lastScrollY.current || y < 50) setIsVisible(true);
      else if (y > lastScrollY.current && y > 50) setIsVisible(false);
      lastScrollY.current = y;

      if (isHome) {
        const mid = y + window.innerHeight * 0.4;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(navItems[i].id);
          if (el && el.offsetTop <= mid) { setActiveSection(navItems[i].id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, isOpen]);

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
    else { router.push(`/#${id}`); setIsOpen(false); }
  };

  const handleRegister = () => { router.push("/register"); setIsOpen(false); };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#FFEEF0]/95 dark:bg-[#0A0018]/95 backdrop-blur-md border-b-4 border-black dark:border-white/15 shadow-[0px_4px_0px_rgba(0,0,0,1)] dark:shadow-[0px_4px_0px_rgba(255,45,85,0.15)] py-2"
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
              className="h-auto drop-shadow-md"
              unoptimized
              priority
              quality={100}
            />
          </div>

          {/* Desktop nav */}
          <div className={`hidden md:flex items-center gap-1 lg:gap-3 px-4 py-2 rounded-2xl transition-all duration-300 ${
            isScrolled ? "bg-white/50 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 backdrop-blur-sm" : ""
          }`}>
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm lg:text-base font-bold rounded-xl transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white bg-[#DD273E] border-2 border-black shadow-[2px_2px_0px_black] dark:shadow-[2px_2px_0px_rgba(255,45,85,0.5)]"
                      : "text-black/80 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/8"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop right — toggle + register */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
                isDark
                  ? "bg-[#160030] border-white/20 text-yellow-300 hover:border-yellow-400/50"
                  : "bg-white border-black text-[#3A001D] shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black]"
              }`}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={handleRegister}
              className="flex items-center gap-2 bg-[#DD273E] text-white font-black text-sm lg:text-base px-6 py-2.5 rounded-xl border-2 border-black dark:border-transparent shadow-[4px_4px_0px_black] dark:shadow-[0_0_16px_rgba(255,45,85,0.4)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_black] dark:hover:shadow-[0_0_24px_rgba(255,45,85,0.6)] active:translate-y-0.5 transition-all"
            >
              REGISTER NOW
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-12 h-12 z-[110] rounded-xl border-[3px] shadow-[4px_4px_0px_black] dark:shadow-[0_0_12px_rgba(255,45,85,0.3)] active:shadow-[2px_2px_0px_black] active:translate-x-[2px] active:translate-y-[2px] transition-all ${
              isDark
                ? "bg-[#160030] border-white/20"
                : `bg-white border-black ${isOpen ? "bg-[#FFEEF0]" : ""}`
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute block w-6 h-[3px] rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-black"} ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute block w-6 h-[3px] rounded-full transition-all duration-200 top-2 ${isDark ? "bg-white" : "bg-black"} ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block w-6 h-[3px] rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-black"} ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE PANEL */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[85%] max-w-[340px] z-[108] border-l-4 shadow-[-15px_0px_40px_rgba(0,0,0,0.3)] transition-transform duration-500 overflow-y-auto ${
          isDark
            ? "bg-[#0A0018] border-white/15"
            : "bg-[#FFEEF0] border-black"
        } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-10">
          <div className="flex flex-col gap-5">
            {navItems.map((item, index) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ transitionDelay: isOpen ? `${150 + index * 50}ms` : "0ms" }}
                  className={`text-left text-3xl font-black italic uppercase transition-all duration-300 flex items-center justify-between group py-2 border-b-2 ${
                    isActive
                      ? "border-[#DD273E]"
                      : `${isDark ? "border-white/10 hover:border-white/25" : "border-black/10 hover:border-black/30"}`
                  } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
                >
                  <span className={`transition-colors ${
                    isActive
                      ? "text-[#DD273E]"
                      : `${isDark ? "text-white group-hover:text-[#FF2D55]" : "text-[#3A001D] group-hover:text-[#DD273E]"}`
                  }`}>
                    {item.label}
                  </span>
                  <span className={`transform transition-transform ${isActive ? "translate-x-0 opacity-100 text-[#DD273E]" : "-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#DD273E]"}`}>
                    &rarr;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile dark toggle */}
          <div className={`mt-8 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100 delay-300" : "translate-y-12 opacity-0"}`}>
            <button
              onClick={toggle}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-bold text-base transition-all ${
                isDark
                  ? "bg-[#160030] border-white/20 text-yellow-300"
                  : "bg-white border-black text-[#3A001D] shadow-[3px_3px_0px_black]"
              }`}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <div className={`mt-auto pt-6 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100 delay-500" : "translate-y-12 opacity-0"}`}>
            <button
              onClick={handleRegister}
              className="w-full relative group overflow-hidden bg-[#DD273E] text-white text-xl font-bold px-8 py-5 rounded-2xl border-4 border-black dark:border-transparent shadow-[6px_6px_0px_black] dark:shadow-[0_0_20px_rgba(255,45,85,0.4)] active:shadow-none active:translate-x-1.5 active:translate-y-1.5 transition-all"
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
