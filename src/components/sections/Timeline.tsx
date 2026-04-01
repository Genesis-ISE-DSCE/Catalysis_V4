"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import { useState } from "react";

// ── Type ──────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  day: 1 | 2 | 3;
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
}

// ── Data ──────────────────────────────────────────────────────────────────────

const timeline: TimelineEvent[] = [
  // DAY 1
  { day: 1, date: "15/04", dayLabel: "TUESDAY", title: "OPENING CEREMONY",  venue: "MAIN AUDITORIUM",       timeFrom: "09:00", timeTill: "10:00", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  { day: 1, date: "15/04", dayLabel: "TUESDAY", title: "TECHNOSEEK",         venue: "ROOM 205",              timeFrom: "10:15", timeTill: "12:30", description: "Your journey to becoming a champion begins now. Your journey to becoming a champion begins now. Your journey to becoming a champion begins now.", isEvent: true,  imagePath: "/events/technoseek.png",   panelColor: "#FA9DA2", hasRegister: true  },
  { day: 1, date: "15/04", dayLabel: "TUESDAY", title: "LUNCH BREAK",        venue: "MAIN AUDITORIUM",       timeFrom: "12:30", timeTill: "13:30", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  { day: 1, date: "15/04", dayLabel: "TUESDAY", title: "CODING RELAY",       venue: "DEV ARENA",             timeFrom: "13:30", timeTill: "15:30", description: "Your journey to becoming a champion begins now.", isEvent: true, imagePath: "/events/coding-relay.png", panelColor: "#FFC0D5", hasRegister: true  },
  { day: 1, date: "15/04", dayLabel: "TUESDAY", title: "BREAK",              venue: "MAIN AUDITORIUM",       timeFrom: "15:30", timeTill: "16:30", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  // DAY 2
  { day: 2, date: "15/04", dayLabel: "TUESDAY", title: "DSA CHALLENGE",      venue: "ROOM 205",              timeFrom: "09:30", timeTill: "12:30", description: "Your journey to becoming a champion begins now.", isEvent: true,  imagePath: "/events/dsa.png",          panelColor: "#FDDF6B", hasRegister: true  },
  { day: 2, date: "15/04", dayLabel: "TUESDAY", title: "LUNCH BREAK",        venue: "MAIN AUDITORIUM",       timeFrom: "12:30", timeTill: "13:30", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  { day: 2, date: "15/04", dayLabel: "TUESDAY", title: "CLASH ROYALE",       venue: "ROOM 205",              timeFrom: "13:30", timeTill: "15:30", description: "Enter the battlefield", isEvent: true,  imagePath: "/events/clash-royale.png", panelColor: "#E2E2E2", hasRegister: true  },
  { day: 2, date: "15/04", dayLabel: "TUESDAY", title: "BREAK",              venue: "MAIN AUDITORIUM",       timeFrom: "15:30", timeTill: "16:30", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  // DAY 3
  { day: 3, date: "15/04", dayLabel: "TUESDAY", title: "TYPEMASTER",         venue: "ROOM 205",              timeFrom: "10:15", timeTill: "12:00", description: null, isEvent: true,  imagePath: "/events/typemaster.png",   panelColor: "#1CD88A", hasRegister: true  },
  { day: 3, date: "15/04", dayLabel: "TUESDAY", title: "LUNCH BREAK",        venue: "MAIN AUDITORIUM",       timeFrom: "12:00", timeTill: "13:00", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  { day: 3, date: "15/04", dayLabel: "TUESDAY", title: "PITCH EVENT",        venue: "ROOM 205",              timeFrom: "13:00", timeTill: "15:00", description: "Make your presentation stand out, captivate your audience, and secure the victory you deserve.", isEvent: true, imagePath: "/events/pitch.png", panelColor: "#FFB8DF", hasRegister: true },
  { day: 3, date: "15/04", dayLabel: "TUESDAY", title: "PRIZE DISTRIBUTION", venue: "CHAMPIONS ARE CROWNED", timeFrom: "15:00", timeTill: "15:45", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
  { day: 3, date: "15/04", dayLabel: "TUESDAY", title: "CLOSING CEREMONY",   venue: "CHAMPIONS ARE CROWNED", timeFrom: "15:45", timeTill: "16:30", description: null, isEvent: false, imagePath: null, panelColor: "#FFFFFF", hasRegister: false },
];

// ── Time helpers ──────────────────────────────────────────────────────────────

const START_MIN = 9 * 60;        // 09:00
const END_MIN   = 16 * 60 + 30;  // 16:30
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

// ── EventCard ─────────────────────────────────────────────────────────────────

function EventCard({ item }: { item: TimelineEvent }) {
  const isWhite = item.panelColor === "#FFFFFF";

  return (
    <div
      className="h-full w-full rounded-2xl border-2 border-black flex flex-col p-2.5 overflow-hidden"
      style={{
        backgroundColor: item.panelColor,
        boxShadow: "2px 2px 0 0 rgba(0,0,0,0.12)",
      }}
    >
      {/* Icon row */}
      {item.imagePath ? (
        <div className="relative w-9 h-9 flex-shrink-0 mb-1">
          <Image src={item.imagePath} alt={item.title} fill sizes="36px" className="object-contain drop-shadow-sm" />
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
  <Image
    src="/events/break.png"
    alt="break"
    width={10}
    height={10}
    className="object-contain"
  />
</div>
      )}

      {/* Title */}
      <p className="font-black text-[11px] sm:text-[13px] leading-tight text-black tracking-tight">
        {item.title}
      </p>

      {/* Venue */}
      <p className="text-[9px] font-semibold tracking-wider uppercase leading-none mt-0.5"
        style={{ color: isWhite ? "#9CA3AF" : "rgba(0,0,0,0.40)" }}>
        {item.venue}
      </p>

      {/* Time */}
      <p className="text-[10px] font-bold mt-1" style={{ color: "#D92B4B" }}>
        {item.timeFrom} – {item.timeTill}
      </p>

      {/* Description */}
      {item.description && (
        <p className="text-[9px] sm:text-[10px] text-black/70 leading-snug mt-1 line-clamp-4 flex-1">
          {item.description}
        </p>
      )}

      {/* Register */}
      {item.hasRegister && (
        <button className="mt-1.5 self-start flex-shrink-0 bg-black text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full hover:bg-gray-800 transition-colors">
          Register
        </button>
      )}
    </div>
  );
}

// ── Y-Axis ────────────────────────────────────────────────────────────────────

function YAxis({ height }: { height: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 52, height }}>
      {TIME_TICKS.map((tick) => (
        <div
          key={tick}
          className="absolute right-3 -translate-y-1/2"
          style={{ top: topPct(tick) }}
        >
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
            {tick}
          </span>
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
        backgroundImage:
          "repeating-linear-gradient(to bottom,#CBD5E1 0,#CBD5E1 5px,transparent 5px,transparent 11px)",
      }}
    />
  );
}

// ── Desktop grid ──────────────────────────────────────────────────────────────

const HEADER_H = 52; // px — height of day header pill
const GRID_H   = 900; // px — height of the timed area

function DesktopTimeline() {
  const days = [1, 2, 3] as const;

  return (
    <div className="hidden lg:flex gap-0 w-full">
      {/* Time axis */}
      <div style={{ paddingTop: HEADER_H + 12 }}>
        <YAxis height={GRID_H} />
      </div>

      {/* Dashed rule */}
      <div style={{ paddingTop: HEADER_H + 12 }}>
        <DashedLine height={GRID_H} />
      </div>

      {/* 3 columns */}
      <div className="grid grid-cols-3 gap-3 flex-1 pl-3">
        {days.map((day) => {
          const events = timeline.filter((e) => e.day === day);
          const sample = events[0];

          return (
            <div key={day} className="flex flex-col">
              {/* Day header */}
              <div
                className="rounded-xl border-2 border-black text-center flex flex-col items-center justify-center flex-shrink-0 mb-3"
                style={{
                  height: HEADER_H,
                  backgroundColor: "#DD273E",
                  // boxShadow: "3px 3px 0 0 rgba(0,0,0,1)",
                }}
              >
                <p className="text-[9px] text-white/75 font-semibold tracking-[0.2em] uppercase leading-none mb-0.5">
                  {sample?.dayLabel}
                </p>
                <p className="text-white font-black text-lg leading-none">
                  {sample?.date}
                </p>
              </div>

              {/* Timed card area */}
              <div className="relative" style={{ height: GRID_H }}>
                {/* Horizontal tick lines */}
                {TIME_TICKS.map((tick) => (
                  <div
                    key={tick}
                    className="absolute left-0 right-0 border-t border-gray-100"
                    style={{ top: topPct(tick) }}
                  />
                ))}

                {/* Cards */}
                {events.map((item, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                      top: topPct(item.timeFrom),
                      height: heightPct(item.timeFrom, item.timeTill),
                      minHeight: 60,
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

// ── Mobile timeline ───────────────────────────────────────────────────────────

const MOBILE_GRID_H = 800;

function MobileTimeline() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const days: (1 | 2 | 3)[] = [1, 2, 3];
  const dayLabels = ["Day 1", "Day 2", "Day 3"];

  const events = timeline.filter((e) => e.day === activeDay);

  return (
    <div className="lg:hidden w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {days.map((day, i) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 border-black transition-all duration-200 ${
              activeDay === day
                ? "bg-[#D92B4B] text-white shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
                : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {dayLabels[i]}
          </button>
        ))}
      </div>

      {/* Y-axis + cards */}
      <div className="flex gap-0">
        <YAxis height={MOBILE_GRID_H} />
        <DashedLine height={MOBILE_GRID_H} />

        {/* Cards */}
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
                minHeight: 56,
                paddingBottom: 4,
              }}
            >
              <EventCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 bg-[#FFEEF0]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT — untouched */}
          <div className="flex flex-col justify-start lg:pt-2 max-w-lg">
            <div className="mb-4">
              <span className="px-6 py-2 text-sm border border-black rounded-full bg-white font-medium">
                TIMELINE
              </span>
            </div>

            <div className="mb-6">
              <h1 className="font-gliker font-medium text-[34px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.005em] text-[#3A001D] max-w-[650px]">
                Stay on track, Trainer
              </h1>
            </div>

            <p className="text-[#3b0a1e] font-nunito text-sm md:text-xl leading-relaxed max-w-xl md:mb-10">
              Embarking on the path to becoming a true champion is a profound and
              transformative journey that starts at this very moment, filled with
              countless challenges, opportunities for growth, and moments of triumph
              that will shape your character and define your legacy for years to come.
            </p>
          </div>

          {/* RIGHT — fresh timeline */}
          <div className="w-full">
            <MobileTimeline />
            <DesktopTimeline />
          </div>

        </div>
      </Container>
    </section>
  );
}