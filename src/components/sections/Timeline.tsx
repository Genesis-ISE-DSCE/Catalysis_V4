"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "@/hooks/useInView";

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
  imagePath: string | null;
  panelColor: string;
  hasRegister: boolean;
  slug?: string;
}

const timeline: TimelineEvent[] = [
  { day: 1, date: "17/04", dayLabel: "THURSDAY", title: "OPENING CEREMONY",  venue: "MAIN AUDITORIUM",       timeFrom: "09:00", timeTill: "10:00", description: null,                                                                                           isEvent: false, imagePath: null,                       panelColor: "#FFF0F2", hasRegister: false },
  { day: 1, date: "17/04", dayLabel: "THURSDAY", title: "TECHNOSEEK",        venue: "ROOM 205",              timeFrom: "10:15", timeTill: "12:30", description: "Navigate mind-bending puzzles hidden across campus. First team to crack the final code wins.",   isEvent: true,  imagePath: "/pokemons/zoroark.svg",    panelColor: "#FFD6DC", hasRegister: true,  slug: "technoseek"    },
  { day: 1, date: "17/04", dayLabel: "THURSDAY", title: "LUNCH BREAK",       venue: "MAIN AUDITORIUM",       timeFrom: "12:30", timeTill: "13:30", description: null,                                                                                           isEvent: false, imagePath: null,                       panelColor: "#FFF0F2", hasRegister: false },
  { day: 1, date: "17/04", dayLabel: "THURSDAY", title: "CODING RELAY",      venue: "DEV ARENA",             timeFrom: "13:30", timeTill: "15:30", description: "Tag-team coding under pressure. Pass the keyboard and never break the chain.",                 isEvent: true,  imagePath: "/pokemons/ditto.svg",      panelColor: "#FFE4EA", hasRegister: true,  slug: "code-relay"    },
  { day: 1, date: "17/04", dayLabel: "THURSDAY", title: "BREAK",             venue: "MAIN AUDITORIUM",       timeFrom: "15:30", timeTill: "16:30", description: null,                                                                                           isEvent: false, imagePath: null,                       panelColor: "#FFF0F2", hasRegister: false },

  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "DSA SMACKDOWN",     venue: "ROOM 205",              timeFrom: "09:30", timeTill: "11:30", description: "Crack algorithms under a strict time limit. Efficiency is your only ally.",                     isEvent: true,  imagePath: "/pokemons/alakazam.svg",   panelColor: "#D6F0DC", hasRegister: true,  slug: "dsa-smackdown" },
  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "TYPEMASTER",        venue: "ROOM 205",              timeFrom: "11:30", timeTill: "12:30", description: "Type fast. Stay accurate. Only the swiftest and most precise will survive.",                   isEvent: true,  imagePath: "/pokemons/rayquaza.svg",   panelColor: "#DAEEDD", hasRegister: true,  slug: "typemaster"    },
  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "LUNCH BREAK",       venue: "MAIN AUDITORIUM",       timeFrom: "12:30", timeTill: "13:30", description: null,                                                                                           isEvent: false, imagePath: null,                       panelColor: "#EEF8F0", hasRegister: false },
  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "CLASH ROYALE",      venue: "ROOM 205",              timeFrom: "13:30", timeTill: "14:30", description: "Outmaneuver opponents in this fast-paced 1v1 card battle. Prove your deck mastery.",           isEvent: true,  imagePath: "/pokemons/arceus.svg",     panelColor: "#D8ECDA", hasRegister: true,  slug: "clash-royale"  },
  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "PITCH PERFECT",     venue: "ROOM 205",              timeFrom: "14:30", timeTill: "15:30", description: "Present your startup idea to judges. Impress with innovation, feasibility, and delivery.",     isEvent: true,  imagePath: "/pokemons/jigglypuff.svg", panelColor: "#D4ECD7", hasRegister: true,  slug: "pitch-wala"    },
  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "PRIZE DISTRIBUTION", venue: "MAIN AUDITORIUM",      timeFrom: "15:30", timeTill: "16:00", description: null,                                                                                           isEvent: false, imagePath: null,                       panelColor: "#EEF8F0", hasRegister: false },
  { day: 2, date: "18/04", dayLabel: "FRIDAY",   title: "CLOSING CEREMONY",  venue: "MAIN AUDITORIUM",       timeFrom: "16:00", timeTill: "16:30", description: null,                                                                                           isEvent: false, imagePath: null,                       panelColor: "#EEF8F0", hasRegister: false },
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

