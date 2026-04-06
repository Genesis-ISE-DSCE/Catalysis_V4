import EventCard from "@/components/ui/eventcard";
import { EVENTS_DATA } from "@/data/events";

export default function EventsPage() {

  return (
    <>
      <main className="flex flex-col mb-20 items-center pt-20 bg-white min-h-screen px-4">
      <h1 className="
        font-gliker
        font-semibold
        text-[40px] md:text-[68px]
        leading-tight
        text-[#3A001D]
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
        text-[#000000]
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
