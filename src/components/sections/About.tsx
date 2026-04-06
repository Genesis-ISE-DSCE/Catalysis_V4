"use client";
import Image from "next/image";
import Container from "@/components/common/Container";
import { useInView } from "@/hooks/useInView";
import { useRouter } from "next/navigation";

interface BadgeProps {
  label: string;
  content: string;
  icon: string;
  primaryColor?: string;
  secondaryColor?: string;
  path?: string;
}

interface BadgeData extends BadgeProps {
  top: string;
  left: string;
}

interface LineData {
  src: string;
  top: string;
  left: string;
  widthRatio: number;
}

function Badge({
  label,
  content,
  icon,
  primaryColor = "#F08080",
  secondaryColor = "#C0392B",
  path ,
}: BadgeProps) {
  const router = useRouter();
  return (
    <div
      className="
        inline-flex items-center
        rounded-full
        overflow-visible
        bg-[#FAF5EC]
        border-2 border-black
        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]
        w-full
      "
      onClick={() => router.push("/rules/"+path)}
      style={{
        fontFamily: "inherit",
        padding: "clamp(3px, 0.6vw, 6px) clamp(8px, 2vw, 18px) clamp(3px, 0.6vw, 6px) clamp(3px, 0.6vw, 6px)",
        maxWidth: "clamp(140px, 28vw, 290px)",
        minWidth: "clamp(100px, 16vw, 150px)",
      }}
    >

      <div
        className="
          relative flex-shrink-0
          flex items-center justify-center
          rounded-full
          border-2 border-black
          aspect-square
        "
        style={{
          width: "clamp(28px, 5.5vw, 36px)",
          height: "clamp(28px, 5.5vw, 36px)",
          background: `radial-gradient(circle at 38% 38%, ${primaryColor}dd, ${primaryColor})`,
          boxShadow: `0 0 clamp(5px, 1vw, 10px) clamp(2px, 0.4vw, 4px) ${primaryColor}99,
                      0 0 clamp(10px, 2vw, 20px) clamp(2px, 0.5vw, 5px) ${primaryColor}44`,
          flexShrink: 0,
        }}
      >

        <div
          className="absolute inset-[3px] rounded-full border border-black/15"
          style={{
            background: `radial-gradient(circle at 33% 33%, ${primaryColor}66, ${secondaryColor}55)`,
          }}
        />

        <div className="relative z-10 w-[52%] h-[52%]">
          <Image
            src={icon}
            alt={label}
            fill
            sizes="(max-width: 640px) 28px, (max-width: 1024px) 42px, 58px"
            className="object-contain drop-shadow-sm"
          />
        </div>
      </div>

      <div
        className="flex flex-col justify-center leading-tight min-w-0"
        style={{
          paddingLeft: "clamp(4px, 1vw, 12px)",
          paddingRight: "clamp(2px, 0.5vw, 4px)",
        }}
      >
        <span
          className="font-bold text-black whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ fontSize: "clamp(8px, 1.5vw, 17px)" }}
        >
          {label}
        </span>
        <span
          className="text-black/40 font-semibold uppercase whitespace-nowrap overflow-hidden text-ellipsis"
          style={{
            fontSize: "clamp(5px, 0.9vw, 10px)",
            letterSpacing: "clamp(0.04em, 0.1vw, 0.12em)",
          }}
        >
          {content}
        </span>
      </div>
    </div>
  );
}