function EventCard({ item, delay = 0 }: { item: TimelineEvent; delay?: number }) {
  const router = useRouter();
  const accentColor = item.day === 1 ? "#DD273E" : "#2E8A3E";

  return (
    <div
      className={`h-full w-full rounded-2xl flex flex-col p-1.5 sm:p-2.5 overflow-hidden transition-all duration-300 ${
        item.isEvent
          ? "border-2 border-black hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.18)] hover:-translate-y-0.5"
          : "border border-black/10"
      }`}
      style={{
        backgroundColor: item.panelColor,
        boxShadow: item.isEvent ? "2px 2px 0 0 rgba(0,0,0,0.10)" : "none",
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Icon */}
      {item.imagePath ? (
        <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mb-0.5 sm:mb-1">
          <Image src={item.imagePath} alt={item.title} fill sizes="32px" className="object-contain drop-shadow-sm" />
        </div>
      ) : (
        <div className="w-2 h-2 rounded-full flex-shrink-0 mb-1 mt-0.5" style={{ backgroundColor: accentColor, opacity: 0.35 }} />
      )}

      <p className={`font-black leading-tight tracking-tight ${item.isEvent ? "text-[12px] sm:text-[13px] text-[#3A001D]" : "text-[11px] text-black/50"}`}>
        {item.title}
      </p>

      <p className="text-[9px] font-semibold tracking-wider uppercase leading-none mt-0.5 text-black/40">
        {item.venue}
      </p>

      <p className="text-[10px] font-bold mt-0.5 sm:mt-1" style={{ color: item.isEvent ? accentColor : "#9CA3AF" }}>
        {item.timeFrom} - {item.timeTill}
      </p>

      {item.description && (
        <p className="text-[9px] sm:text-[10px] text-black/55 leading-snug mt-0.5 sm:mt-1 line-clamp-2 flex-1">
          {item.description}
        </p>
      )}

      {(item.hasRegister || item.slug) && (
        <div className="flex items-center gap-1 sm:gap-2 mt-auto pt-1 sm:pt-2 flex-wrap">
          {item.hasRegister && (
            <button
              onClick={() => router.push("/register")}
              className="text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-5 py-0.5 sm:py-2 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:scale-110 hover:bg-green-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 active:shadow-none flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              Register
            </button>
          )}
          {item.slug && (
            <Link
              href={`/rules/${item.slug}`}
              className="bg-white text-black text-[8px] sm:text-[10px] font-bold px-2 sm:px-5 py-0.5 sm:py-2 rounded-full border-2 border-black transition-all duration-200 hover:scale-110 hover:bg-[#E3242B] hover:text-white active:scale-95 flex items-center gap-0.5 sm:gap-1 flex-shrink-0 group"
            >
              Details
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function YAxis({ height }: { height: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 52, height }}>
      {TIME_TICKS.map((tick) => (
        <div
          key={tick}
          className="absolute right-3 -translate-y-1/2"
          style={{ top: topPct(tick) }}
        >
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{tick}</span>
        </div>
      ))}
    </div>
  );
}

function DashedLine({ height }: { height: number }) {
  return (
    <div
      className="flex-shrink-0 w-px"
      style={{
        height,
        backgroundImage: "repeating-linear-gradient(to bottom,#CBD5E1 0,#CBD5E1 5px,transparent 5px,transparent 11px)",
      }}
    />
  );
}

const HEADER_H = 52;
const GRID_H   = 1200;

// Day accent colors
const DAY_COLORS = ["#DD273E", "#2E8A3E"] as const;

function DesktopTimeline() {
  const days = [1, 2] as const;

  return (
    <div className="hidden lg:flex gap-0 w-full">
      <div style={{ paddingTop: HEADER_H + 12 }}>
        <YAxis height={GRID_H} />
      </div>
      <div style={{ paddingTop: HEADER_H + 12 }}>
        <DashedLine height={GRID_H} />
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1 pl-3">
        {days.map((day) => {
          const events = timeline.filter((e) => e.day === day);
          const sample  = events[0];
          const color   = DAY_COLORS[day - 1];

          return (
            <div key={day} className="flex flex-col">
              {/* Day header */}
              <div
                className="rounded-xl border-2 border-black text-center flex flex-col items-center justify-center flex-shrink-0 mb-3"
                style={{ height: HEADER_H, backgroundColor: color }}
              >
                <p className="text-[9px] text-white/75 font-semibold tracking-[0.2em] uppercase leading-none mb-0.5">
                  {sample?.dayLabel}
                </p>
                <p className="text-white font-black text-lg leading-none">
                  {sample?.date}
                </p>
              </div>

              {/* Grid */}
              <div className="relative" style={{ height: GRID_H }}>
                {TIME_TICKS.map((tick) => (
                  <div
                    key={tick}
                    className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: topPct(tick) }}
                  />
                ))}
                {events.map((item, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                      top: topPct(item.timeFrom),
                      height: heightPct(item.timeFrom, item.timeTill),
                      minHeight: item.isEvent ? 130 : 52,
                      paddingBottom: 4,
                      paddingRight: 2,
                    }}
                  >
                    <EventCard item={item} />
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

const MOBILE_GRID_H = 1100;

function MobileTimeline() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [fade, setFade] = useState(true);
  const days: (1 | 2)[] = [1, 2];
  const dayLabels = ["Day 1", "Day 2"];
  const events = timeline.filter((e) => e.day === activeDay);

  const switchDay = (day: 1 | 2) => {
    if (day === activeDay) return;
    setFade(false);
    setTimeout(() => {
      setActiveDay(day);
      setFade(true);
    }, 200);
  };

  return (
    <div className="lg:hidden w-full">
      {/* Day tabs */}
      <div className="flex gap-2 mb-5">
        {days.map((day, i) => (
          <button
            key={day}
            onClick={() => switchDay(day)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 border-black transition-all duration-200 ${
              activeDay === day
                ? "text-white shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
            style={activeDay === day ? { backgroundColor: DAY_COLORS[day - 1] } : {}}
          >
            {dayLabels[i]}
          </button>
        ))}
      </div>

      <div
        className="flex gap-0 transition-opacity duration-200 ease-in-out"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <YAxis height={MOBILE_GRID_H} />
        <DashedLine height={MOBILE_GRID_H} />
        <div className="relative flex-1 pl-3" style={{ height: MOBILE_GRID_H }}>
          {TIME_TICKS.map((tick) => (
            <div
              key={tick}
              className="absolute left-0 right-0 border-t border-gray-100"
              style={{ top: topPct(tick) }}
            />
          ))}
          {events.map((item, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: topPct(item.timeFrom),
                height: heightPct(item.timeFrom, item.timeTill),
                minHeight: item.isEvent ? 130 : 52,
                paddingBottom: 4,
              }}
            >
              <EventCard item={item} delay={i * 60} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.06 });
  const inView = isInView ? "in-view" : "";

  return (
    <section ref={sectionRef} id="timeline" className="py-20 bg-[#FFEEF0]">
      <Container>

        {/* Section header */}
        <div className={`mb-10 reveal reveal-up ${inView}`}>
          <div className="inline-block border border-black rounded-full px-5 py-1.5 bg-white text-xs font-medium tracking-wide mb-4">
            SCHEDULE
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="font-gliker font-medium text-[34px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.005em] text-[#3A001D] max-w-[560px]">
              Stay on track, Trainer
            </h1>
            <p className="text-[#3b0a1e] font-nunito text-sm md:text-base leading-relaxed max-w-xs md:text-right mb-1">
              Two days of challenges.<br />Pick your arena and rise to the top.
            </p>
          </div>
        </div>

        {/* Day legend pills */}
        <div className={`flex gap-3 mb-8 flex-wrap reveal reveal-up ${inView} reveal-delay-1`}>
          {(["Day 1 · Thu 17/04", "Day 2 · Fri 18/04"] as const).map((label, i) => (
            <span
              key={i}
              className="text-white text-xs font-bold px-4 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_black]"
              style={{ backgroundColor: DAY_COLORS[i] }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Timeline grid */}
        <div className={`w-full reveal reveal-up ${inView} reveal-delay-2`}>
          <MobileTimeline />
          <DesktopTimeline />
        </div>
      </Container>
    </section>
  );
}
