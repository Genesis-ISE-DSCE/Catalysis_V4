"use client";

import Container from "@/components/common/Container";
// import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const qna = [
  {
    question: "What is Catalysis?",
    answer:
      "Catalysis V4.0 is a 2-day interdepartmental technical fest organised by Club Genesis, the student club of the Department of Information Science & Engineering (ISE), DSCE Bangalore.",
  },
  {
    question: "When and where will Catalysis V4.0 take place?",
    answer:
      "Catalysis V4.0 will take place on April 17–18, 2026, at the Department of Information Science & Engineering, DSCE Bangalore.",
  },
  {
    question: "Who can participate in Catalysis?",
    answer:
      "The fest is open to all students from DSCE, DSU, and DSATM. Students from all three campuses are welcome to join!",
},
  {
    question: "What type of events can I expect?",
    answer:
      "The fest includes Technoseek (scavenger hunt), Coding Relay (team coding), DSA Smackdown (algorithms), Typemaster (typing speed), Clash Royale (gaming), and PitchDexs (startup pitching).",
  },
  {
    question: "Can non-IT students join the action?",
    answer:
      "Absolutely! Catalysis welcomes tech enthusiasts from all branches to come and unleash their skills.",
  },
  {
    question: "Will there be prizes?",
    answer:
      "Yes! There is a total prize pool of over Rs. 25,000 across all events, plus trophies, merit certificates, and bragging rights.",
  },
  {
    question: "How can I participate in Catalysis V4?",
    answer:
      "Register online through the official website using the Register Now button and secure your spot at Catalysis V4.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.08 });
  const inView = isInView ? "in-view" : "";

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-[#FFEEF0] dark:bg-[#0A0018]">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div className={`flex flex-col reveal reveal-left ${inView}`}>
            <div className="mb-6">
               <div className="inline-block border border-black dark:border-white/20 rounded-full px-5 py-1 bg-white dark:bg-[#160030] dark:text-white/70 text-sm font-medium mb-6">
                 FAQs
               </div>

               <div className="mb-6">
                <h1 className="font-gliker font-medium text-[34px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.005em] text-[#3A001D] dark:text-white max-w-[650px]">
                  Frequently Asked Questions
                </h1>
               </div>

               <p className="text-[#3b0a1e] dark:text-white/55 font-nunito text-lg leading-relaxed">
                Got questions? We&apos;ve got answers. Feel free to reach out anytime and we&apos;ll be happy to help.
               </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {qna.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className={`reveal reveal-right ${inView} reveal-delay-${Math.min(i + 1, 4)}`}
                >
                <div
                  className={`rounded-3xl overflow-hidden border-2 border-black dark:border-white/15 transition-all duration-300 ${
                    isOpen ? "shadow-md" : "bg-white dark:bg-[#160030]"
                  }`}
                >
                  <div
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`flex justify-between items-center px-6 py-5 cursor-pointer transition-colors ${
                      isOpen ? "bg-[#E3242B] text-white border-b-2 border-black dark:border-white/15" : "text-[#3b0a1e] dark:text-white/80"
                    }`}
                  >
                    <span className="text-2xl font-black tracking-tight font-['Gliker']">
                      {item.question}
                    </span>
                    <span
                      className="text-3xl font-bold transition-transform duration-300 inline-block"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </div>

                  <div
                    className={`bg-white dark:bg-[#160030] text-[#3b0a1e] dark:text-white/60 transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen 
                        ? "max-h-[500px] py-6 px-6 opacity-100" 
                        : "max-h-0 py-0 px-6 opacity-0"
                    }`}
                  >
                    <p className="text-lg font-medium leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}