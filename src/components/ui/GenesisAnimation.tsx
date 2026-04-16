"use client";

import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Precomputed at module level — avoids Math.random() inside render (react-hooks/purity)
const STARS = Array.from({ length: 70 }, (_, i) => ({
  id:    i,
  top:   `${Math.random() * 100}%`,
  left:  `${Math.random() * 100}%`,
  size:  Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  dur:   Math.random() * 3 + 2,
}));
import Image from "next/image";

// ─── Pokémon Showdown animated sprites ───────────────────────────────────────
const sprite = (name: string) =>
  `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`;

const POKEMONS = [
  { name: "charizard", src: sprite("charizard"), dx: 0, dy: -210, size: 96, glow: "rgba(255,120,30,0.9)" },
  { name: "mewtwo", src: sprite("mewtwo"), dx: 225, dy: -75, size: 88, glow: "rgba(180,80,255,0.9)" },
  { name: "rayquaza", src: sprite("rayquaza"), dx: 165, dy: 165, size: 88, glow: "rgba(80,210,80,0.9)" },
  { name: "alakazam", src: sprite("alakazam"), dx: -175, dy: 150, size: 88, glow: "rgba(80,180,255,0.9)" },
  { name: "arceus", src: sprite("arceus"), dx: -218, dy: -80, size: 88, glow: "rgba(255,200,80,0.9)" },
] as const;

