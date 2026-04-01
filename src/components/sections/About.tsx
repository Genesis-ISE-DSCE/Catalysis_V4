import Image from "next/image";
import Container from "@/components/common/Container";

function AboutMobile() {
  const MOBILE_BADGES = [
    { src: "/about/pitch.png", top: "5%", left: "46%" },
    { src: "/about/dsa.png", top: "20%", left: "10%" },
    { src: "/about/valorant.png", top: "20%", left: "82%" },
    { src: "/about/technoseek.png", top: "50%", left: "10%" },
    { src: "/about/typemaster.png", top: "50%", left: "82%" },
    { src: "/about/coding-relay.png", top: "68%", left: "25%" },
    { src: "/about/ui-ux.png", top: "68%", left: "68%" },
  ];

  return (
    <div className="relative w-full h-[320px] flex items-center justify-center">

      <div className="absolute -mt-22 z-20">
        <Image
          src="/hero/Pokeball.png"
          alt="Pokeball"
          width={100}
          height={100}
          className="drop-shadow-xl"
        />
      </div>

      {MOBILE_BADGES.map((badge, i) => (
        <div
          key={i}
          className="absolute z-30"
          style={{
            top: badge.top,
            left: badge.left,
            transform: "translate(-50%, -50%)",
            width: "110px",
            height: "70px",
          }}
        >
          <Image
            src={badge.src}
            alt="event"
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
      ))}
    </div>
  );
}

function AboutLeft() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10">
      <div className="mb-6">
        <Image src="/about/about-us.png" alt="About Us" width={120} height={40} />
      </div>
      <div className="mb-8">
        <Image
          src="/about/What is Catalysis_.png"
          alt="What is Catalysis?"
          width={450}
          height={80}
          className="mx-auto lg:mx-0"
        />
      </div>
      <div className="space-y-6 text-[#3b0a1e] text-lg font-medium leading-relaxed max-w-xl">
        <p>
          Catalysis is not just an event, it's a platform designed to spark innovation and accelerate ideas into reality. Over the course of three days, participants will engage in multiple events ranging from technical challenges to creative competitions.
        </p>
        <p>
          Catalysis offers something for everyone. It's a space to learn, compete, collaborate, and grow.
        </p>
      </div>
    </div>
  );
}
const BADGES = [
  { src: "/about/pitch.png", top: "11%", left: "45%" },
  { src: "/about/dsa.png", top: "24%", left: "25%" },
  { src: "/about/valorant.png", top: "24%", left: "78%" },
  { src: "/about/technoseek.png", top: "37%", left: "5%" },
  { src: "/about/typemaster.png", top: "37%", left: "58%" },
  { src: "/about/coding-relay.png", top: "50%", left: "38%" },
  { src: "/about/ui-ux.png", top: "63%", left: "58%" },
];

const LINES = [
  { src: "/about/Vector-1.png", top: "23%", left: "-35%", width: 270 },
  { src: "/about/Vector-2.png", top: "35%", left: "-30%", width: 250 },
  { src: "/about/Vector-3.png", top: "48%", left: "-30%", width: 180 },
  { src: "/about/Vector-4.png", top: "53%", left: "-30%", width: 260 },
  { src: "/about/Vector-5.png", top: "60%", left: "-35%", width: 300 },
];

function AboutRight() {
  return (
    <div className="relative w-full h-[600px] flex items-center">

      <div className="absolute inset-0 z-10">
        {LINES.map((line, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: line.top,
              left: line.left,
              width: `${line.width}px`,
              height: "auto",
            }}
          >
            <Image
              src={line.src}
              alt="connection line"
              width={line.width}
              height={100}
              className="object-contain opacity-80"
            />
          </div>
        ))}
      </div>
      <div className="relative w-full h-full">
        {BADGES.map((badge, i) => (
          <div
            key={i}
            className="absolute z-20 transition-transform hover:scale-105"
            style={{
              top: badge.top,
              left: badge.left,
              width: "240px",
              height: "140px",
            }}
          >
            <Image
              src={badge.src}
              alt="Event Type"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#FFEEF0] py-16 md:py-24 overflow-hidden"
    >
      <Container>

        <div className="block lg:hidden space-y-10">

          <AboutLeft />

          <AboutMobile />

        </div>

        <div className="hidden lg:grid grid-cols-3 gap-8 items-center">

          <div className="lg:col-span-1">
            <AboutLeft />
          </div>
          <div className="flex justify-center z-20">
            <Image
              src="/hero/Pokeball.png"
              alt="Pokeball"
              width={250}
              height={250}
              className="transition-transform hover:scale-105 drop-shadow-2xl"
            />
          </div>

          <div className="lg:col-span-1">
            <AboutRight />
          </div>

        </div>

      </Container>

      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/30 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
    </section>
  );
}