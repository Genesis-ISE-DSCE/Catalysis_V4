import EventCard from "@/components/ui/eventcard";
// import ArenaPageFooter from "@/components/layout/ArenaPageFooter";
// import Footer from "@/components/layout/Footer";

export default function EventsPage() {

    const ARENAS_DATA = [
  { 
    name: "DSA SMACKDOWN", 
    type: "TECHNICAL", 
    image: "/pokemons/alakazam.svg", 
    color: "#FFD1D1", 
    detailsLink: "/events/pitch",
    tags: ["Data Structures", "Logic", "Problem Solving", "Optimization"]
  },
  { 
    name: "PITCH PERFECT", 
    type: "ENTREPRENEURSHIP", 
    image: "/pokemons/jigglypuff.svg", 
    color: "#D1FFE9", 
    detailsLink: "/events/code", 
    width: 175, 
    height: 175,
    tags: ["Business Model", "Ideation", "Public Speaking", "Presentation"]
  },
  { 
    name: "CODING RELAY", 
    type: "TEAM BATTLE", 
    image: "/pokemons/ditto.svg", 
    color: "#FFD1D1", 
    detailsLink: "/events/pitch", 
    top: "top-[-25px]",
    tags: ["Algorithms", "Endurance", "Team Sync"]
  },
  { 
    name: "TECHNOSEEK", 
    type: "EXPLORATION", 
    image: "/pokemons/zoroark.svg", 
    color: "#D1FFE9", 
    detailsLink: "/events/code", 
    top: "top-[-30px]",
    tags: ["Scavenger Hunt", "Teamwork", "Tech Puzzles", "Treasure Hunt"]
  },
  { 
    name: "CLASH ROYALE", 
    type: "GAMING", 
    image: "/pokemons/arceus.svg", 
    color: "#FFD1D1", 
    detailsLink: "/events/pitch", 
    width: 175, 
    height: 160,
    tags: ["Strategy Builder", "Deck Master", "Live Combat", "Real-time"]
  },
  { 
    name: "TYPEMASTER", 
    type: "SKILL", 
    image: "/pokemons/rayquaza.svg", 
    color: "#D1FFE9", 
    detailsLink: "/events/code", 
    width: 200, 
    height: 175,
    tags: ["Speed Demon", "Precision Master", "Combo Builder"]
  },
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