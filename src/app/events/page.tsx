import EventCard from "@/components/ui/eventcard";
// import ArenaPageFooter from "@/components/layout/ArenaPageFooter";
// import Footer from "@/components/layout/Footer";

export default function EventsPage() {

    const ARENAS_DATA = [
        { name: "DSA SMACKDOWN", type: "STRATEGY TYPE", image: "/pokemons/charizard.svg", color: "#FFD1D1", detailsLink: "/events/pitch", top: "-top-[25px]", },
        { name: "PITCH PERFECT", type: "STRATEGY TYPE", image: "/pokemons/bulbasaur.png", color: "#D1FFE9", detailsLink: "/events/code" },
        { name: "CODING RELAY", type: "STRATEGY TYPE", image: "/pokemons/charmeleon.svg", color: "#FFD1D1", detailsLink: "/events/pitch", top: "-top-[25px]", },
        { name: "TECHNOSEEK", type: "STRATEGY TYPE", image: "/pokemons/venusaur.svg", color: "#D1FFE9", detailsLink: "/events/code", top: "-top-[10px]", },
        { name: "CLASH ROYALE", type: "STRATEGY TYPE", image: "/pokemons/wartortle.svg", color: "#FFD1D1", detailsLink: "/events/pitch", top: "-top-[20px]", },
        { name: "TYPEMASTER", type: "STRATEGY TYPE", image: "/pokemons/blastoise.svg", color: "#D1FFE9", detailsLink: "/events/code" },
        ];

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
        {ARENAS_DATA.map((arena, index) => (
            <EventCard key={index} event={arena} />
        ))}
        </div>
{/* <ArenaPageFooter ></ArenaPageFooter> */}
    </main>
    {/* <Footer></Footer> */}
    </>
  
  );
}