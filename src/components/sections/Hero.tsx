"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

function RegisterCard() {
  const router = useRouter();
  const fingerRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      const el = fingerRef.current;
      if (!el) return;
      el.classList.remove("finger-tap");
      void el.offsetWidth;
      el.classList.add("finger-tap");
      setTimeout(() => { cooldownRef.current = false; }, 2200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative w-[360px] h-[300px] bg-[#DD273E] border-[3px] border-black rounded-[3rem] flex flex-col items-center justify-center shadow-xl overflow-visible">

      <div
        ref={fingerRef}
        className="absolute -top-12 sm:-top-16 md:-top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none finger-tap"
      >
        <Image
          src="/hero/hero-finger.png"
          alt="finger"
          width={180}
          height={180}
          unoptimized
          priority
          quality={100}
          className="object-contain
            w-[110px] sm:w-[140px] md:w-[180px]
            h-auto"
        />
      </div>

      <div className="relative mt-4 mb-8 flex flex-col items-center">
        <div className="absolute -bottom-3 z-10">
          <Image
            src="/hero/button-shadow.png"
            alt="shadow"
            width={120}
            height={40}
            unoptimized 
            priority
            quality={100}
          />
        </div>
        <div className="relative ml-30 transition-transform duration-200 hover:scale-115 active:scale-95 -bottom-3 z-20">
          <Image
            src="/hero/button.png"
            alt="press button"
            width={100}
            height={50}
            onClick={() => router.push("/register")}
            unoptimized
            priority
            quality={100}
          />
        </div>
      </div>
      <div className="relative group cursor-pointer transition-transform active:scale-95">
        <div className="relative inline-block group mt-10 select-none">
          <div 
            className="
              absolute inset-0 translate-y-2 
              bg-[#3A001D] border-[3px] border-[#3A001D] rounded-2xl
              opacity-20
              z-0
              transition-transform duration-150 ease-out
            "
            style={{ transform: "rotate(8deg)" }}
          />

          <button
            onClick={() => router.push("/register")}
            className="
              relative px-6 py-3.5 
              bg-white text-black 
              border-[3px] border-black rounded-2xl
              
              font-bold
              text-2xl tracking-tight
              
              transition-all duration-150 ease-out
              cursor-pointer
              z-10
              
              auto-cols-auto [ -webkit-tap-highlight-color:transparent ]
              
              hover:scale-105 hover:-translate-y-1
              
              active:translate-y-[12px] 
              active:translate-x-[2px]
              active:scale-[0.98]
            "
            style={{ transform: "rotate(5deg)" }}
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
}

function EventHighlightsCard() {
  return (
    <div className="relative w-[246px] h-[250px] bg-white dark:bg-[#160030] border-[3px] border-black dark:border-white/20 rounded-[3rem] flex flex-col items-center pt-8 px-4 shadow-sm dark:shadow-[0_0_20px_rgba(52,199,89,0.15)]">

      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 z-10">
        <Image
          src="/hero/star.png"
          alt="star badge"
          width={45}
          height={45}
          className="object-contain"
          unoptimized
            priority
            quality={100}
        />
      </div>

      <div className="mb-4">
        <h1 className="text-black dark:text-white font-gliker font-semibold text-2xl">Event Highlights</h1>
        
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-black dark:text-white font-black text-lg">2 Days</p>
        <p className="text-black dark:text-white font-black text-lg">6 Events</p>
        <p className="text-black dark:text-white font-black text-lg">100+ Participants</p>
      </div>

      <div className="mt-auto mb-8 relative flex items-center justify-center w-full">
        <div className="relative z-10">
          <h1 className="text-black font-gliker text-yellow-300 text-2xl">Register</h1>
        </div>
        <div className="relative z-0 opacity-80">
          <h1 className="text-black font-gliker text-yellow-200 text-2xl">Register</h1>
        </div>
      </div>
    </div>
  );
}

function LeaderboardCard() {
  return (
    <div className="relative w-[246px] h-[250px] bg-[#FAF7ED] dark:bg-[#160030] border-[3px] border-black dark:border-white/20 rounded-[3rem] flex flex-col items-center pt-8 px-4 shadow-sm dark:shadow-[0_0_20px_rgba(255,45,85,0.15)]">

      <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 z-10">
        <Image
          src="/hero/star.png"
          alt="star badge"
          width={45}
          height={45}
          className="object-contain"
          unoptimized
          priority
          quality={100}
        />
      </div>

      <div className="mb-2">
        <h1 className="text-black dark:text-white font-gliker font-semibold text-2xl">Leaderboard</h1>
      </div>
      <p className="text-black dark:text-white/60 text-center text-[15px] leading-tight font-medium px-2 mt-4">
        #Climb the ranks and secure your spot at the top.
      </p>

      <div className="mt-auto mb-6">
        <Image
          src="/hero/five-pokeballs.png"
          alt="progress"
          width={180}
          height={40}
          className="object-contain"
          unoptimized
          priority
          quality={100}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const [heroRef, heroInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const inView = heroInView ? "in-view" : "";

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full bg-[#FFEEF0] dark:bg-[#0A0018] overflow-hidden flex flex-col items-center pt-12 pb-20"
    >

      <div className={`absolute
        -top-20 md:-top-25
        left-1/2 -translate-x-1/2
        w-[40px] sm:w-[60px] md:w-[84px]
        h-[620px] sm:h-[540px] md:h-[820px]
        bg-white dark:bg-white/5
        z-0
        reveal reveal-up ${inView}
      `} />

      <div className={`relative z-10 mt-4 md:mt-5 mb-3 md:mb-4 reveal reveal-scale ${inView}`}>
        <Image
          src="/hero/Pokeball.png"
          alt="pokeball"
          width={50}
          height={50}
          className="drop-shadow-md md:w-[80px] md:h-[80px]"
          unoptimized
          priority
          quality={100}
        />
      </div>

      <div className={`relative z-10 text-center px-4 max-w-5xl reveal reveal-up ${inView} reveal-delay-1`}>

        {/* Organiser badge */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#160030] border-2 border-black dark:border-white/20 rounded-full px-4 py-1 text-[11px] font-black tracking-widest uppercase text-[#3A001D] dark:text-white/80 shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none">
            <span className="w-2 h-2 rounded-full bg-[#DD273E] inline-block" />
            Club Genesis &nbsp;·&nbsp; ISE Dept, DSCE
          </span>
          <span className="inline-flex items-center bg-[#DD273E] border-2 border-black dark:border-transparent rounded-full px-4 py-1 text-[11px] font-black tracking-widest uppercase text-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[0_0_10px_rgba(255,45,85,0.4)]">
            V4.0
          </span>
        </div>

       <h1 className="
        font-gliker
        font-semibold
        text-[40px] md:text-[68px]
        leading-tight
        text-[#3A001D] dark:text-white
        text-center
        w-full max-w-[984px]
        px-4
      ">
        Where Ideas Ignite.
        Innovation Accelerates.
      </h1>

        <p className="mt-4 md:mt-6 text-[#3b0a1e] dark:text-white/60 font-medium
          max-w-[80%] sm:max-w-md md:max-w-3xl
          mx-auto
          text-[13px] sm:text-sm md:text-lg
          leading-relaxed md:leading-relaxed"
        >
          Two days, six events, one arena. Catalysis V4.0 — organised by Club Genesis, ISE Dept, DSCE Bangalore — brings together coders, strategists, and creators to compete, collaborate, and rise to the top.
        </p>
      </div>
<div className={`relative w-full max-w-6xl mt-4 md:mt-5 reveal reveal-up ${inView} reveal-delay-2`}>

  <div className="flex flex-col items-center gap-10 md:hidden">
    <div className="scale-70">
      <RegisterCard />
    </div>

    <div className="scale-95">
      <EventHighlightsCard />
    </div>

    <div className="scale-95">
      <LeaderboardCard />
    </div>
  </div>

  <div className="hidden md:flex justify-center items-end h-[360px] lg:h-[420px] relative w-full">

    <div className="absolute left-2 lg:left-10 bottom-4 z-20 top-16 transition-transform hover:-translate-y-2 scale-75 lg:scale-100 origin-bottom-left">
      <LeaderboardCard />
    </div>

    <div className="relative flex flex-col items-center z-30 scale-90 lg:scale-100">
      <RegisterCard />
    </div>

    <div className="absolute right-2 lg:right-10 bottom-10 z-20 top-16 transition-transform hover:-translate-y-2 scale-75 lg:scale-100 origin-bottom-right">
      <EventHighlightsCard />
    </div>

  </div>
</div>
    </section>
  );
}