"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import { useState } from "react";

const timeline = [
  [
    {
      time: "09:00 - 10:00",
      title: "Opening Ceremony",
      type: "ceremony",
    },
    {
      time: "10:15 - 12:30",
      title: "Technoseek",
      type: "event",
      pokemon: "venusaur",
      description: "Your journey to becoming a champion begins now.",
    },
    {
      time: "12:30 - 01:30",
      title: "Lunch Break",
      type: "break",
    },
    {
      time: "01:30 - 03:30",
      title: "Typemaster",
      type: "event",
      pokemon: "wartortle",
      description: "Your journey to becoming a champion begins now.",
    },
    {
      time: "02:30 - 03:00",
      title: "Break",
      type: "break",
    },
    {
      time: "02:30 - 03:30",
      title: "Coding Relay",
      type: "event",
      pokemon: "charmeleon",
      description: "Your journey to becoming a champion begins now.",
    },
  ],

  [
    {
      time: "10:15 - 12:30",
      title: "DSA Challenge",
      type: "event",
      pokemon: "charmeleon",
      description: "Your journey to becoming a champion begins now.",
    },
    {
      time: "12:30 - 01:30",
      title: "Lunch Break",
      type: "break",
    },
    {
      time: "01:30 - 03:30",
      title: "Valorant",
      type: "event",
      pokemon: "wartortle",
      description: "Enter the battlefield.",
    },
    {
      time: "01:30 - 03:00",
      title: "Break",
      type: "break",
    },
    {
      time: "01:30 - 03:30",
      title: "Coding Relay (Final)",
      type: "event",
      pokemon: "charmeleon",
      description: "Your journey to becoming a champion begins now.",
    },
  ],

  [
    {
      time: "10:15 - 12:30",
      title: "DSA Challenge",
      type: "event",
      pokemon: "charmeleon",
      description:
        "Crack the DSA Challenge and become a true champion.",
    },
    {
      time: "12:30 - 01:30",
      title: "Lunch Break",
      type: "break",
    },
    {
      time: "01:30 - 02:30",
      title: "Pitch Event",
      type: "event",
      pokemon: "venusaur",
      description:
        "Make your presentation stand out and secure victory.",
    },
    {
      time: "02:30 - 03:00",
      title: "Prize Distribution",
      type: "ceremony",
    },
    {
      time: "02:30 - 03:30",
      title: "Closing Ceremony",
      type: "ceremony",
    },
  ],
];

const dayLabels = ["Day 1", "Day 2", "Day 3"];

export default function Timeline() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="timeline" className="py-20 bg-[#FFEEF0]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10">

          <div>
            <SectionHeader
              label="Timeline"
              title="Stay on track, Trainer"
              subtitle="Embark on a journey filled with challenges and growth."
            />
          </div>

          {/* Mobile/Tablet: Day tabs + single column */}
          <div className="lg:hidden">
            <div className="flex gap-3 mb-6">
              {dayLabels.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 border-black transition-all duration-200 ${
                    activeDay === i
                      ? "bg-yellow-300 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {timeline[activeDay].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-5 border-2 border-black shadow-sm ${
                    item.type === "event"
                      ? "bg-yellow-300"
                      : item.type === "ceremony"
                      ? "bg-red-100"
                      : "bg-gray-100"
                  }`}
                >
                  {item.pokemon && (
                    <Image
                      src={`/pokemons/${item.pokemon}.png`}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="mb-2"
                    />
                  )}

                  <p className="text-sm text-gray-600 font-medium">
                    {item.time}
                  </p>

                  <h3 className="font-bold text-lg mt-1">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {item.type === "event" && (
                    <button className="mt-3 text-sm bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors">
                      Register
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Full 3-column grid with time labels */}
          <div className="hidden lg:flex gap-6">
            <div className="flex flex-col justify-between text-sm text-gray-600 pr-2">
              {[
                "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00",
              ].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 w-full">
              {timeline.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-4">
                  <div className="text-center font-bold text-sm text-gray-500 mb-2">
                    {dayLabels[colIndex]}
                  </div>
                  {col.map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-4 border shadow-sm ${
                        item.type === "event"
                          ? "bg-yellow-300"
                          : "bg-gray-100"
                      }`}
                    >
                      {item.pokemon && (
                        <Image
                          src={`/pokemons/${item.pokemon}.png`}
                          alt={item.title}
                          width={40}
                          height={40}
                        />
                      )}

                      <p className="text-xs text-gray-600 mt-1">
                        {item.time}
                      </p>

                      <h3 className="font-bold text-sm">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs mt-1 text-gray-700">
                          {item.description}
                        </p>
                      )}

                      {item.type === "event" && (
                        <button className="mt-2 text-xs bg-black text-white px-3 py-1 rounded-full">
                          Register
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}