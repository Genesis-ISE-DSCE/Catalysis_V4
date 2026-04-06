import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: {
    name: string;
    type: string;
    image: string;
    color: string;
    detailsLink: string;
    top?: string;
    width?: number;
    height?: number;
    tags?: string[];
  };
}

export default function EventCard({ event }: EventCardProps) {
  const defaultTags = ["Strategy Builder", "Idea Master", "Idea Master", "Pitch Pro"];
  const displayTags = event.tags || defaultTags;

  const tagStyles = [
    { bg: "bg-[#FFD9C3]", border: "border-[#FBB993]" },
    { bg: "bg-[#E6DBED]", border: "border-[#CCB8E6]" },
    { bg: "bg-[#CEF2FF]", border: "border-[#A6E0F4]" },
    { bg: "bg-[#D6EBDC]", border: "border-[#ADD6B8]" },
  ];

  return (
    <div className="
      relative
      w-[279px]
      h-[420px]
      flex
      flex-col
      items-center
      justify-end
      transition-transform
      duration-300
      ease-out
      hover:-translate-y-3
    ">
      <div className={`absolute ${event.top || "top-[-50px]"} z-10 w-[229px] h-[207px] flex items-center justify-center`}>
        <Image
          src={event.image}
          alt={event.name}
          width={event.width || 229}
          height={event.height || 207}
          className="object-contain"
          priority
        />
      </div>

      <div className="
        w-[279px]
        h-[337px]
        bg-linear-to-t from-[#FFE296] to-[#FFFFFF]
        border-[3px]
        border-black
        rounded-[40px]
        flex flex-col
        items-center
        pt-24
        px-4
        pb-6
      ">
        <h3 className="font-nunito text-[22px] font-extrabold text-black uppercase leading-tight">
          {event.name}
        </h3>
        <p className="font-nunito text-[12px] font-semibold text-gray-400 mb-4 uppercase tracking-wider">
          {event.type}
        </p>

        <div className="grid grid-cols-2 gap-2 w-full mb-6">
          {displayTags.slice(0, 4).map((tag, index) => {
            const isTriangleBase = displayTags.length === 3 && index === 2;
            
            return (
              <div 
                key={index} 
                className={`
                  ${tagStyles[index % 4].bg} 
                  ${tagStyles[index % 4].border} 
                  ${isTriangleBase ? "col-span-2 mx-auto w-1/2" : "w-full"}
                  rounded-full py-2 px-1 text-[11px] text-center font-nunito font-bold border-2 text-black truncate
                `}
              >
                {tag}
              </div>
            );
          })}
        </div>
        
        <Link href={event.detailsLink || "#"} className="
          w-[254px]
          h-[44px] 
          bg-[#DD273E] 
          text-white 
          font-nunito
          font-bold 
          rounded-2xl 
          border-2 
          border-black 
          flex
          items-center
          justify-center
          transition-all
          duration-100
          active:scale-95
          active:shadow-none
        ">
          VIEW DETAILS
        </Link>
      </div>
    </div>
  );
}
