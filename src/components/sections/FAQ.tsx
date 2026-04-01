"use client";

import Container from "@/components/common/Container";
import Image from "next/image";
import { useState } from "react";

const qna = [
  {
    question: "Is there a participation fee?",
    answer:
      "No, there is absolutely no fee required to participate in this event or activity. You can join freely without any cost or hidden charges involved.",
  },
  {
    question: "Can I join multiple events?",
    answer: "Yes, you can participate in multiple events. Our schedule is designed to allow participants to explore different tracks.",
  },
  {
    question: "Will certificates be provided?",
    answer: "Yes, all participants will receive digital certificates of participation, and winners will receive merit certificates.",
  },
  {
    question: "How do I register?",
    answer: "You can register using the register button on the homepage. Simply fill out the form and you&apos;ll receive a confirmation email.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-[#FFEEF0]">
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="flex flex-col">
            <div className="mb-6">
               <div className="inline-block border border-black rounded-full px-5 py-1 bg-white text-sm font-medium mb-6">
                 FAQs
               </div>
               
               <div className="mb-6">
                <h1 className="font-gliker font-medium text-[34px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.005em] text-[#3A001D] max-w-[650px]">
                  Frequently Asked Questions
                </h1>
               </div>

               <p className="text-[#3b0a1e] font-nunito text-lg leading-relaxed mb-10">
                Don&apos;t hesitate to reach out with any questions you might have, whether they&apos;re big or small. We&apos;re always ready and eager to assist you with anything you need, ensuring you get the support and answers you&apos;re looking for every step of the way!
               </p>
            </div>

            <div className="relative bg-white border-2 border-black rounded-[2rem] p-6 h-36 flex flex-col justify-between shadow-sm">
              <label htmlFor="faq-input" className="sr-only">Type your message</label>
              <input
                id="faq-input"
                placeholder="Type message..."
                className="bg-transparent outline-none w-full text-lg placeholder:text-gray-400 font-medium"
              />
              <div className="flex justify-end">
                <button className="bg-[#E3242B] cursor-pointer text-white font-bold px-6 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all active:scale-95">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {qna.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={i}
                  className={`rounded-3xl overflow-hidden border-2 border-black transition-all duration-300 ${
                    isOpen ? "shadow-md" : "bg-white"
                  }`}
                >
                  <div
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className={`flex justify-between items-center px-6 py-5 cursor-pointer transition-colors ${
                      isOpen ? "bg-[#E3242B] text-white border-b-2 border-black" : "text-[#3b0a1e]"
                    }`}
                  >
                    <span className="text-2xl font-black tracking-tight font-['Gliker']">
                      {item.question}
                    </span>
                    <span className="text-3xl font-bold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>

                  <div 
                    className={`bg-white text-[#3b0a1e] transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 py-6 px-6 opacity-100" : "max-h-0 py-0 px-6 opacity-0"
                    }`}
                  >
                    <p className="text-lg font-medium leading-relaxed">
                      {item.answer}
                    </p>
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