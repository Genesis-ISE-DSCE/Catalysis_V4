"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "@/hooks/useInView";
import { useTheme } from "@/components/ui/ThemeProvider";

export interface TimelineEvent {
  day: 1 | 2;
  date: string;
  dayLabel: string;
  title: string;
  venue: string;
  timeFrom: string;
  timeTill: string;
  description: string | null;
  isEvent: boolean;
  isAllDay?: boolean;
  imagePath: string | null;
  panelColor: string;
  hasRegister: boolean;
  slug?: string;
  leftPct: number;
  widthPct: number;
}

const DAY_COLORS = ["#DD273E", "#2E8A3E"] as const;
const DAY_DARK   = ["#FF2D55", "#34C759"] as const;
const DAY_GLOW   = ["rgba(255,45,85,0.35)", "rgba(52,199,89,0.35)"] as const;

const timeline: TimelineEvent[] = [
  // ── Day 1 · FRIDAY 17/04 ──────────────────────────────────────────────────
  {
    day: 1, date: "17/04", dayLabel: "FRIDAY",
    title: "INAUGURATION", venue: "MAIN AUDITORIUM",
    timeFrom: "09:00", timeTill: "10:00",
    description: null,
    isEvent: false, imagePath: null, panelColor: "#FFF0F2", hasRegister: false,
    leftPct: 0, widthPct: 100,
  },
  {
    day: 1, date: "17/04", dayLabel: "FRIDAY",
    title: "IDEATHON", venue: "ROOM 205",
    timeFrom: "10:00", timeTill: "12:00",
    description: "Pitch your boldest tech idea to a panel of judges. Innovate, present, and dominate.",
    isEvent: true, imagePath: "/pokemons/jigglypuff.svg", panelColor: "#FFD6DC", hasRegister: true, slug: "pitchdexs",
    leftPct: 0, widthPct: 48,
  },
  {
    day: 1, date: "17/04", dayLabel: "FRIDAY",
    title: "TECHNOSEEK", venue: "CAMPUS-WIDE",
    timeFrom: "10:30", timeTill: "16:00",
    description: "Navigate mind-bending puzzles hidden across campus. First team to crack the final code wins.",
    isEvent: true, imagePath: "/pokemons/zoroark.svg", panelColor: "#FFE4EA", hasRegister: true, slug: "technoseek",
    leftPct: 52, widthPct: 48,
  },
  {
    day: 1, date: "17/04", dayLabel: "FRIDAY",
    title: "CLASH ROYALE", venue: "GAMING ZONE",
    timeFrom: "14:00", timeTill: "16:00",
    description: "Outmaneuver opponents in this fast-paced 1v1 card battle. Prove your deck mastery.",
    isEvent: true, imagePath: "/pokemons/arceus.svg", panelColor: "#FFD6DC", hasRegister: true, slug: "clash-royale",
    leftPct: 0, widthPct: 48,
  },
  // All-day event for Day 1
  {
    day: 1, date: "17/04", dayLabel: "FRIDAY",
    title: "TYPEMASTER", venue: "TBA",
    timeFrom: "10:00", timeTill: "16:00",
    description: "Type fast. Stay accurate. Only the swiftest survive.",
    isEvent: true, isAllDay: true, imagePath: "/pokemons/rayquaza.svg", panelColor: "#FFE4EA", hasRegister: true, slug: "typemaster",
    leftPct: 0, widthPct: 100,
  },

  // ── Day 2 · SATURDAY 18/04 ────────────────────────────────────────────────
  {
    day: 2, date: "18/04", dayLabel: "SATURDAY",
    title: "DSA SMACKDOWN", venue: "ROOM 205",
    timeFrom: "10:00", timeTill: "12:00",
    description: "Crack algorithms under a strict time limit. Efficiency is your only ally.",
    isEvent: true, imagePath: "/pokemons/alakazam.svg", panelColor: "#D6F0DC", hasRegister: true, slug: "dsa-smackdown",
    leftPct: 0, widthPct: 100,
  },
  {
    day: 2, date: "18/04", dayLabel: "SATURDAY",
    title: "CODE RELAY", venue: "DEV ARENA",
    timeFrom: "12:15", timeTill: "14:00",
    description: "Tag-team coding under pressure. Pass the keyboard and never break the chain.",
    isEvent: true, imagePath: "/pokemons/ditto.svg", panelColor: "#DAEEDD", hasRegister: true, slug: "code-relay",
    leftPct: 0, widthPct: 48,
  },
  {
    day: 2, date: "18/04", dayLabel: "SATURDAY",
    title: "PROMPT WARS", venue: "ROOM 206",
    timeFrom: "14:00", timeTill: "15:00",
    description: "Craft the perfect prompt. Engineer creative, precise, and powerful AI responses to win.",
    isEvent: true, imagePath: "/pokemons/chatot.png", panelColor: "#D6F0DC", hasRegister: true, slug: "prompt-wars",
    leftPct: 52, widthPct: 48,
  },
  {
    day: 2, date: "18/04", dayLabel: "SATURDAY",
    title: "PRIZE DISTRIBUTION", venue: "MAIN AUDITORIUM",
    timeFrom: "15:00", timeTill: "16:30",
    description: null,
    isEvent: false, imagePath: null, panelColor: "#EEF8F0", hasRegister: false,
    leftPct: 52, widthPct: 48,
  },
  // All-day event for Day 2
  {
    day: 2, date: "18/04", dayLabel: "SATURDAY",
    title: "TYPEMASTER", venue: "TBA",
    timeFrom: "09:00", timeTill: "16:30",
    description: "Type fast. Stay accurate. Only the swiftest survive.",
    isEvent: true, isAllDay: true, imagePath: "/pokemons/rayquaza.svg", panelColor: "#D6F0DC", hasRegister: true, slug: "typemaster",
    leftPct: 0, widthPct: 100,
  },
];