const MOBILE_BADGES: BadgeData[] = [
  { top: "5%",  left: "48%", label: "Pitch Wala",     content: "STRATEGY TYPE", icon: "/about2/pitch.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555", path: "/pitch-wala" },
  { top: "20%", left: "14%", label: "DSA Smackdown",  content: "PSYCHIC TYPE",  icon: "/about2/dsa.png",          primaryColor: "#4A9CC4", secondaryColor: "#2A6F9A", path: "/dsa-smackdown" },
  { top: "20%", left: "82%", label: "Clash Royale",   content: "BATTLE TYPE",   icon: "/about2/valorent.png",     primaryColor: "#5BBF6A", secondaryColor: "#2E8A3E", path: "/clash-royale" },
  { top: "50%", left: "14%", label: "Technoseek",     content: "ELECTRIC TYPE", icon: "/about2/technoseek.png",   primaryColor: "#A8CC55", secondaryColor: "#72981E", path: "/technoseek" },
  { top: "50%", left: "82%", label: "Typemaster",     content: "SPEED TYPE",    icon: "/about2/typemaster.png",   primaryColor: "#B86ED4", secondaryColor: "#8A3BAF", path: "/typemaster" },
  { top: "68%", left: "27%", label: "Code Relay",     content: "TEAM TYPE",     icon: "/about2/coding-relay.png", primaryColor: "#F5943A", secondaryColor: "#C8620E", path: "/code-relay" },
  { top: "68%", left: "68%", label: "Pitch Wala",     content: "CREATIVE TYPE", icon: "/about2/ui-ux.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555", path: "/pitch-wala" },
];

const BADGES: BadgeData[] = [
  { top: "11%", left: "45%", label: "Pitch Wala",      content: "STRATEGY TYPE", icon: "/about2/pitch.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555", path: "/pitch-wala" },
  { top: "24%", left: "25%", label: "DSA Smackdown",  content: "PSYCHIC TYPE",  icon: "/about2/dsa.png",          primaryColor: "#4A9CC4", secondaryColor: "#2A6F9A", path: "/dsa-smackdown" },
  { top: "24%", left: "78%", label: "Clash Royale",   content: "BATTLE TYPE",   icon: "/about2/valorent.png",     primaryColor: "#5BBF6A", secondaryColor: "#2E8A3E", path: "/clash-royale" },
  { top: "37%", left: "5%",  label: "Technoseek",     content: "ELECTRIC TYPE", icon: "/about2/technoseek.png",   primaryColor: "#A8CC55", secondaryColor: "#72981E", path: "/technoseek" },
  { top: "37%", left: "58%", label: "Typemaster",     content: "SPEED TYPE",    icon: "/about2/typemaster.png",   primaryColor: "#B86ED4", secondaryColor: "#8A3BAF", path: "/typemaster" },
  { top: "50%", left: "38%", label: "Code Relay",     content: "TEAM TYPE",     icon: "/about2/coding-relay.png", primaryColor: "#F5943A", secondaryColor: "#C8620E", path: "/code-relay" },
  { top: "63%", left: "58%", label: "Pitch Wala",     content: "CREATIVE TYPE", icon: "/about2/ui-ux.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555", path: "/pitch-wala" },
];

const LINES: LineData[] = [
  { src: "/about/Vector-1.png", top: "23%", left: "-35%", widthRatio: 0.55 },
  { src: "/about/Vector-2.png", top: "35%", left: "-30%", widthRatio: 0.51 },
  { src: "/about/Vector-3.png", top: "48%", left: "-30%", widthRatio: 0.37 },
  { src: "/about/Vector-4.png", top: "53%", left: "-30%", widthRatio: 0.53 },
  { src: "/about/Vector-5.png", top: "60%", left: "-35%", widthRatio: 0.61 },
];


const FLOAT_CLASSES: string[] = [
  "badge-float",
  "badge-float-rev",
  "badge-float-slow",
  "badge-float-slow-rev",
  "badge-float-fast",
  "badge-float-fast-rev",
  "badge-float-med",
];

function AboutMobile() {
  return (
    <div className="relative w-full h-[320px] flex items-center justify-center">

      <div className="absolute -mt-22 z-20">
        <Image
          src="/hero/Pokeball.png"
          alt="Central Pokeball"
          width={100}
          height={100}
          className="drop-shadow-xl h-auto"
          unoptimized
          priority
          quality={100}
        />
      </div>

      {MOBILE_BADGES.map((badge, i) => (
        <div
          key={i}
          className={`absolute z-30 ${FLOAT_CLASSES[i % FLOAT_CLASSES.length]}`}
          style={{
            top: badge.top,
            left: badge.left,
            transform: "translate(-50%, -50%)",
            width: "clamp(90px, 28vw, 130px)",
          }}
        >
          <Badge
            label={badge.label}
            content={badge.content}
            icon={badge.icon}
            primaryColor={badge.primaryColor}
            secondaryColor={badge.secondaryColor}
            path={badge.path}
          />
        </div>
      ))}
    </div>
  );
}

