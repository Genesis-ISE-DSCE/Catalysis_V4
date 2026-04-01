import Image from "next/image";

export default function CTA() {
  return (
    <section id="cta" className="relative pt-32 pb-0 bg-[#f5eaea]">
      <div className="w-full relative">
        <div className="absolute -top-12 left-0 right-0 h-20 bg-[#FF94a5] rounded-t-[3rem] border-t-2 border-x-2 border-black z-0" />
        <div className="absolute -top-8 left-0 right-0 h-20 bg-[#fc7d8d] rounded-t-[3rem] border-t-2 border-x-2 border-black z-10" />
        <div className="absolute -top-4 left-0 right-0 h-20 bg-[#e06675] rounded-t-[3rem] border-t-2 border-x-2 border-black z-20" />

        <div className="relative bg-[#dd273e] text-white py-20 px-6 rounded-t-[3rem] border-t-2 border-black flex flex-col items-center text-center z-30">

          <div className="mb-8 transition-transform hover:scale-105">
            <Image
              src="/catalysis.png"
              alt="Catalysis Logo"
              width={192}
              height={64}
              className="h-auto w-auto"
            />
          </div>

          <div className="mb-6">
            <div className="block md:hidden">
              <Image
                src="/last/heading-phone.png"
                alt="Ready to Be Part of Catalysis?"
                width={400}
                height={200}
                className="max-w-full h-auto"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="font-gliker font-semibold text-[34px] sm:text-[42px] md:text-[62px] leading-[1.08] tracking-[-0.005em] text-white max-w-[650px]">
                Ready to Be Part of Catalysis?
              </h1>
            </div>
          </div>

          <p className="mb-12 text-lg md:text-xl font-nunito opacity-100 max-w-xl">
            Don&apos;t miss your chance to innovate, compete, and win.
          </p>


          <div
            className="relative group cursor-pointer"
            style={{ transform: "rotate(3deg)" }}
          >
   
            <div
              className="absolute inset-0 rounded-3xl bg-black z-0"
              style={{ transform: "translate(4px, 7px)" }}
            />

            <button
              className="
                relative z-10
                bg-white text-black
                font-black tracking-widest uppercase
                px-14 md:px-20 py-4 md:py-5
                rounded-3xl cursor-pointer
                border-[3px] border-black
                transition-transform duration-150
                group-hover:-translate-y-1
                group-active:translate-y-[5px] group-active:translate-x-[3px]
              "
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
            >
              REGISTER NOW
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}