const START_MIN = 9 * 60;
const END_MIN   = 16 * 60 + 30;
const SPAN      = END_MIN - START_MIN;

const TIME_TICKS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30",
];

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function topPct(time: string): string {
  return `${((toMin(time) - START_MIN) / SPAN) * 100}%`;
}
function heightPct(from: string, till: string): string {
  return `${((toMin(till) - toMin(from)) / SPAN) * 100}%`;
}

// ── All-Day Banner ─────────────────────────────────────────────────────────────
function AllDayBanner({ day, isDark }: { day: 1 | 2; isDark: boolean }) {
  const router = useRouter();
  const allDayEvents = timeline.filter((e) => e.day === day && e.isAllDay);
  const accent = isDark ? DAY_DARK[day - 1] : DAY_COLORS[day - 1];
  const glow   = DAY_GLOW[day - 1];

  if (allDayEvents.length === 0) return <div className="mb-3" style={{ height: 52 }} />;

  return (
    <div className="flex flex-col gap-2 mb-3">
      {allDayEvents.map((event, i) => (
        <div
          key={i}
          className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-xl"
          style={{
            height: 52,
            background: isDark
              ? `linear-gradient(135deg, ${accent}18 0%, ${accent}08 100%)`
              : `${accent}15`,
            border: `1.5px dashed ${isDark ? `${accent}60` : `${accent}80`}`,
            boxShadow: isDark ? `0 0 12px ${glow}` : "none",
          }}
        >
          {/* Icon */}
          {event.imagePath && (
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image
                src={event.imagePath}
                alt={event.title}
                fill
                sizes="28px"
                className="object-contain"
                style={isDark ? { filter: `drop-shadow(0 0 4px ${accent}80)` } : {}}
              />
            </div>
          )}

          {/* Label */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`font-black text-[12px] sm:text-[13px] leading-none ${isDark ? "text-white" : "text-[#3A001D]"}`}>
                {event.title}
              </p>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: isDark ? `${accent}25` : `${accent}20`,
                  color: isDark ? accent : accent,
                  border: `1px solid ${isDark ? `${accent}50` : `${accent}60`}`,
                }}
              >
                ALL DAY
              </span>
            </div>
            <p className={`text-[9px] font-semibold tracking-widest uppercase mt-0.5 ${isDark ? "text-white/30" : "text-black/40"}`}>
              {event.timeFrom}–{event.timeTill}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => router.push("/register")}
              className="text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border-2 transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: accent,
                borderColor: isDark ? accent : "#000",
                boxShadow: isDark ? `0 0 8px ${glow}` : "1px 1px 0 rgba(0,0,0,0.2)",
              }}
            >
              Register
            </button>
            {event.slug && (
              <Link
                href={`/rules/${event.slug}`}
                className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition-all hover:scale-105 active:scale-95 flex items-center gap-0.5 group ${
                  isDark ? "text-white/60 hover:text-white" : "text-black/70 hover:text-black bg-white"
                }`}
                style={{ borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.25)" }}
              >
                Details
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ item, delay = 0, isDark }: { item: TimelineEvent; delay?: number; isDark: boolean }) {
  const router = useRouter();
  const dayIdx = item.day - 1;
  const accent      = isDark ? DAY_DARK[dayIdx] : DAY_COLORS[dayIdx];
  const accentGlow  = DAY_GLOW[dayIdx];

  const cardStyle = isDark
    ? {
        background: item.isEvent
          ? "linear-gradient(140deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)"
          : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${item.isEvent ? accent : "rgba(255,255,255,0.07)"}`,
        boxShadow: item.isEvent ? `0 0 18px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.07)` : "none",
        backdropFilter: "blur(10px)",
      }
    : {
        backgroundColor: item.panelColor,
        border: item.isEvent ? "2px solid #000" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: item.isEvent ? "2px 2px 0 rgba(0,0,0,0.10)" : "none",
      };

  return (
    <div
      className={`h-full w-full rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        item.isEvent ? "hover:-translate-y-0.5 hover:scale-[1.01]" : ""
      }`}
      style={{ padding: "10px 12px", animationDelay: `${delay}ms`, ...cardStyle }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-1 mb-1">
        {item.imagePath ? (
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
            <Image
              src={item.imagePath}
              alt={item.title}
              fill
              sizes="32px"
              className="object-contain"
              style={isDark ? { filter: `drop-shadow(0 0 5px ${accent}80)` } : { filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
            />
          </div>
        ) : (
          <div
            className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: accent,
              opacity: 0.45,
              boxShadow: isDark ? `0 0 6px ${accent}` : "none",
            }}
          />
        )}
        <p
          className="text-[9px] sm:text-[10px] font-bold tracking-wider shrink-0 leading-none"
          style={{ color: item.isEvent ? (isDark ? `${accent}CC` : accent) : (isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.35)") }}
        >
          {item.timeFrom}–{item.timeTill}
        </p>
      </div>

      {/* Title */}
      <p
        className={`font-black leading-tight tracking-tight ${
          item.isEvent
            ? `text-[12px] sm:text-[13px] ${isDark ? "text-white" : "text-[#3A001D]"}`
            : `text-[11px] ${isDark ? "text-white/35" : "text-black/50"}`
        }`}
      >
        {item.title}
      </p>


      {/* Description */}
      {item.description && (
        <p className={`text-[9px] sm:text-[10px] leading-snug mt-1 line-clamp-2 flex-1 ${isDark ? "text-white/40" : "text-black/55"}`}>
          {item.description}
        </p>
      )}

      {/* Actions */}
      {(item.hasRegister || item.slug) && (
        <div className="flex items-center gap-1.5 mt-auto pt-1.5 flex-wrap">
          {item.hasRegister && (
            <button
              onClick={() => router.push("/register")}
              className="text-white text-[10px] sm:text-[15px] cursor-pointer font-black uppercase tracking-wider px-3 py-0.5 sm:py-1 rounded-full border-2 transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
              style={{
                backgroundColor: accent,
                borderColor: isDark ? accent : "#000",
                boxShadow: isDark ? `0 0 10px ${accentGlow}` : "2px 2px 0 rgba(0,0,0,0.2)",
              }}
            >
              Register
            </button>
          )}
          {item.slug && (
            <Link
              href={`/rules/${item.slug}`}
              className={`text-[10px] sm:text-[15px] font-bold px-3 py-0.5 sm:py-1 rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-0.5 group flex-shrink-0 ${
                isDark ? "text-white/60 hover:text-white" : "text-black/70 hover:text-black bg-white"
              }`}
              style={{ borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.25)" }}
            >
              Details
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ── Y-Axis ────────────────────────────────────────────────────────────────────
function YAxis({ height, isDark }: { height: number; isDark: boolean }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 58, height }}>
      {TIME_TICKS.map((tick) => (
        <div key={tick} className="absolute right-2 flex items-center gap-1.5 -translate-y-1/2" style={{ top: topPct(tick) }}>
          <div
            className="w-1 h-1 rounded-full flex-shrink-0"
            style={{
              background: isDark ? "rgba(167,139,250,0.5)" : "rgba(0,0,0,0.2)",
              boxShadow: isDark ? "0 0 4px rgba(167,139,250,0.4)" : "none",
            }}
          />
          <span
            className="text-[10px] font-medium whitespace-nowrap"
            style={{ color: isDark ? "rgba(167,139,250,0.55)" : "rgba(0,0,0,0.4)" }}
          >
            {tick}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Desktop ───────────────────────────────────────────────────────────────────
const HEADER_H  = 68;
const ALLDAY_H  = 52;  // height reserved for the all-day strip
const GRID_GAP  = 12;  // gap (px) between header→allday and allday→grid
const BEFORE_GRID = HEADER_H + GRID_GAP + ALLDAY_H + GRID_GAP; // = 144
const GRID_H    = 1200;

function DesktopTimeline({ isDark }: { isDark: boolean }) {
  const days = [1, 2] as const;

  return (
    <div className="hidden lg:flex gap-0 w-full">
      <div style={{ paddingTop: BEFORE_GRID }}>
        <YAxis height={GRID_H} isDark={isDark} />
      </div>

      {/* Axis separator */}
      <div
        className="flex-shrink-0 w-px"
        style={{
          marginTop: BEFORE_GRID,
          height: GRID_H,
          background: isDark
            ? "linear-gradient(to bottom, transparent, rgba(124,58,237,0.5) 15%, rgba(124,58,237,0.3) 85%, transparent)"
            : "repeating-linear-gradient(to bottom,#CBD5E1 0,#CBD5E1 5px,transparent 5px,transparent 11px)",
        }}
      />

      <div className="grid grid-cols-2 gap-4 flex-1 pl-4">
        {days.map((day) => {
          const allEvents   = timeline.filter((e) => e.day === day);
          const timedEvents = allEvents.filter((e) => !e.isAllDay);
          const sample      = allEvents[0];
          const color       = isDark ? DAY_DARK[day - 1] : DAY_COLORS[day - 1];
          const glow        = DAY_GLOW[day - 1];

          return (
            <div key={day} className="flex flex-col">
              {/* Day header */}
              <div
                className="rounded-2xl flex items-center justify-between px-5 flex-shrink-0"
                style={{
                  height: HEADER_H,
                  marginBottom: GRID_GAP,
                  background: isDark
                    ? `linear-gradient(135deg, ${color}20 0%, ${color}06 100%)`
                    : color,
                  border: isDark ? `2px solid ${color}` : "2px solid #000",
                  boxShadow: isDark
                    ? `0 0 24px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : "3px 3px 0 rgba(0,0,0,1)",
                }}
              >
                <div>
                  <p
                    className="text-[10px] font-bold tracking-[0.25em] uppercase leading-none mb-1"
                    style={{ color: isDark ? `${color}BB` : "rgba(255,255,255,0.8)" }}
                  >
                    {sample?.dayLabel} · DAY {day}
                  </p>
                  <p className="font-black text-2xl leading-none tracking-tight" style={{ color: "white" }}>
                    {sample?.date}
                  </p>
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-black text-lg"
                  style={{
                    background: isDark ? `${color}20` : "rgba(255,255,255,0.2)",
                    border: `1.5px solid ${isDark ? `${color}50` : "rgba(255,255,255,0.4)"}`,
                    color: isDark ? `${color}90` : "white",
                    boxShadow: isDark ? `0 0 12px ${glow}` : "none",
                  }}
                >
                  {day}
                </div>
              </div>

              {/* All-day strip */}
              <AllDayBanner day={day} isDark={isDark} />

              {/* Timed grid */}
              <div className="relative" style={{ height: GRID_H }}>
                {TIME_TICKS.map((tick) => (
                  <div
                    key={tick}
                    className="absolute left-0 right-0"
                    style={{
                      top: topPct(tick),
                      borderTop: isDark ? "1px solid rgba(124,58,237,0.1)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  />
                ))}
                {timedEvents.map((item, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      top: topPct(item.timeFrom),
                      height: heightPct(item.timeFrom, item.timeTill),
                      left: `${item.leftPct}%`,
                      width: `${item.widthPct}%`,
                      minHeight: item.isEvent ? 128 : 44,
                      paddingBottom: 4,
                      paddingRight: item.widthPct < 100 ? 3 : 0,
                    }}
                  >
                    <EventCard item={item} isDark={isDark} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Mobile ────────────────────────────────────────────────────────────────────
const MOBILE_GRID_H = 1100;

function MobileTimeline({ isDark }: { isDark: boolean }) {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [fade, setFade] = useState(true);
  const days: (1 | 2)[] = [1, 2];
  const allEvents   = timeline.filter((e) => e.day === activeDay);
  const timedEvents = allEvents.filter((e) => !e.isAllDay);
  const color       = isDark ? DAY_DARK[activeDay - 1] : DAY_COLORS[activeDay - 1];

  const switchDay = (day: 1 | 2) => {
    if (day === activeDay) return;
    setFade(false);
    setTimeout(() => { setActiveDay(day); setFade(true); }, 200);
  };

  const dayMeta = [
    { label: "Day 1", sub: "Fri · 17/04" },
    { label: "Day 2", sub: "Sat · 18/04" },
  ];

  return (
    <div className="lg:hidden w-full">
      {/* Day tabs */}
      <div className="flex gap-3 mb-4">
        {days.map((day, i) => {
          const dc = isDark ? DAY_DARK[i] : DAY_COLORS[i];
          return (
            <button
              key={day}
              onClick={() => switchDay(day)}
              className="flex-1 py-3 px-4 rounded-2xl border-2 transition-all duration-200 text-left"
              style={
                activeDay === day
                  ? {
                      background: isDark ? `${dc}18` : dc,
                      borderColor: isDark ? dc : "#000",
                      boxShadow: isDark ? `0 0 18px ${DAY_GLOW[i]}` : "3px 3px 0 rgba(0,0,0,1)",
                    }
                  : {
                      background: isDark ? "rgba(255,255,255,0.04)" : "white",
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)",
                    }
              }
            >
              <p className={`font-black text-sm leading-none mb-0.5 ${activeDay === day ? "text-white" : (isDark ? "text-white/60" : "text-black/50")}`}>
                {dayMeta[i].label}
              </p>
              <p
                className="text-[11px] font-semibold"
                style={{ color: activeDay === day ? (isDark ? dc : "rgba(255,255,255,0.85)") : (isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)") }}
              >
                {dayMeta[i].sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* All-day strip for active day */}
      <div
        className="transition-opacity duration-200 ease-in-out mb-4"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <AllDayBanner day={activeDay} isDark={isDark} />
      </div>

      {/* Timed grid */}
      <div className="flex gap-0 transition-opacity duration-200 ease-in-out" style={{ opacity: fade ? 1 : 0 }}>
        <YAxis height={MOBILE_GRID_H} isDark={isDark} />
        <div
          className="flex-shrink-0 w-px"
          style={{
            height: MOBILE_GRID_H,
            background: isDark
              ? `linear-gradient(to bottom, transparent 0%, ${color}60 15%, ${color}40 85%, transparent 100%)`
              : "repeating-linear-gradient(to bottom,#CBD5E1 0,#CBD5E1 5px,transparent 5px,transparent 11px)",
          }}
        />
        <div className="relative flex-1 pl-3" style={{ height: MOBILE_GRID_H }}>
          {TIME_TICKS.map((tick) => (
            <div
              key={tick}
              className="absolute left-0 right-0"
              style={{
                top: topPct(tick),
                borderTop: isDark ? "1px solid rgba(124,58,237,0.1)" : "1px solid rgba(0,0,0,0.06)",
              }}
            />
          ))}
          {timedEvents.map((item, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: topPct(item.timeFrom),
                height: heightPct(item.timeFrom, item.timeTill),
                left: `${item.leftPct}%`,
                width: `${item.widthPct}%`,
                minHeight: item.isEvent ? 116 : 40,
                paddingBottom: 4,
                paddingRight: item.widthPct < 100 ? 3 : 0,
              }}
            >
              <EventCard item={item} delay={i * 60} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Timeline() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.06 });
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const inView = isInView ? "in-view" : "";

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="py-20 relative overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, #0A0018 0%, #0F0022 50%, #0A0018 100%)"
          : "#FFEEF0",
      }}
    >
      {/* Dark mode ambient glow */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(255,45,85,0.05) 0%, transparent 70%), " +
              "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(52,199,89,0.05) 0%, transparent 70%)",
          }}
        />
      )}

      <Container>
        {/* Section header */}
        <div className={`mb-8 reveal reveal-up ${inView}`}>
          <div
            className="inline-block rounded-full px-5 py-1.5 text-xs font-bold tracking-widest mb-4 uppercase"
            style={
              isDark
                ? { border: "1px solid rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.08)", color: "rgba(167,139,250,0.8)" }
                : { border: "1px solid #000", background: "white", color: "#3A001D" }
            }
          >
            Schedule
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1
              className="font-gliker font-medium text-[34px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.005em] max-w-[560px]"
              style={{ color: isDark ? "white" : "#3A001D" }}
            >
              Stay on track,{" "}
              {isDark ? (
                <span style={{ background: "linear-gradient(90deg, #FF2D55, #FF9500)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Trainer
                </span>
              ) : (
                <span style={{ color: "#DD273E" }}>Trainer</span>
              )}
            </h1>
            <p className={`font-nunito text-sm md:text-base leading-relaxed max-w-xs md:text-right mb-1 ${isDark ? "text-white/40" : "text-[#3b0a1e]"}`}>
              Two days of challenges. Pick your arena and rise to the top.
            </p>
          </div>
        </div>

        {/* Day legend pills */}
        <div className={`flex gap-3 mb-6 flex-wrap reveal reveal-up ${inView} reveal-delay-1`}>
          {(["Day 1 · Fri 17/04", "Day 2 · Sat 18/04"] as const).map((label, i) => {
            const c = isDark ? DAY_DARK[i] : DAY_COLORS[i];
            return (
              <span
                key={i}
                className="text-white text-xs font-bold px-4 py-1.5 rounded-full border-2"
                style={{
                  borderColor: isDark ? c : "#000",
                  background: isDark ? `${c}18` : c,
                  boxShadow: isDark ? `0 0 12px ${DAY_GLOW[i]}` : "2px 2px 0 rgba(0,0,0,1)",
                }}
              >
                {label}
              </span>
            );
          })}
        </div>

        {/* Timeline grid */}
        <div className={`w-full reveal reveal-up ${inView} reveal-delay-2`}>
          <MobileTimeline isDark={isDark} />
          <DesktopTimeline isDark={isDark} />
        </div>
      </Container>
    </section>
  );
}
