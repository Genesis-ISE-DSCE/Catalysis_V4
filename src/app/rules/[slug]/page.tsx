import Container from "@/components/common/Container";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Import your colocated data file
import { eventData } from "./events";

// Next.js 15 requires params to be a Promise for dynamic routes
const RulesPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // Await the params to unwrap them to fix the Next.js sync API error
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Look up the event data based on the URL
  const event = eventData[slug];

  // If the event doesn't exist in our events.ts file, show a 404 page
  if (!event) {
    notFound();
  }

  return (
    <div className="bg-[#FFFFFF] text-black overflow-hidden" style={{ ["--selection-color" as string]: event.selectionColor }}>
      <style>{`::selection { background: ${event.selectionColor}; color: white; }`}</style>
      {/* Hero Section */}
      <div className="relative pt-4 pb-40" style={{ backgroundColor: event.heroColor }}>
        
        {/* Navbar */}
        {/* <Navbar /> */}

        <Container>
          {/* Increased padding here (pt-24 md:pt-28) to add space below the navbar */}
          <div className="flex flex-col items-center pt-24 md:pt-28 relative z-10">
            {/* DYNAMIC: Title */}
            <h2 className="text-[48px] md:text-[68px] leading-none font-['Gliker'] font-semibold text-[#3A001D] text-center">
              {event.title}
            </h2>
            
            {/* DYNAMIC: Subtitle */}
            <p className="mt-5 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] text-center">
              {event.subtitle}
            </p>
            
            {/* DYNAMIC: Tags/Pills */}
            <div className="flex justify-center flex-wrap gap-[6px] mt-6">
              {event.tags.map((tag, index) => {
                const bgColors = ["bg-[#FFD9C3]", "bg-[#E6DBED]", "bg-[#CEF2FF]"];
                const borderColors = ["border-[#FBB993]", "border-[#CCB8E6]", "border-[#A6E0F4]"];
                const colorIdx = index % 3;

                return (
                  <span key={index} className={`${bgColors[colorIdx]} border-2 ${borderColors[colorIdx]} text-[#000000] font-['Nunito'] font-medium text-[13px] px-[15px] py-[10px] rounded-full leading-[18px]`}>
                    {tag}
                  </span>
                );
              })}
            </div>
            
            {/* DYNAMIC: Description */}
            <p className="mt-10 max-w-[753px] text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] text-center px-4">
              {event.description}
            </p>
          </div>
        </Container>

        {/* Hero Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full leading-none z-20 translate-y-[1px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-full h-[80px] md:h-[120px] block">
            <path d="M0,0 C480,240 960,240 1440,0 L1440,180 L0,180 Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <Container>
        <div className="relative py-16 md:py-20">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <Image src={event.image} alt={`${event.title} watermark`} width={800} height={800} className="opacity-[0.15] w-[500px] md:w-[700px] lg:w-[800px] h-auto" />
          </div>
          
          <div className="relative grid md:grid-cols-2 gap-y-[60px] max-w-[1000px] mx-auto z-10 px-4 md:px-0">
            
            {/* DYNAMIC: RULES & GUIDELINES */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] leading-none uppercase">
                RULES & GUIDELINES
              </h3>
              <ul className="list-disc pl-6 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] space-y-2 max-w-[456px]">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className={rule.startsWith("-") ? "list-none -ml-6 pl-6" : ""}>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* DYNAMIC: PRIZES */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] leading-none uppercase">
                PRIZES
              </h3>
              <ul className="text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] space-y-3 max-w-[462px]">
                {event.prizes.map((prize, idx) => (
                  <li key={idx} className="flex items-start gap-2">{prize}</li>
                ))}
              </ul>
            </div>

            {/* DYNAMIC: SCHEDULE */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] leading-none uppercase">
                SCHEDULE
              </h3>
              <ul className="list-disc pl-6 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] space-y-2 max-w-[462px]">
                {event.schedule.map((time, idx) => (
                  <li key={idx}>{time}</li>
                ))}
              </ul>
            </div>

            {/* DYNAMIC: REQUIREMENTS */}
            <div className="flex flex-col items-center gap-[20px] md:gap-[41px]">
              <h3 className="w-full text-center text-[28px] md:text-[36px] font-['Gliker'] font-semibold text-[#3A001D] leading-none uppercase">
                REQUIREMENTS
              </h3>
              <ul className="list-disc pl-6 text-[18px] md:text-[20px] leading-[27px] font-['Nunito'] font-medium text-[#000000] space-y-2 max-w-[462px]">
                {event.requirements.map((req, idx) => (
                  <li key={idx} className={req.startsWith("-") ? "list-none -ml-6 pl-6" : ""}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </Container>

      {/* Footer / CTA Area */}
      <div className="flex flex-col items-center text-center py-20 relative z-10 bg-[#FFFFFF]">
        <Image 
          src="/catalysis.png" 
          alt="catalysis logo" 
          width={225} 
          height={82} 
          className="mx-auto mb-10" 
          style={{ width: "auto", height: "auto" }} 
          priority 
        />
        <h2 className="text-[48px] md:text-[68px] leading-[120%] font-['Gliker'] font-semibold text-[#000000] max-w-[974px]">
          Ready to Prove Your Speed?
        </h2>
        <p className="mt-4 text-[18px] md:text-[22px] leading-[30px] font-['Nunito'] font-medium text-[#454545] max-w-[554px]">
          Don&apos;t miss your chance to innovate, compete, and win.
        </p>
        <Link 
          href="/register"
          className="mt-12 inline-block bg-[#DD273E] hover:scale-105 transition-transform active:scale-95 shadow-[0_4px_0_#000000] text-[#FFFFFF] px-[30px] py-[20px] rounded-[20px] border-2 border-[#000000] font-['Nunito'] font-extrabold text-[20px] leading-none"
          style={{ transform: "matrix(1, 0.04, -0.05, 1, 0, 0)" }}
        >
          REGISTER NOW
        </Link>
      </div>
      
      {/* <footer className="text-center pb-8 bg-[#FFFFFF]">
        <p className="font-['Nunito'] font-medium text-[15px] leading-[20px] text-[#000000]">
          ©Copyright Catalysis 2026. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default RulesPage;