function AboutLeft() {
  return (
    <div className="flex flex-col items-start text-left z-10 px-4 md:px-0">

      <div className="mb-4 md:mb-6">
        <div className="inline-block border border-black rounded-full px-5 py-1.5 md:px-6 md:py-2 bg-white text-xs md:text-sm font-medium tracking-wide">
          ABOUT US
        </div>
      </div>

      <div className="mb-6 md:mb-10">
        <h1
          className="
            font-gliker
            font-medium
            text-[32px] sm:text-[40px] md:text-[46px]
            leading-[1.05]
            tracking-[-0.03em]
            text-[#3A001D]
          "
        >
          What is Catalysis?
        </h1>
      </div>

      <div className="space-y-4 md:space-y-6 text-[#3b0a1e] font-nunito text-[14px] md:text-[18px] leading-relaxed max-w-xl">
        <p>
          Catalysis is more than just an event. It&apos;s a platform built to spark
          innovation and push ideas into reality. Across two action-packed days,
          participants battle it out in six unique events spanning technical challenges,
          gaming, speed typing, and startup pitching.
        </p>
        <p>
          April 17 and 18 at DSCE Bangalore. Open to students from all branches.
          A space to learn, compete, collaborate, and grow.
        </p>
      </div>
    </div>
  );
}

function AboutRight() {
  const BADGE_W = 48;
  const BADGE_H_RATIO = 0.583;

  return (
    <div className="relative w-full" style={{ paddingTop: "120%" }}>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {LINES.map((line, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: line.top,
              left: line.left,
              width: `${line.widthRatio * 100}%`,
            }}
          >
            <Image
              src={line.src}
              alt="Decorative connection line"
              width={300}
              height={100}
              className="object-contain opacity-80 h-auto w-full"
            />
          </div>
        ))}
      </div>

      {BADGES.map((badge, i) => (
        <div
          key={i}
          className={`absolute z-20 mt-20 transition-transform hover:scale-105 ${FLOAT_CLASSES[i % FLOAT_CLASSES.length]}`}
          style={{
            top: badge.top,
            left: badge.left,
            width: `${BADGE_W}%`,
            paddingTop: `${BADGE_W * BADGE_H_RATIO}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="absolute inset-0">
            <Badge
              label={badge.label}
              content={badge.content}
              icon={badge.icon}
              primaryColor={badge.primaryColor}
              secondaryColor={badge.secondaryColor}
              path={badge.path}
            />
          </div>
        </div>
      ))}
    </div>
  );
}


export default function About() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const inView = isInView ? "in-view" : "";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#FFEEF0] py-2 md:py-1 overflow-hidden"
    >
      <Container>

        <div className="block md:hidden space-y-10">
          <div className={`reveal reveal-left ${inView}`}>
            <AboutLeft />
          </div>
          <div className={`reveal reveal-scale ${inView} reveal-delay-2`}>
            <AboutMobile />
          </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8 items-center">
          <div className={`col-span-1 reveal reveal-left ${inView}`}>
            <AboutLeft />
          </div>

          <div className={`flex justify-center z-20 reveal reveal-scale ${inView} reveal-delay-2`}>
            <Image
              src="/hero/Pokeball.png"
              alt="Large Central Pokeball"
              width={250}
              height={250}
              unoptimized
              priority
              quality={100}
              className="transition-transform hover:scale-105 drop-shadow-2xl h-auto w-full max-w-[120px] md:max-w-[180px] lg:max-w-[250px]"
            />
          </div>

          <div className={`col-span-1 mt-1 overflow-visible reveal reveal-right ${inView} reveal-delay-3`}>
            <AboutRight />
          </div>
        </div>
      </Container>

      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
    </section>
  );
}