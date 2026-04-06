"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import ShowcaseCard from "../components/ShowcaseCard";
import { useInView } from "@/hooks/useInView";
import { EVENTS_DATA } from "@/data/events";

const CYCLE_INTERVAL = 4000; // ms between transitions
const FADE_DURATION = 500; // ms for fade animation

export default function Events() {
  const router = useRouter();
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const inView = isInView ? "in-view" : "";

  // Index of the first card in the current pair
  const [pairIndex, setPairIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const totalEvents = EVENTS_DATA.length;

  const nextPair = useCallback(() => {
    // Fade out
    setVisible(false);
    setTimeout(() => {
      // Advance to next pair (wrapping around)
      setPairIndex((prev) => (prev + 2) % totalEvents);
      // Fade in
      setVisible(true);
    }, FADE_DURATION);
  }, [totalEvents]);

  useEffect(() => {
    const timer = setInterval(nextPair, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextPair]);

  const firstEvent = EVENTS_DATA[pairIndex];
  const secondEvent = EVENTS_DATA[(pairIndex + 1) % totalEvents];

  return (
    <section ref={sectionRef} id="events" className="py-12 md:py-24 bg-[#FFEEF0] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

          <div className={`flex flex-col items-start text-left reveal reveal-left ${inView}`}>

            <div className="mb-4 md:mb-6">
              <div className="inline-block border border-black rounded-full px-5 py-1.5 md:px-6 md:py-2 bg-white text-xs md:text-sm font-medium tracking-wide">
                EVENTS
              </div>
            </div>

              <h1
                className="
                mb-6 md:mb-10
                  font-gliker
                  font-medium
                  text-[34px] sm:text-[42px] md:text-[52px]
                  leading-[1.08]
                  tracking-[-0.005em]
                  text-[#3A001D]
                  max-w-[650px]
                "
              >
                Discover and Explore Upcoming Events Near You
              </h1>

            <p className="font-nunito text-[#3b0a1e] text-[14px] md:text-[18px] leading-relaxed max-w-xl -mb-36 md:mb-10">
              Explore an extensive variety of events designed to inspire and engage innovators of all kinds, offering unique opportunities to learn, connect, and grow in your creative journey.
            </p>

            <button
              onClick={() => router.push("/events")}
              className="
                hidden lg:inline-block
                bg-[#E63946]
                text-white
                font-semibold cursor-pointer
                font-nunito
                text-sm md:text-base
                px-6 md:px-8
                py-3 md:py-4
                rounded-2xl
                border-2 border-black
                shadow-[3px_3px_0px_black]
                hover:scale-105
                active:scale-95
                transition
              "
            >
              VIEW ALL EVENTS
            </button>
          </div>

          <div
            className={`flex flex-row gap-4 md:gap-10 justify-center items-center mt-8 lg:mt-0 reveal reveal-right ${inView} reveal-delay-2`}
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            <div className="relative mt-20 hover:-translate-y-4 transition-transform duration-300">
              <ShowcaseCard event={firstEvent} />
            </div>

            <div className="relative mt-40 hover:-translate-y-4 transition-transform duration-300">
              <ShowcaseCard event={secondEvent} />
            </div>
          </div>

          <div className="lg:hidden flex justify-center w-full mt-8">
            <button
              onClick={() => router.push("/events")}
              className="
                bg-[#E63946]
                text-white
                font-semibold
                font-nunito
                text-sm
                px-6 py-3
                rounded-2xl
                border-2 border-black
                shadow-[3px_3px_0px_black]
                hover:scale-105
                active:scale-95
                transition
              "
            >
              VIEW ALL EVENTS
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
