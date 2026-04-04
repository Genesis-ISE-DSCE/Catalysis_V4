"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/*
 * STATE MACHINE
 * ─────────────
 * idle      → pokeballs cycle + "Throw a Pokeball"
 * throwing  → ball flies upward off screen (0.5 s) — no bounce
 * red-in    → red overlay ripples in + Catalysis logo fades in (white)
 * red-out   → red fades, logo stays visible on pink for ~1.5 s
 * fly       → logo shrinks toward real navbar logo position
 * fade-out  → entire overlay dissolves → hero page reveals beneath
 * done      → unmount
 */

type State = "idle" | "throwing" | "red-in" | "red-out" | "fly" | "fade-out" | "done";

const POKEBALLS = [
  "/splash/pokeballs/pokeball-0.png",
  "/splash/pokeballs/pokeball-1.png",
  "/splash/pokeballs/pokeball-2.png",
  "/splash/pokeballs/pokeball-3.png",
  "/splash/pokeballs/pokeball-4.png",
  "/splash/pokeballs/pokeball-5.png",
  "/splash/pokeballs/pokeball-6.png",
  "/splash/pokeballs/pokeball-7.png",
  "/splash/pokeballs/pokeball-8.png",
  "/splash/pokeballs/pokeball-9.png",
];

const LOGO_W = 200;
const LOGO_H = 73;

