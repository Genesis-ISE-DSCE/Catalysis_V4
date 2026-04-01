import Image from "next/image";
import Container from "@/components/common/Container";

// ── Types ─────────────────────────────────────────────────────────────────────

interface BadgeProps {
  label: string;
  content: string;
  icon: string;
  primaryColor?: string;
  secondaryColor?: string;
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
}: BadgeProps) {
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
      style={{
        fontFamily: "inherit",
        /* Padding scales with viewport: tight on mobile, roomy on desktop */
        padding: "clamp(3px, 0.6vw, 6px) clamp(8px, 2vw, 18px) clamp(3px, 0.6vw, 6px) clamp(3px, 0.6vw, 6px)",
        maxWidth: "clamp(140px, 28vw, 290px)",
        minWidth: "clamp(100px, 16vw, 150px)",
      }}
    >
      {/* Circle icon */}
      <div
        className="
          relative flex-shrink-0
          flex items-center justify-center
          rounded-full
          border-2 border-black
          aspect-square
        "
        style={{
          /* Circle shrinks on small screens, grows on large */
          width: "clamp(28px, 5.5vw, 36px)",
          height: "clamp(28px, 5.5vw, 36px)",
          background: `radial-gradient(circle at 38% 38%, ${primaryColor}dd, ${primaryColor})`,
          boxShadow: `0 0 clamp(5px, 1vw, 10px) clamp(2px, 0.4vw, 4px) ${primaryColor}99,
                      0 0 clamp(10px, 2vw, 20px) clamp(2px, 0.5vw, 5px) ${primaryColor}44`,
          flexShrink: 0,
        }}
      >
        {/* Inner decorative ring */}
        <div
          className="absolute inset-[3px] rounded-full border border-black/15"
          style={{
            background: `radial-gradient(circle at 33% 33%, ${primaryColor}66, ${secondaryColor}55)`,
          }}
        />

        {/* Icon image */}
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

      {/* Text */}
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
// ── Badge data ────────────────────────────────────────────────────────────────

const MOBILE_BADGES: BadgeData[] = [
  { top: "5%",  left: "46%", label: "Pitch",        content: "STRATEGY TYPE", icon: "/about2/pitch.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555" },
  { top: "20%", left: "10%", label: "DSA",           content: "PSYCHIC TYPE",  icon: "/about2/dsa.png",          primaryColor: "#4A9CC4", secondaryColor: "#2A6F9A" },
  { top: "20%", left: "82%", label: "Valorant",      content: "BATTLE TYPE",   icon: "/about2/valorent.png",     primaryColor: "#5BBF6A", secondaryColor: "#2E8A3E" },
  { top: "50%", left: "10%", label: "Technoseek",    content: "ELECTRIC TYPE", icon: "/about2/technoseek.png",   primaryColor: "#A8CC55", secondaryColor: "#72981E" },
  { top: "50%", left: "82%", label: "Typemaster",    content: "SPEED TYPE",    icon: "/about2/typemaster.png",   primaryColor: "#B86ED4", secondaryColor: "#8A3BAF" },
  { top: "68%", left: "25%", label: "Coding Relay",  content: "TEAM TYPE",     icon: "/about2/coding-relay.png", primaryColor: "#F5943A", secondaryColor: "#C8620E" },
  { top: "68%", left: "68%", label: "UI/UX Design",  content: "CREATIVE TYPE", icon: "/about2/ui-ux.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555" },
];

const BADGES: BadgeData[] = [
  { top: "11%", left: "45%", label: "Pitch",        content: "STRATEGY TYPE", icon: "/about2/pitch.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555" },
  { top: "24%", left: "25%", label: "DSA",           content: "PSYCHIC TYPE",  icon: "/about2/dsa.png",          primaryColor: "#4A9CC4", secondaryColor: "#2A6F9A" },
  { top: "24%", left: "78%", label: "Valorant",      content: "BATTLE TYPE",   icon: "/about2/valorent.png",     primaryColor: "#5BBF6A", secondaryColor: "#2E8A3E" },
  { top: "37%", left: "5%",  label: "Technoseek",    content: "ELECTRIC TYPE", icon: "/about2/technoseek.png",   primaryColor: "#A8CC55", secondaryColor: "#72981E" },
  { top: "37%", left: "58%", label: "Typemaster",    content: "SPEED TYPE",    icon: "/about2/typemaster.png",   primaryColor: "#B86ED4", secondaryColor: "#8A3BAF" },
  { top: "50%", left: "38%", label: "Coding Relay",  content: "TEAM TYPE",     icon: "/about2/coding-relay.png", primaryColor: "#F5943A", secondaryColor: "#C8620E" },
  { top: "63%", left: "58%", label: "UI/UX Design",  content: "CREATIVE TYPE", icon: "/about2/ui-ux.png",        primaryColor: "#F28B8B", secondaryColor: "#E05555" },
];

const LINES: LineData[] = [
  { src: "/about/Vector-1.png", top: "23%", left: "-35%", widthRatio: 0.55 },
  { src: "/about/Vector-2.png", top: "35%", left: "-30%", widthRatio: 0.51 },
  { src: "/about/Vector-3.png", top: "48%", left: "-30%", widthRatio: 0.37 },
  { src: "/about/Vector-4.png", top: "53%", left: "-30%", widthRatio: 0.53 },
  { src: "/about/Vector-5.png", top: "60%", left: "-35%", widthRatio: 0.61 },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function AboutMobile() {
  return (
    <div className="relative w-full h-[320px] flex items-center justify-center">
      {/* Central Pokeball */}
      <div className="absolute -mt-22 z-20">
        <Image
          src="/hero/Pokeball.png"
          alt="Central Pokeball"
          width={100}
          height={100}
          className="drop-shadow-xl h-auto"
        />
      </div>

      {MOBILE_BADGES.map((badge, i) => (
        <div
          key={i}
          className="absolute z-30"
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
          />
        </div>
      ))}
    </div>
  );
}

function AboutLeft() {
  return (
    <div className="flex flex-col items-start text-left z-10 px-4 md:px-0">
      {/* ABOUT US pill */}
      <div className="mb-4 md:mb-6">
        <div className="inline-block border border-black rounded-full px-5 py-1.5 md:px-6 md:py-2 bg-white text-xs md:text-sm font-medium tracking-wide">
          ABOUT US
        </div>
      </div>

      {/* Heading */}
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

      {/* Paragraphs */}
      <div className="space-y-4 md:space-y-6 text-[#3b0a1e] font-nunito text-[14px] md:text-[18px] leading-relaxed max-w-xl">
        <p>
          Catalysis is not just an event, it&apos;s a platform designed to spark
          innovation and accelerate ideas into reality. Over the course of three
          days, participants will engage in multiple events ranging from technical
          challenges to creative competitions.
        </p>
        <p>
          Catalysis offers something for everyone. It&apos;s a space to learn,
          compete, collaborate, and grow.
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
      {/* Decorative lines */}
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

      {/* Badges */}
      {BADGES.map((badge, i) => (
        <div
          key={i}
          className="absolute z-20 mt-20 transition-transform hover:scale-105"
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
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page section ──────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#FFEEF0] py-2 md:py-1 overflow-hidden"
    >
      <Container>
        {/* Mobile */}
        <div className="block md:hidden space-y-10">
          <AboutLeft />
          <AboutMobile />
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-center">
          <div className="col-span-1">
            <AboutLeft />
          </div>

          <div className="flex justify-center z-20">
            <Image
              src="/hero/Pokeball.png"
              alt="Large Central Pokeball"
              width={250}
              height={250}
              className="transition-transform hover:scale-105 drop-shadow-2xl h-auto w-full max-w-[120px] md:max-w-[180px] lg:max-w-[250px]"
            />
          </div>

          <div className="col-span-1 mt-1 overflow-visible">
            <AboutRight />
          </div>
        </div>
      </Container>

      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
    </section>
  );
}