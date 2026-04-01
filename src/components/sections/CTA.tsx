import Image from "next/image";

export default function CTA() {
  return (
    <section id="cta" className="relative pt-32 pb-0 bg-[#f5eaea]"> 
      <div className="w-full relative">
        {/* Layered background effect */}
        <div className="absolute -top-12 left-0 right-0 h-20 bg-[#FF94a5] rounded-t-[3rem] border-t-2 border-x-2 border-black z-0" />
        <div className="absolute -top-8 left-0 right-0 h-20 bg-[#fc7d8d] rounded-t-[3rem] border-t-2 border-x-2 border-black z-10" />
        <div className="absolute -top-4 left-0 right-0 h-20 bg-[#e06675] rounded-t-[3rem] border-t-2 border-x-2 border-black z-20" />

        <div className="relative bg-[#dd273e] text-white py-20 px-6 rounded-t-[3rem] border-t-2 border-black flex flex-col items-center text-center z-30">
          
          <div className="mb-8 transition-transform hover:scale-105">
            <Image 
              src="/catalysis.png" 
              alt="Catalysis Logo" 
              width={192} // Equivalent to w-48
              height={64} 
              className="h-auto w-auto"
            />
          </div>

          <div className="mb-6">
            {/* Mobile Heading */}
            <div className="block md:hidden">
              <Image 
                src="/last/heading-phone.png" 
                alt="Ready to Be Part of Catalysis?" 
                width={400}
                height={200}
                className="max-w-full h-auto" 
              />
            </div>
            {/* Desktop Heading */}
            <div className="hidden md:block">
              <Image 
                src="/last/heading.png" 
                alt="Ready to Be Part of Catalysis?" 
                width={800}
                height={176} // Based on h-44
                className="max-w-full h-auto" 
              />
            </div>
          </div>

          <p className="mb-12 text-lg md:text-xl font-medium opacity-100 max-w-xl">
            Don&apos;t miss your chance to innovate, compete, and win.
          </p>

          <div className="relative group cursor-pointer transition-transform active:scale-95">
            <div className="absolute top-4 left-0 z-10">
              <Image 
                src="/last/register-shadow.png" 
                alt="" // Decorative shadow
                width={200}
                height={80}
                className="h-16 md:h-20 w-auto" 
              />
            </div>

            <div className="relative z-20 hover:-translate-y-1 transition-transform duration-200">
              <Image 
                src="/last/register.png" 
                alt="Register Now" 
                width={200}
                height={80}
                className="h-16 md:h-20 w-auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}