// ─── Lightning path ───────────────────────────────────────────────────────────
function makeLightningPath(x1: number, y1: number, x2: number, y2: number, idx = 0): string {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return `M ${x1} ${y1}`;
  const nx = -dy / len, ny = dx / len;
  const amp = len * 0.11;
  const patterns = [
    [0, -1.0, 0.7, -0.5, 0.3, 0],
    [0, 0.8, -0.6, 0.9, -0.4, 0],
    [0, -0.7, 1.0, -0.8, 0.5, 0],
    [0, 0.9, -0.5, 0.7, -0.6, 0],
    [0, -0.8, 0.6, -0.4, 0.9, 0],
  ];
  const pat = patterns[idx % patterns.length];
  let d = `M ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  for (let i = 1; i < pat.length; i++) {
    const t = i / (pat.length - 1);
    const bx = x1 + dx * t, by = y1 + dy * t;
    const jag = i < pat.length - 1 ? pat[i] * amp : 0;
    d += ` L ${(bx + nx * jag).toFixed(1)} ${(by + ny * jag).toFixed(1)}`;
  }
  return d;
}

// ─── Stars (shared between start screen and animation) ───────────────────────
function Stars() {
  // Alternate between brand red, gold, and warm grey for a light-theme feel
  const COLORS = useMemo(() => ["rgba(221,39,62,0.18)","rgba(200,120,50,0.14)","rgba(100,60,30,0.12)","rgba(180,80,60,0.16)"], []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            background: COLORS[s.id % COLORS.length],
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ─── CSS Pokéball ─────────────────────────────────────────────────────────────
function Pokeball() {
  return (
    <motion.div
      className="pokeball-container absolute z-20 flex flex-col items-center"
      style={{ scale: 0 }}
    >
      <motion.div className="pokeball-top" style={{ width: 160, height: 80 }}>
        <div style={{ width: 160, height: 80, background: "linear-gradient(180deg,#e63030 0%,#c41f1f 100%)", borderRadius: "80px 80px 0 0", border: "6px solid #111", borderBottom: "3px solid #111", boxShadow: "inset 0 6px 18px rgba(255,255,255,0.12), 0 0 32px rgba(220,50,50,0.6)", position: "relative" }}>
          <div style={{ position: "absolute", bottom: -14, left: "50%", transform: "translateX(-50%)", width: 32, height: 16, background: "#fff", border: "6px solid #111", borderRadius: "16px 16px 0 0", borderBottom: "none" }} />
        </div>
      </motion.div>
      <div style={{ width: 160, height: 6, background: "#111" }} />
      <motion.div className="pokeball-bottom" style={{ width: 160, height: 80 }}>
        <div style={{ width: 160, height: 80, background: "linear-gradient(0deg,#e8e8e8 0%,#fff 100%)", borderRadius: "0 0 80px 80px", border: "6px solid #111", borderTop: "3px solid #111", boxShadow: "inset 0 -6px 18px rgba(0,0,0,0.08), 0 0 32px rgba(200,200,200,0.15)", position: "relative" }}>
          <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 32, height: 16, background: "#fff", border: "6px solid #111", borderRadius: "0 0 16px 16px", borderTop: "none" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function GenesisAnimation() {
  const [scope, animate] = useAnimate();
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);   // click-gate
  const [dims, setDims] = useState({ w: 1280, h: 720 });
  const [lightningPhase, setLightningPhase] = useState(-1);
  const [hitSet, setHitSet] = useState<Set<number>>(new Set());
  const [charged, setCharged] = useState(false);
  const [globalFlash, setGlobalFlash] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [whosThat, setWhosThat] = useState(false);

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  const cx = dims.w / 2;
  const cy = dims.h / 2;

  const lightningPaths = useMemo(
    () => POKEMONS.map((p, i) => makeLightningPath(cx, cy, cx + p.dx, cy + p.dy, i)),
    [cx, cy]
  );

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 260);
  };

  // Animation only runs after the user clicks the Pokéball
  useEffect(() => {
    if (!started) return;

    const run = async () => {
      // ── PHASE 1: Pokémon + Pikachu pop in ────────────────────────────────
      await Promise.all([
        animate(".pikachu", { opacity: 1, scale: [0, 1.05, 1] }, { duration: 0.4 }),
        ...POKEMONS.map((_, i) =>
          animate(`.pokemon-${i}`, { opacity: 1, scale: [0, 1.12, 1] }, { duration: 0.4, delay: 0.06 + i * 0.1 })
        ),
      ]);

      // ── PHASE 2: Pikachu charges up ───────────────────────────────────────
      setCharged(true);
      await new Promise<void>((r) => setTimeout(r, 700));

      // ── PHASE 3: Five sequential lightning strikes ─────────────────────────
      for (let i = 0; i < POKEMONS.length; i++) {
        setLightningPhase(i);
        setHitSet((prev) => new Set([...prev, i]));
        triggerShake();
        setGlobalFlash(true);
        setTimeout(() => setGlobalFlash(false), 160);
        await new Promise<void>((r) => setTimeout(r, 370));
      }

      await new Promise<void>((r) => setTimeout(r, 380));

      // ── PHASE 4: Megaflash → all fighters fade ────────────────────────────
      setGlobalFlash(true);
      triggerShake();
      await animate(".fighters", { opacity: 0 }, { duration: 0.55 });
      setLightningPhase(-1);
      setGlobalFlash(false);
      setCharged(false);

      // ── PHASE 5: Pokéball pops in ─────────────────────────────────────────
      await animate(".pokeball-container", { scale: [0, 1.15, 1] }, { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] });
      await new Promise<void>((r) => setTimeout(r, 500));

      // ── PHASE 6: Pokéball splits ──────────────────────────────────────────
      await Promise.all([
        animate(".pokeball-top", { y: -180 }, { duration: 1, ease: "easeInOut" }),
        animate(".pokeball-bottom", { y: 180 }, { duration: 1, ease: "easeInOut" }),
        animate(".pokeball-container", { opacity: 0 }, { duration: 1, delay: 0.5 }),
      ]);

      // ── PHASE 7: "Who's That Pokémon?" — yellow panel + silhouette ────────
      setWhosThat(true);
      await animate(".catalysis-logo", { opacity: 1, filter: "brightness(0)" }, { duration: 0.55, ease: "easeOut" });
      await animate(".whos-that-text", { opacity: 1, y: [14, 0] }, { duration: 0.45, ease: "easeOut" });
      await new Promise<void>((r) => setTimeout(r, 2200));

      // ── PHASE 8: Reveal flash → full colour logo + Genesis text ───────────
      await animate(".whos-that-text", { opacity: 0, y: [0, -8] }, { duration: 0.2 });
      setGlobalFlash(true);
      triggerShake();
      setTimeout(() => setGlobalFlash(false), 350);
      setWhosThat(false);
      await new Promise<void>((r) => setTimeout(r, 120));

      // Logo colour reveals + "It's CATALYSIS 4.0!" pops in together
      await Promise.all([
        animate(".catalysis-logo", { filter: "brightness(1)" }, { duration: 1, ease: "easeOut" }),
        animate(".reveal-text", { opacity: 1, scale: [0.75, 1.08, 1] }, { duration: 0.55, ease: "easeOut" }),
      ]);

      // Hold the reveal moment — like the anime announcer saying the name
      await new Promise<void>((r) => setTimeout(r, 750));

      // "WELCOME TO GENESIS" fades in below
      await animate(".genesis-text", { opacity: 1, y: [24, 0] }, { duration: 0.9, ease: "easeOut" });

      // ── PHASE 9: Idle glow ∞ ──────────────────────────────────────────────
      animate(
        ".catalysis-logo",
        { filter: ["brightness(1)", "brightness(1.25)", "brightness(1)"] },
        { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      );

      setDone(true);
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 flex items-center justify-center overflow-hidden select-none"
      style={{
        zIndex: 1000,
        background: "radial-gradient(ellipse at 50% 60%, #FFF5EC 0%, #FAF7ED 60%, #F0E8D6 100%)",
        fontFamily: "var(--font-nunito), sans-serif",
      }}
      animate={shaking ? { x: [0, -8, 8, -5, 5, -2, 2, 0], y: [0, -4, 4, -2, 2, 0] } : { x: 0, y: 0 }}
      transition={{ duration: 0.26, ease: "easeInOut" }}
    >
      {/* ── Starfield — always visible ── */}
      <Stars />

      {/* ─────────────────────────────────────────────────────────────────────
          CLICK GATE: Pokéball start screen
          Rendered over everything until user clicks, then exits cleanly.
      ───────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="start-screen"
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            style={{ zIndex: 200 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-gliker), sans-serif",
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                fontWeight: 700,
                color: "#1a0040",
                letterSpacing: "0.06em",
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              CATALYSIS 4.0
            </motion.h1>

            {/* Pokéball button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 },
                scale: { duration: 0.5, delay: 0.5 },
                y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStarted(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "block",
                filter: "drop-shadow(0 0 32px rgba(221,39,62,0.75)) drop-shadow(0 0 8px rgba(221,39,62,0.4))",
              }}
              aria-label="Start the Catalysis launch animation"
            >
              <Image
                src="/poke-balls/pokeball1.png"
                alt="Pokéball — click to begin"
                width={160}
                height={160}
                style={{ objectFit: "contain", display: "block" }}
                priority
              />
            </motion.button>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{
                fontFamily: "var(--font-nunito), sans-serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#3A001D",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Click the Pokéball to begin
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────────────
          ANIMATION CONTENT — always in DOM, starts invisible, driven by
          the useEffect animation sequence that begins on `started = true`.
      ───────────────────────────────────────────────────────────────────── */}

      {/* "Who's That?" yellow panel (z-5, below logo at z-10) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5, background: "linear-gradient(135deg, #FFE200 0%, #FFF9A0 45%, #FFD700 100%)" }}
        animate={{ opacity: whosThat ? 1 : 0 }}
        transition={{ duration: whosThat ? 0.3 : 0.45 }}
      />

      {/* Global flash overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          background: "radial-gradient(ellipse at center, rgba(255,255,160,0.95) 0%, rgba(255,220,0,0.6) 35%, transparent 65%)",
        }}
        animate={{ opacity: globalFlash ? 0.75 : 0 }}
        transition={{ duration: globalFlash ? 0.05 : 0.25 }}
      />

      {/* Lightning SVG */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${dims.w} ${dims.h}`}>
          <defs>
            <filter id="bolt-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="core-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {POKEMONS.map((_, i) => (
            <g key={i}>
              <motion.path d={lightningPaths[i]} stroke="#FFD700" strokeWidth="10" strokeLinecap="round" fill="none" filter="url(#bolt-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={i <= lightningPhase ? { pathLength: [0, 1], opacity: [0, 0.55, 0.4] } : { pathLength: 0, opacity: 0 }}
                transition={i <= lightningPhase ? { duration: 0.22, ease: "easeOut" } : { duration: 0.15 }}
              />
              <motion.path d={lightningPaths[i]} stroke="#FFFFF0" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#core-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={i <= lightningPhase ? { pathLength: [0, 1], opacity: [0, 1, 0.9] } : { pathLength: 0, opacity: 0 }}
                transition={i <= lightningPhase ? { duration: 0.22, ease: "easeOut" } : { duration: 0.15 }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Fighters */}
      <div className="fighters absolute inset-0 pointer-events-none" style={{ zIndex: 15 }}>
        {/* Pikachu — center */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <div className="pikachu" style={{ opacity: 0, textAlign: "center", position: "relative" }}>
            {charged && (
              <>
                <motion.div style={{ position: "absolute", bottom: 26, left: 6, width: 14, height: 10, borderRadius: "50%", background: "radial-gradient(circle, #FFE000, #FF9500)", filter: "blur(3px)" }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.35, 0.9] }}
                  transition={{ duration: 0.38, repeat: Infinity }} />
                <motion.div style={{ position: "absolute", bottom: 26, right: 6, width: 14, height: 10, borderRadius: "50%", background: "radial-gradient(circle, #FFE000, #FF9500)", filter: "blur(3px)" }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.35, 0.9] }}
                  transition={{ duration: 0.38, repeat: Infinity, delay: 0.1 }} />
                <motion.div style={{ position: "absolute", inset: -14, borderRadius: "50%", border: "2px solid rgba(255,220,0,0.6)", boxShadow: "0 0 18px rgba(255,220,0,0.5), inset 0 0 18px rgba(255,220,0,0.1)" }}
                  animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.09, 1] }}
                  transition={{ duration: 0.35, repeat: Infinity }} />
              </>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://play.pokemonshowdown.com/sprites/ani/pikachu.gif" alt="Pikachu" width={100} height={100}
              style={{ imageRendering: "pixelated", display: "block", filter: charged ? "drop-shadow(0 0 22px rgba(255,220,0,1)) drop-shadow(0 0 44px rgba(255,160,0,0.8))" : "drop-shadow(0 0 6px rgba(255,220,0,0.4))", transition: "filter 0.4s ease" }} />
          </div>
        </div>

        {/* Surrounding Pokémon */}
        {POKEMONS.map((p, i) => (
          <div key={i} style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(calc(-50% + ${p.dx}px), calc(-50% + ${p.dy}px))` }}>
            <div className={`pokemon-${i}`} style={{ opacity: 0, position: "relative" }}>
              {hitSet.has(i) && (
                <motion.div style={{ position: "absolute", inset: -4, background: "white", borderRadius: 8, zIndex: 5, pointerEvents: "none" }}
                  initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} transition={{ duration: 0.35 }} />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.name} width={p.size} height={p.size}
                style={{ imageRendering: "pixelated", display: "block", filter: `drop-shadow(0 0 14px ${p.glow})` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Pokéball */}
      <Pokeball />

      {/* ── Logo + "Who's That?" banner + Genesis text ── */}
      <div className="absolute flex flex-col items-center justify-center" style={{ zIndex: 10, gap: "24px" }}>

        {/* "WHO'S THAT POKÉMON?" — site-consistent neobrutalism red banner */}
        <motion.div
          className="whos-that-text"
          style={{
            opacity: 0,
            fontFamily: "var(--font-gliker), sans-serif",
            fontSize: "clamp(1rem, 2.8vw, 2rem)",
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textAlign: "center",
            // Site brand red bg, black border (neobrutalism — matches the site's card/button style)
            background: "#DD273E",
            padding: "0.4em 1.4em",
            borderRadius: "8px",
            border: "3px solid #000000",
            boxShadow: "4px 4px 0 #000000",
            whiteSpace: "nowrap",
          }}
        >
          WHO&apos;S THAT POKÉMON?
        </motion.div>

        {/* Catalysis logo — ambient glow wrapper keeps the halo visible on the yellow bg */}
        <div
          style={{
            filter: whosThat
              ? "drop-shadow(0 0 28px rgba(221,39,62,0.75)) drop-shadow(0 0 55px rgba(221,39,62,0.3))"
              : "none",
            transition: "filter 0.4s ease",
          }}
        >
          <motion.div className="catalysis-logo" style={{ opacity: 0, filter: "brightness(0)" }}>
            <Image src="/catalysis.png" alt="Catalysis Logo" width={240} height={240} className="object-contain" priority />
          </motion.div>
        </div>

        {/* "It's CATALYSIS 4.0!" — anime-style reveal text, pops in with logo colour */}
        <motion.div
          className="reveal-text"
          style={{ opacity: 0, textAlign: "center", lineHeight: 1.2 }}
        >
          <span
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
              fontWeight: 700,
              color: "rgba(58,0,29,0.7)",
              display: "block",
            }}
          >
            It&apos;s...
          </span>
          <span
            style={{
              fontFamily: "var(--font-gliker), sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "#DD273E",
              letterSpacing: "0.06em",
              display: "block",
            }}
          >
            CATALYSIS 4.0!
          </span>
        </motion.div>

        {/* "WELCOME TO GENESIS" — clean white, site font */}
        <motion.h1
          className="genesis-text uppercase"
          style={{
            opacity: 0,
            fontFamily: "var(--font-gliker), sans-serif",
            fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "#1a0040",
            letterSpacing: "0.25em",
            textAlign: "center",
          }}
        >
          WELCOME TO CATALYSIS
        </motion.h1>

        {/* CTA — neobrutalism red button matching the site's primary CTA style */}
        {done && (
          <motion.a
            href="/"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -2, boxShadow: "4px 6px 0 #000000" }}
            whileTap={{ y: 2, boxShadow: "2px 2px 0 #000000" }}
            style={{
              fontFamily: "var(--font-nunito), sans-serif",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#ffffff",
              background: "#DD273E",
              padding: "0.6em 2em",
              borderRadius: "8px",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0 #000000",
              display: "inline-block",
              transition: "box-shadow 0.1s ease, transform 0.1s ease",
            }}
          >
            Enter the Arena →
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
