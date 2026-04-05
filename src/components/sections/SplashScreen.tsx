"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"video" | "shrink" | "done">("video");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [targetPos, setTargetPos] = useState({ x: 80, y: 28 });

  const startShrink = useCallback(() => {
    // Calculate navbar logo position
    const navLogo = document.querySelector("nav img[alt='Catalysis']");
    if (navLogo) {
      const rect = navLogo.getBoundingClientRect();
      setTargetPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setPhase("shrink");
  }, []);

  // When video ends, start the logo shrink transition
  const handleVideoEnd = useCallback(() => {
    startShrink();
  }, [startShrink]);

  // Fallback: if video fails to load, skip after 1s
  const handleVideoError = useCallback(() => {
    setTimeout(startShrink, 1000);
  }, [startShrink]);

  useEffect(() => {
    if (phase === "shrink") {
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Safety fallback — skip splash after 15s no matter what
  useEffect(() => {
    const fallback = setTimeout(() => {
      if (phase !== "done") {
        setPhase("done");
        onComplete();
      }
    }, 15000);
    return () => clearTimeout(fallback);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  const translateX = phase === "shrink" ? targetPos.x - centerX : 0;
  const translateY = phase === "shrink" ? targetPos.y - centerY : 0;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#FFEEF0]"
      style={{
        opacity: phase === "shrink" ? 0 : 1,
        transition: "opacity 0.5s ease-in 0.3s",
        pointerEvents: phase === "shrink" ? "none" : "auto",
      }}
    >
      {/* Video layer */}
      {phase === "video" && (
        <video
          ref={videoRef}
          src="/splash.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Logo that shrinks to navbar on video end */}
      {phase === "shrink" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              transform: `translate(${translateX}px, ${translateY}px) scale(0.25)`,
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src="/catalysis.png"
              alt="Catalysis"
              width={400}
              height={146}
              priority
              unoptimized
              quality={100}
              className="w-[280px] sm:w-[350px] md:w-[400px] h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
