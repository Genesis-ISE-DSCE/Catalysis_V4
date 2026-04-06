import Image from "next/image";
import type { EventShowcase } from "@/data/events";

interface ShowcaseCardProps {
  event: EventShowcase;
  className?: string;
}

export default function ShowcaseCard({ event, className = "" }: ShowcaseCardProps) {
  return (
    <div
      className={`relative bg-white border-black flex flex-col items-center ${className}`}
      style={{
        "--card-w": "clamp(160px, 30vw, 320px)",
        width: "var(--card-w)",
        borderRadius: "calc(var(--card-w) * 0.125)",
        borderWidth: "max(2px, calc(var(--card-w) * 0.01))",
      } as React.CSSProperties}
    >
      {/* Type badge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 border-black rounded-full flex items-center justify-center shadow-sm"
        style={{
          backgroundColor: event.badgeColor,
          width: "calc(var(--card-w) * 0.18)",
          height: "calc(var(--card-w) * 0.18)",
          borderWidth: "max(1px, calc(var(--card-w) * 0.007))",
          padding: "calc(var(--card-w) * 0.03)",
        }}
      >
        <div className="relative w-full h-full">
          <Image src={event.badgeIcon} alt={event.badgeIconAlt} fill className="object-contain" />
        </div>
      </div>

      {/* Image container */}
      <div
        className="w-full flex justify-center items-center border-b border-gray-100 overflow-hidden"
        style={{
          backgroundColor: event.imageBg,
          paddingTop: "calc(var(--card-w) * 0.12)",
          paddingBottom: "calc(var(--card-w) * 0.06)",
          borderTopLeftRadius: "calc(var(--card-w) * 0.115)",
          borderTopRightRadius: "calc(var(--card-w) * 0.115)",
        }}
      >
        <div
          className="relative"
          style={{
            width: "calc(var(--card-w) * 0.65)",
            height: "calc(var(--card-w) * 0.65)",
          }}
        >
          <Image src={event.image} alt={event.name} fill className="object-contain" />
        </div>
      </div>

      {/* Content */}
      <div
        className="w-full flex flex-col items-center text-center"
        style={{ padding: "calc(var(--card-w) * 0.06)" }}
      >
        <h3
          className="font-black tracking-tight text-black uppercase"
          style={{
            fontSize: "calc(var(--card-w) * 0.075)",
            marginBottom: "calc(var(--card-w) * 0.01)",
          }}
        >
          {event.name}
        </h3>
        <p
          className="font-bold text-gray-400 tracking-widest uppercase"
          style={{
            fontSize: "calc(var(--card-w) * 0.035)",
            marginBottom: "calc(var(--card-w) * 0.04)",
          }}
        >
          {event.type}
        </p>

        <div
          className="grid grid-cols-2 w-full"
          style={{
            gap: "calc(var(--card-w) * 0.02)",
            marginBottom: "calc(var(--card-w) * 0.02)",
          }}
        >
          {event.showcaseTags.map((tag, i) => (
            <span
              key={i}
              className="text-black font-bold rounded-full border text-center"
              style={{
                backgroundColor: tag.bg,
                borderColor: tag.border,
                fontSize: "calc(var(--card-w) * 0.032)",
                padding: "calc(var(--card-w) * 0.02) 0",
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
