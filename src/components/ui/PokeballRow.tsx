import Image from "next/image";

interface PokeballRowProps {
  className?: string;
}

export default function PokeballRow({ className = "" }: PokeballRowProps) {
  // We're generating 10 pokeballs based on your Figma export.
  // Note: Using the locally available 'poke-balls/pokeball1.png' as the source.
  const pokeballs = Array.from({ length: 10 });

  return (
    <div
      className={`relative flex flex-row items-center justify-between w-full overflow-hidden py-4 ${className}`}
      style={{ minHeight: "132px" }}
    >
      {/* Auto-layout mapping equivalent to the absolute positioning in Figma */}
      <div className="flex w-full items-center justify-around gap-[10px] min-w-max px-4">
        {pokeballs.map((_, index) => (
          <div
            key={index}
            className="flex-none relative hover:-translate-y-2 hover:scale-110 hover:rotate-6 transition-all duration-300 ease-out cursor-pointer"
            style={{ width: "98px", height: "100px" }}
          >
            <Image
              src="/poke-balls/pokeball1.png"
              alt={`Pokeball ${index + 1}`}
              fill
              className="object-contain drop-shadow-[0_4px_8px_rgba(221,39,62,0.4)]"
              sizes="98px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
