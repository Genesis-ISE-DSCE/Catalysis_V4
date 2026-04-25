"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ── floating particle component ── */
function Particle({ delay, size, left, duration }: { delay: number; size: number; left: number; duration: number }) {
  return (
    <div
      className="absolute rounded-full opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: "-20px",
        background: "linear-gradient(135deg, #DD273E, #FF6B81)",
        animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function RegistrationClosedPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Particles config
  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: Math.random() * 5,
    size: 6 + Math.random() * 14,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 6,
  }));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FFF5F6]">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Big blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FFEEF0] opacity-60" />
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-[#FFE8EB] opacity-50" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-[#FFD6DB] opacity-30" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#DD273E 1px, transparent 1px),
              linear-gradient(90deg, #DD273E 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* ── Content Card ── */}
      <div
        className={`relative z-10 max-w-2xl w-[92%] mx-auto transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <Image
            src="/catalysis.png"
            alt="Catalysis 4.0"
            width={1920}
            height={1080}
            className="w-52 md:w-64 h-auto drop-shadow-xl"
            unoptimized
            priority
            quality={100}
          />
        </div>

        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border-4 border-black shadow-[8px_8px_0px_black] p-8 md:p-12 text-center">
          {/* Closed badge */}
          <div
            className={`inline-flex items-center gap-2 bg-[#DD273E] text-white font-black text-sm uppercase tracking-wider px-5 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_black] mb-6 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            Registration Closed
          </div>

          {/* Pokeball divider */}
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-700 delay-400 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-black/10 to-black/20 rounded-full" />
            <div className="w-10 h-10 bg-white rounded-full border-[4px] border-black flex items-center justify-center shadow-[2px_2px_0px_black]">
              <div className="w-4 h-4 bg-white rounded-full border-[3px] border-black" />
            </div>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent via-black/10 to-black/20 rounded-full" />
          </div>

          {/* Heading */}
          <h1
            className={`font-[var(--font-gliker)] text-3xl md:text-5xl font-bold text-[#3A001D] mb-4 leading-tight transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontFamily: "var(--font-gliker, 'Gliker', sans-serif)" }}
          >
            Registrations Are <br />
            <span className="text-[#DD273E]">Now Closed!</span>
          </h1>

          {/* Subtext */}
          <p
            className={`text-base md:text-lg text-[#3A001D]/70 font-medium max-w-md mx-auto mb-8 leading-relaxed transition-all duration-700 delay-600 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Thank you to all the amazing trainers who registered for{" "}
            <span className="font-bold text-[#DD273E]">Catalysis 4.0</span>! 
            We&apos;ve had an overwhelming response.
          </p>

          {/* Contact */}
          <div
            className={`transition-all duration-700 delay-700 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm text-[#3A001D]/50 font-medium">
              Questions? Reach out to{" "}
              <a href="mailto:ise.genesis.dsce@gmail.com" className="font-bold text-[#DD273E] hover:underline">Club Genesis</a>{" "}
              · ISE Dept, DSCE Bangalore
            </p>
          </div>
        </div>

        {/* Footer credit */}
        <p
          className={`text-center text-xs text-[#3A001D]/30 mt-6 font-medium transition-all duration-700 delay-[900ms] ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          © 2026 Club Genesis, ISE Dept, DSCE. All rights reserved.
        </p>
      </div>

      {/* ── Keyframe styles ── */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