export default function SplashScreen() {
  const [state, setState]           = useState<State>("idle");
  const [isClient, setIsClient]     = useState(false);
  const [ballIdx, setBallIdx]       = useState(0);
  const [thrownBall, setThrownBall] = useState(0);
  const [fadeBall, setFadeBall]     = useState(false);
  const [logoIn, setLogoIn]         = useState(false);

  const flyTransformRef = useRef(`translate(24px, 16px) scale(0.6)`);
  const intervalRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── hydration + session ── */
  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem("splashSeen") === "true") {
      setState("done");
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  /* ── cycle pokeballs ── */
  useEffect(() => {
    if (state !== "idle") return;
    intervalRef.current = setInterval(() => {
      setFadeBall(true);
      setTimeout(() => {
        setBallIdx(i => (i + 1) % POKEBALLS.length);
        setFadeBall(false);
      }, 180);
    }, 550);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state]);

  /*
   * logoIn management
   * ─────────────────
   * Only reset to false for pre-reveal states.
   * Once true (set in red-in), it stays true through red-out, fly, fade-out
   * so the logo remains visible until the whole overlay fades.
   */
  useEffect(() => {
    if (state === "idle" || state === "throwing") {
      setLogoIn(false);
      return;
    }
    if (state === "red-in") {
      const t = setTimeout(() => setLogoIn(true), 200);
      return () => clearTimeout(t);
    }
    // red-out / fly / fade-out: do NOT reset — keep logo visible
  }, [state]);

  /*
   * Measure the real navbar logo rect during red-out.
   * We have ~1.5 s before fly starts — plenty of time.
   */
  useEffect(() => {
    if (state !== "red-out") return;
    const navImg = document.querySelector("nav img[alt='Catalysis']") as HTMLElement | null;
    if (navImg) {
      const r     = navImg.getBoundingClientRect();
      const scale = r.width / LOGO_W;
      flyTransformRef.current = `translate(${r.left}px, ${r.top}px) scale(${scale})`;
    }
  }, [state]);

  /* ── click handler ── */
  const handleThrow = useCallback(() => {
    if (state !== "idle") return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setThrownBall(ballIdx);
    window.dispatchEvent(new Event("catalysis:play"));

    setState("throwing");                         // ball flies up (0.5 s CSS anim)

    setTimeout(() => {
      setState("red-in");                         // red ripple + logo fades in

      setTimeout(() => {
        setState("red-out");                      // red fades, logo stays on pink

        setTimeout(() => {
          setState("fly");                        // logo drags to navbar position

          setTimeout(() => {
            setState("fade-out");                 // whole overlay dissolves

            setTimeout(() => {
              sessionStorage.setItem("splashSeen", "true");
              setState("done");
              document.body.style.overflow = "auto";
            }, 550);
          }, 950);
        }, 1500);                                 // logo stays on pink for 1.5 s
      }, 900);
    }, 500);
  }, [state, ballIdx]);

  if (!isClient || state === "done") return null;

  const showBall     = state === "idle" || state === "throwing";
  const showEllipses = state === "red-in" || state === "red-out";
  const showLogo     = state === "red-in" || state === "red-out" || state === "fly" || state === "fade-out";
  const redActive    = state === "red-in";
  const isFly        = state === "fly" || state === "fade-out";

  const LOGO_CENTER = `translate(calc(50vw - ${LOGO_W / 2}px), calc(50vh - ${LOGO_H / 2}px)) scale(1)`;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f5eaea] overflow-hidden"
      style={{
        opacity:       state === "fade-out" ? 0 : 1,
        transition:    state === "fade-out" ? "opacity 0.55s ease" : undefined,
        pointerEvents: state === "fade-out" ? "none" : undefined,
      }}
    >
      <style>{`
        /* idle: gentle rock */
        @keyframes ballWobble {
          0%, 100% { transform: rotate(-5deg) scale(1);    }
          25%       { transform: rotate(0deg)  scale(1.05); }
          50%       { transform: rotate(5deg)  scale(1);    }
          75%       { transform: rotate(0deg)  scale(1.05); }
        }
        .splash-idle { animation: ballWobble 2s ease-in-out infinite; }

        /* throw: fly upward, no bounce */
        @keyframes throwUp {
          0%   { transform: translateY(0)     scale(1);   opacity: 1; }
          30%  { transform: translateY(-40px) scale(1.08); opacity: 1; }
          100% { transform: translateY(-380px) scale(0.2); opacity: 0; }
        }
        .splash-throw { animation: throwUp 0.5s cubic-bezier(0.4,0,0.6,1) forwards; }

        /* ellipse ripple */
        @keyframes eIn1 {
          from { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
          to   { transform: translate(-50%,-50%) scale(1);   opacity: 1; }
        }
        @keyframes eIn2 {
          from { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
          to   { transform: translate(-50%,-50%) scale(1.6); opacity: 0.82; }
        }
        @keyframes eIn3 {
          from { transform: translate(-50%,-50%) scale(0);   opacity: 0; }
          to   { transform: translate(-50%,-50%) scale(2.5); opacity: 0.65; }
        }
        .e1 { animation: eIn1 0.5s  cubic-bezier(0.22,1,0.36,1) 0.00s both; }
        .e2 { animation: eIn2 0.5s  cubic-bezier(0.22,1,0.36,1) 0.09s both; }
        .e3 { animation: eIn3 0.55s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
      `}</style>

      {/* red overlay */}
      <div
        className="absolute inset-0 bg-[#DD273E] pointer-events-none"
        style={{
          opacity:    redActive ? 1 : 0,
          transition: redActive ? "opacity 0.4s ease" : "opacity 0.55s ease",
        }}
      />

      {/* ── POKEBALL ── */}
      {showBall && (
        <div className="flex flex-col items-center gap-6 relative z-10 select-none">
          <button
            onClick={handleThrow}
            className={`focus:outline-none cursor-pointer ${
              state === "throwing" ? "splash-throw" : "splash-idle"
            }`}
            aria-label="Throw the Pokeball"
          >
            <Image
              src={state === "throwing" ? POKEBALLS[thrownBall] : POKEBALLS[ballIdx]}
              alt="Pokeball"
              width={110}
              height={110}
              priority
              draggable={false}
              style={{
                opacity:    fadeBall ? 0 : 1,
                transition: "opacity 0.18s ease",
                filter:     "drop-shadow(0 10px 22px rgba(0,0,0,0.28))",
              }}
            />
          </button>

          <p
            className="text-lg md:text-xl font-bold uppercase tracking-widest text-[#3A001D]"
            style={{
              opacity:    state === "idle" ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            Throw a Pokeball
          </p>
        </div>
      )}

      {/* ── ELLIPSES ── */}
      {showEllipses && (
        <>
          {[
            { src: "/splash/ellipse-1.png", cls: "e1" },
            { src: "/splash/ellipse-2.png", cls: "e2" },
            { src: "/splash/ellipse-3.png", cls: "e3" },
          ].map(({ src, cls }) => (
            <div
              key={src}
              className={`absolute rounded-full overflow-hidden pointer-events-none ${cls}`}
              style={{
                top: "50%", left: "50%",
                width: 900, height: 900,
                opacity:    redActive ? undefined : 0,
                transition: redActive ? undefined : "opacity 0.55s ease",
              }}
            >
              <Image src={src} alt="" fill sizes="900px" className="object-cover" draggable={false} />
            </div>
          ))}
        </>
      )}

      {/* ── CATALYSIS LOGO ── */}
      {showLogo && (
        <div
          style={{
            position:        "fixed",
            top:             0,
            left:            0,
            willChange:      "transform, opacity",
            transformOrigin: "top left",
            transform:       isFly ? flyTransformRef.current : LOGO_CENTER,
            /*
             * Opacity logic:
             * - red-in / red-out / fade-out: visible (logoIn drives 0→1 fade-in, then stays 1)
             * - fly: fades out as it reaches the navbar (delayed so it moves first)
             */
            opacity:  state === "fly" ? 0 : logoIn ? 1 : 0,
            transition: state === "fly"
              ? "transform 0.9s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease 0.6s"
              : "opacity 0.45s ease",
            zIndex:        10000,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/catalysis.png"
            alt="Catalysis"
            width={LOGO_W}
            height={LOGO_H}
            priority
            draggable={false}
            style={{
              filter:     redActive ? "brightness(0) invert(1)" : "none",
              transition: "filter 0.35s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}
