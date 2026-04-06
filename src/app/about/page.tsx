import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-[#FDE8EC] font-nunito text-[#1A0A0E] overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee 18s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="bg-[#E8192C] pt-20 pb-16 px-6 md:px-12 relative overflow-hidden border-b-4 border-[#1A0A0E]">
        <div className="absolute -top-5 left-0 w-full font-gliker text-[100px] md:text-[140px] text-white/5 tracking-[8px] whitespace-nowrap pointer-events-none animate-marquee-fast">
          GENESIS GENESIS GENESIS GENESIS GENESIS GENESIS GENESIS GENESIS
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="inline-block bg-[#F5C518] text-[#1A0A0E] font-black text-xs tracking-[2px] px-5 py-1.5 rounded-full border-2 border-[#1A0A0E] mb-7 uppercase">
            About the club
          </div>
          
          <h1 className="font-gliker text-[72px] md:text-[120px] text-white leading-[0.9] tracking-[4px]" style={{ textShadow: '6px 6px 0 #1A0A0E' }}>
            Meet<br /><span className="text-[#F5C518]">Genesis.</span>
          </h1>
          
          <p className="text-lg text-white/90 max-w-[520px] mt-6 leading-relaxed font-semibold">
            The Student Forum of the Department of ISE at DSCE — a collective on a mission to turn wild ideas into unforgettable technical experiences.
          </p>
        </div>

        <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-15">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_12s_linear_infinite]">
            <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="10"/>
            <path d="M5 100 H195" stroke="white" strokeWidth="10"/>
            <circle cx="100" cy="100" r="28" fill="white"/>
            <circle cx="100" cy="100" r="16" stroke="white" strokeWidth="6" fill="none"/>
          </svg>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div className="bg-[#F5C518] border-b-4 border-[#1A0A0E] overflow-hidden">
        <div className="flex animate-marquee-slow w-max">
          {/* First Set */}
          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">8+</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Years Running</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>
          
          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">8</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Hackman Editions</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>

          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">3</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Catalysis Fests</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>

          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">5000+</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Total Participants</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>

          {/* Duplicated Set for Seamless Looping */}
          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">8+</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Years Running</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>
          
          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">8</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Hackman Editions</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>

          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">3</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Catalysis Fests</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>

          <div className="flex items-center gap-3 py-5 px-12 border-r-4 border-[#1A0A0E] whitespace-nowrap">
            <span className="font-gliker text-4xl tracking-[2px] text-[#1A0A0E]">5000+</span>
            <span className="font-extrabold text-[13px] tracking-[1px] uppercase text-[#1A0A0E]">Total Participants</span>
          </div>
          <div className="flex items-center justify-center border-r-4 border-[#1A0A0E] px-6">
             <div className="w-2.5 h-2.5 bg-[#E8192C] rounded-full border-2 border-[#1A0A0E]"></div>
          </div>
        </div>
      </div>

      {/* ── ABOUT SECTION ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-[#1A0A0E]">
        <div className="px-6 py-12 md:p-14 lg:p-16 bg-white border-b-4 md:border-b-0 md:border-r-4 border-[#1A0A0E]">
          <div className="font-black text-[11px] tracking-[3px] uppercase text-[#E8192C] mb-4 flex items-center gap-2">
            <span className="block w-6 h-[3px] bg-[#E8192C] rounded-sm"></span>
            Our story
          </div>
          <h2 className="font-gliker text-5xl md:text-[56px] leading-none tracking-[3px] text-[#1A0A0E] mb-7">
            Born to <span className="text-[#E8192C]">Build</span> Things.
          </h2>
          <div className="space-y-5 text-[16px] leading-[1.75] text-[#444] font-semibold">
            <p>Genesis is the official Student Forum of the Department of Information Science and Engineering (ISE) at Dayananda Sagar College of Engineering (DSCE).</p>
            <p>What started in 2017 with our foundational 24-hour hackathons and quiz contests has blossomed into a campus powerhouse. We believe the best learning happens when you throw yourself into the deep end—which is why we orchestrate everything from mock placements and technical workshops to our flagship multi-day fest, Catalysis.</p>
            <p>Our name says it all. Genesis is the beginning of everything — and that&apos;s exactly the energy we bring to every project, every event, every idea.</p>
          </div>
        </div>
        
        <div className="bg-[#E8192C] flex flex-col justify-center items-center p-12 md:p-14 relative overflow-hidden gap-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-gliker text-[80px] lg:text-[120px] text-white/5 tracking-[8px] whitespace-nowrap pointer-events-none">
            GENESIS
          </div>
          
          <div className="bg-[#F5C518] border-4 border-[#1A0A0E] rounded-2xl py-5 px-9 text-center shadow-[5px_5px_0_#1A0A0E] -rotate-3 relative z-10">
            <div className="font-gliker text-6xl md:text-[72px] leading-none tracking-[4px] text-[#1A0A0E]">2017</div>
            <div className="font-black text-xs tracking-[2px] uppercase text-[#1A0A0E] mt-1">Est. Year One</div>
          </div>
          
          <div className="flex flex-col gap-3 relative z-10 mt-4">
            <div className="bg-white border-4 border-[#1A0A0E] rounded-full py-3 px-7 font-black text-[15px] tracking-[0.5px] flex items-center gap-2.5 shadow-[4px_4px_0_#1A0A0E] rotate-[1.5deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1A0A0E] transition-all cursor-default">
              <div className="w-3 h-3 rounded-full border-2 border-[#1A0A0E] bg-[#E8192C] shrink-0"></div>
              Build Fast, Learn Faster
            </div>
            <div className="bg-white border-4 border-[#1A0A0E] rounded-full py-3 px-7 font-black text-[15px] tracking-[0.5px] flex items-center gap-2.5 shadow-[4px_4px_0_#1A0A0E] -rotate-[1.5deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1A0A0E] transition-all cursor-default">
              <div className="w-3 h-3 rounded-full border-2 border-[#1A0A0E] bg-[#3B6FC4] shrink-0"></div>
              Ship Real Things
            </div>
            <div className="bg-white border-4 border-[#1A0A0E] rounded-full py-3 px-7 font-black text-[15px] tracking-[0.5px] flex items-center gap-2.5 shadow-[4px_4px_0_#1A0A0E] rotate-[1.5deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1A0A0E] transition-all cursor-default">
              <div className="w-3 h-3 rounded-full border-2 border-[#1A0A0E] bg-[#F5C518] shrink-0"></div>
              Grow Together
            </div>
            <div className="bg-white border-4 border-[#1A0A0E] rounded-full py-3 px-7 font-black text-[15px] tracking-[0.5px] flex items-center gap-2.5 shadow-[4px_4px_0_#1A0A0E] -rotate-[1.5deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1A0A0E] transition-all cursor-default">
              <div className="w-3 h-3 rounded-full border-2 border-[#1A0A0E] bg-[#E8192C] shrink-0"></div>
              Compete to Excel
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION SECTION ── */}
      <section className="py-20 px-6 md:px-12 bg-[#FDE8EC] border-b-4 border-[#1A0A0E]">
        <h2 className="font-gliker text-[48px] md:text-[56px] tracking-[3px] text-center text-[#1A0A0E] mb-14">
          What We <span className="text-[#E8192C]">Stand For</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {/* Card 1 */}
          <div className="bg-[#F5C518] border-4 border-[#1A0A0E] rounded-2xl p-8 lg:p-10 shadow-[6px_6px_0_#1A0A0E] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#1A0A0E] transition-all relative overflow-hidden group">
            <h3 className="font-gliker text-3xl tracking-[2px] mb-3 leading-none text-[#1A0A0E]">Ignite Ideas</h3>
            <p className="text-[15px] leading-[1.65] text-[#555] font-semibold">
              From Machine Learning to Android Dev, we create spaces where half-baked thoughts become fully-formed innovations. Every idea deserves a stage.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white border-4 border-[#1A0A0E] rounded-2xl p-8 lg:p-10 shadow-[6px_6px_0_#1A0A0E] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#1A0A0E] transition-all relative overflow-hidden group">
            <h3 className="font-gliker text-3xl tracking-[2px] mb-3 leading-none text-[#1A0A0E]">Build Community</h3>
            <p className="text-[15px] leading-[1.65] text-[#555] font-semibold">
              Genesis is a tribe of makers. We connect students, organize blood drives, and step into local schools to teach internet safety to the next generation.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#3B6FC4] text-white border-4 border-[#1A0A0E] rounded-2xl p-8 lg:p-10 shadow-[6px_6px_0_#1A0A0E] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#1A0A0E] transition-all relative overflow-hidden group">
            <h3 className="font-gliker text-3xl tracking-[2px] mb-3 leading-none">Celebrate Growth</h3>
            <p className="text-[15px] leading-[1.65] text-white/85 font-semibold">
              We don&apos;t just run competitions — we prepare you for the future. From "Tech-Scoffing" mock placements to alumni guidance for higher studies abroad.
            </p>
          </div>
        </div>
      </section>

      {/* ── HISTORY SECTION ── */}
      <section className="bg-[#1A0A0E] py-20 px-6 md:px-12 border-b-4 border-[#1A0A0E]">
        <h2 className="font-gliker text-[48px] md:text-[56px] tracking-[3px] text-[#F5C518] text-center mb-16">
          Our Journey
        </h2>
        
        <div className="max-w-[800px] mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-[#E8192C] md:-translate-x-1/2"></div>
          
          {/* Timeline Item 1 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12 items-start relative pl-12 md:pl-0">
            <div className="absolute left-[8px] top-[24px] md:static md:mt-7 w-6 h-6 bg-[#F5C518] border-[3px] border-[#1A0A0E] rounded-full shrink-0 shadow-[0_0_0_4px_#E8192C] z-10"></div>
            <div className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl p-7 backdrop-blur-md md:order-first">
              <div className="font-gliker text-[40px] tracking-[3px] text-[#E8192C] mb-2 leading-none">2017–19</div>
              <h4 className="font-black text-[18px] text-white mb-2.5">The Foundation & Hackman</h4>
              <p className="text-[14px] text-white/65 leading-[1.6] font-semibold">
                Genesis laid its groundwork by hosting foundational coding contests and its massive 24-hour hackathon, HACKMAN 2.0. We focused heavily on "Tech-Scoffing" mock placements and Machine Learning workshops.
              </p>
            </div>
            <div className="hidden md:block flex-1"></div>
          </div>

          {/* Timeline Item 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-12 mb-12 items-start relative pl-12 md:pl-0">
            <div className="absolute left-[8px] top-[24px] md:static md:mt-7 w-6 h-6 bg-[#F5C518] border-[3px] border-[#1A0A0E] rounded-full shrink-0 shadow-[0_0_0_4px_#E8192C] z-10"></div>
            <div className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl p-7 backdrop-blur-md md:order-first">
              <div className="font-gliker text-[40px] tracking-[3px] text-[#E8192C] mb-2 leading-none">2019–22</div>
              <h4 className="font-black text-[18px] text-white mb-2.5">Industry & Expansion</h4>
              <p className="text-[14px] text-white/65 leading-[1.6] font-semibold">
                We expanded horizons by connecting students with alumni from Amazon and Paytm, inaugurated the cultural "Spectrum Week", and launched the month-long Tech Fest 2K21 featuring events like Byte Me and Blind Coding.
              </p>
            </div>
            <div className="hidden md:block flex-1"></div>
          </div>

          {/* Timeline Item 3 */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12 items-start relative pl-12 md:pl-0">
            <div className="absolute left-[8px] top-[24px] md:static md:mt-7 w-6 h-6 bg-[#F5C518] border-[3px] border-[#1A0A0E] rounded-full shrink-0 shadow-[0_0_0_4px_#E8192C] z-10"></div>
            <div className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl p-7 backdrop-blur-md md:order-first">
              <div className="font-gliker text-[40px] tracking-[3px] text-[#E8192C] mb-2 leading-none">2022–24</div>
              <h4 className="font-black text-[18px] text-white mb-2.5">The Birth of Catalysis</h4>
              <p className="text-[14px] text-white/65 leading-[1.6] font-semibold">
                A massive leap forward. We introduced "Catalysis V1.0", a multi-day inter-departmental tech fest featuring AirCrash and Technoseek. We also launched the "Code Café" series to master Front-end dev and Git.
              </p>
            </div>
            <div className="hidden md:block flex-1"></div>
          </div>

          {/* Timeline Item 4 */}
          <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-12 items-start relative pl-12 md:pl-0">
            <div className="absolute left-[8px] top-[24px] md:static md:mt-7 w-6 h-6 bg-[#F5C518] border-[3px] border-[#1A0A0E] rounded-full shrink-0 shadow-[0_0_0_4px_#E8192C] z-10"></div>
            <div className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl p-7 backdrop-blur-md md:order-first">
              <div className="font-gliker text-[40px] tracking-[3px] text-[#E8192C] mb-2 leading-none">2024–25</div>
              <h4 className="font-black text-[18px] text-white mb-2.5">Ethical AI & Beyond</h4>
              <p className="text-[14px] text-white/65 leading-[1.6] font-semibold">
                Hackman v8 drew 60 teams to tackle Ethical AI and Cognitive Intelligence. We scaled to Catalysis V3.0 and led a profound outreach program teaching internet safety to rural school children in Mandya.
              </p>
            </div>
            <div className="hidden md:block flex-1"></div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#E8192C] py-20 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[200px] opacity-[0.04] pointer-events-none select-none">
          ⚡⚡⚡
        </div>
        
        <h2 className="font-gliker text-5xl md:text-[64px] text-white tracking-[4px] mb-4 relative z-10" style={{ textShadow: '4px 4px 0 #1A0A0E' }}>
          Ready to Join the Crew?
        </h2>
        <p className="text-lg text-white/85 mb-9 font-semibold relative z-10 max-w-2xl mx-auto">
          Whether you want to compete, volunteer, or build the next Catalysis — Genesis has a spot for you.
        </p>
        
        <Link href="/register" className="inline-block bg-white text-[#1A0A0E] font-gliker text-[22px] tracking-[3px] py-4 px-12 rounded-full border-4 border-[#1A0A0E] shadow-[6px_6px_0_#1A0A0E] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#1A0A0E] transition-all relative z-10 uppercase">
          REGISTER NOW
        </Link>
      </section>
    </div>
  );
}