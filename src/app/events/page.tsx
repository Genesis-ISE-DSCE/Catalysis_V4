import EventCard from "@/components/ui/eventcard";
import { EVENTS_DATA } from "@/data/events";

export default function EventsPage() {

  return (
    <>
      <main className="flex flex-col mb-20 items-center pt-20 bg-white dark:bg-[#0A0018] min-h-screen px-4">
      {/* Organiser credit */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
        <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#160030] border-2 border-black dark:border-white/20 rounded-full px-4 py-1 text-[11px] font-black tracking-widest uppercase text-[#3A001D] dark:text-white/80 shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none">
          <span className="w-2 h-2 rounded-full bg-[#DD273E] inline-block" />
          Club Genesis &nbsp;·&nbsp; ISE Dept, DSCE
        </span>
        <span className="inline-flex items-center bg-[#DD273E] border-2 border-black dark:border-transparent rounded-full px-4 py-1 text-[11px] font-black tracking-widest uppercase text-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[0_0_10px_rgba(255,45,85,0.4)]">
          Catalysis V4.0
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
        Choose Your Arena
      </h1>

      <p className="
        font-nunito
        font-medium
        text-[16px] md:text-[20px]
        leading-snug
        text-[#000000] dark:text-white/60
        text-center
        w-full max-w-[984px]
        px-4
        mt-4
      ">
        Step into different battle zones, master your skills, and rise through the ranks. Each event is a unique challenge — pick your path wisely.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-24 mt-20 px-6 max-w-7xl mx-auto w-full justify-items-center">
        {EVENTS_DATA.map((arena, index) => (
            <EventCard key={index} event={arena} />
        ))}
        </div>
    </main>
    </>

  );
}
