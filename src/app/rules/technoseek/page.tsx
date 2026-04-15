import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";

const TechnoseekPage = () => {
  return (
    <div
      className="bg-[#FFFFFF] dark:bg-[#0A0018] text-black dark:text-white overflow-hidden"
      style={{ ["--selection-color" as string]: "#C45B5B" }}
    >
      <style>{`::selection { background: #C45B5B; color: white; }`}</style>

      {/* Hero Section */}
      <div className="relative pt-4 pb-40" style={{ backgroundColor: "#C45B5B" }}>
        <Container>
          <div className="flex flex-col items-center pt-24 md:pt-28 relative z-10">

            {/* Title */}
            <h2 className="text-[48px] md:text-[68px] leading-none font-['Gliker'] font-semibold text-[#3A001D] dark:text-white text-center">
              Technoseek
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] dark:text-white/80 text-center">
              Hunt the tech, solve the clues, and conquer the challenge
            </p>

            {/* Tags */}
            <div className="flex justify-center flex-wrap gap-[6px] mt-6">
  
                <span className="bg-[#FFD9C3] border-2 border-[#FBB993] text-[#000000] dark:text-white/80 font-['Nunito'] font-medium text-[13px] px-[15px] py-[10px] rounded-full leading-[18px]">
                    <Link href="https://technoseek-hint.vercel.app/wf96gclp3oceol84cbi3vfrukzq7no9xb" target="_blank" rel="noopener noreferrer">
                        Scavenger Hunt
                    </Link>
                </span>

                <span className="bg-[#E6DBED] border-2 border-[#CCB8E6] text-[#000000] dark:text-white/80 font-['Nunito'] font-medium text-[13px] px-[15px] py-[10px] rounded-full leading-[18px]">
                    Tech Puzzles
                </span>

                <span className="bg-[#CEF2FF] border-2 border-[#A6E0F4] text-[#000000] dark:text-white/80 font-['Nunito'] font-medium text-[13px] px-[15px] py-[10px] rounded-full leading-[18px]">
                    Team of 3
                </span>

            </div>

            {/* Description */}
            <p className="mt-10 max-w-[753px] text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] dark:text-white/80 text-center px-4">
              Starting at the Amphitheatre, navigate through mind-bending technical puzzles and clues spread across the entire campus. Teams of 3 race against the clock — winning is determined by total time including penalties. Use fewer hints to break ties.
            </p>
          </div>
        </Container>

        {/* Hero Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full leading-none z-20 translate-y-[1px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-full h-[80px] md:h-[120px] block">
            <path d="M0,0 C480,240 960,240 1440,0 L1440,180 L0,180 Z" className="fill-white dark:fill-[#0A0018]"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <Container>
        <div className="relative py-16 md:py-20">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <Image
              src="/pokemons/zoroark.svg"
              alt="Technoseek watermark"
              width={800}
              height={800}
              className="opacity-[0.15] w-[500px] md:w-[700px] lg:w-[800px] h-auto"
            />
          </div>

          <div className="relative grid md:grid-cols-2 gap-y-[60px] max-w-[1000px] mx-auto z-10 px-4 md:px-0">

            {/* RULES */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] dark:text-white leading-none uppercase">
                RULES & GUIDELINES
              </h3>
              <ul className="list-disc pl-6 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] dark:text-white/80 space-y-2 max-w-[456px]">
                {[
                  "Team of exactly 3 members required",
                  "Starting point: Amphitheatre; entire event takes place on campus",
                  "Teams must carry at least one laptop",
                  "Solve technical clues and puzzles to progress",
                  "Winning determined by total completion time (including penalties)",
                  "Hint requests are allowed but carry a time penalty",
                  "Tiebreaker: Team using fewer hints wins",
                  "Bonus round conducted if a tie still persists",
                  "No outside internet assistance for offline clues",
                  "Any destruction of campus property leads to immediate disqualification",
                  "Decisions by clue-masters are final"
                ].map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* PRIZES */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] dark:text-white leading-none uppercase">
                PRIZES
              </h3>
              <ul className="text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] dark:text-white/80 space-y-3 max-w-[462px]">
                {[
                  "🥇 1st Place Team: ₹5,000 + Trophy",
                  "🥈 2nd Place Team: ₹2,500 + Certificate",
                  "Total Prize Pool: ₹7,500"
                ].map((prize, idx) => (
                  <li key={idx} className="flex items-start gap-2">{prize}</li>
                ))}
              </ul>
            </div>

            {/* SCHEDULE */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] dark:text-white leading-none uppercase">
                SCHEDULE
              </h3>
              <ul className="list-disc pl-6 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] dark:text-white/80 space-y-2 max-w-[462px]">
                {[
                  "Date: Day 1 - Friday, 17 April",
                  "Time: 10:30 AM - 4:00 PM"
                ].map((time, idx) => (
                  <li key={idx}>{time}</li>
                ))}
              </ul>
            </div>

            {/* REQUIREMENTS */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] dark:text-white leading-none uppercase">
                REQUIREMENTS
              </h3>
              <ul className="list-disc pl-6 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] dark:text-white/80 space-y-2 max-w-[462px]">
                {[
                  "Team of exactly 3 members",
                  "At least one laptop per team",
                  "QR Code Scanner app installed",
                  "Valid college ID proof for all members"
                ].map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </Container>

      {/* Footer */}
      <div className="flex flex-col items-center text-center py-20 relative z-10 bg-[#FFFFFF] dark:bg-[#0A0018]">
        <h2 className="text-[48px] md:text-[68px] leading-[120%] font-['Gliker'] font-semibold text-[#000000] dark:text-white/80 max-w-[974px]">
          Ready to Prove Your Speed?
        </h2>

        <p className="mt-4 text-[18px] md:text-[22px] leading-[30px] font-['Nunito'] font-medium text-[#454545] dark:text-white/55 max-w-[554px]">
          Don't miss your chance to innovate, compete, and win at Catalysis 4.0.
        </p>

        <Link
          href="/register"
          className="mt-12 inline-block bg-[#DD273E] hover:scale-105 transition-transform active:scale-95 shadow-[0_4px_0_#000000] dark:shadow-[0_0_20px_rgba(255,45,85,0.4)] text-[#FFFFFF] px-[30px] py-[20px] rounded-[20px] border-2 border-[#000000] dark:border-transparent font-['Nunito'] font-extrabold text-[20px] leading-none"
          style={{ transform: "matrix(1, 0.04, -0.05, 1, 0, 0)" }}
        >
          REGISTER NOW
        </Link>
      </div>
    </div>
  );
};

export default TechnoseekPage;
