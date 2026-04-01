"use client";

import Container from "@/components/common/Container";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", 
  "/gallery/4.jpg", "/gallery/5.jpg", "/gallery/6.jpg", 
  "/gallery/7.jpg", "/gallery/8.jpg", "/gallery/9.jpg",
  "/gallery/10.jpg", "/gallery/11.jpg"
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-[#FFEEF0]">
      <Container>
        <div className="rounded-[3rem] p-8 md:p-16 border-2 border-black bg-[#FAF7ED] shadow-sm relative overflow-hidden">
          
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block border border-black rounded-full px-6 py-1 bg-white text-sm font-medium mb-8">
              GALLERY
            </div>
            
            <div className="mb-6">
              <Image 
                src="/gallery-heading.png" 
                alt="Moments from the Past" 
                width={600} 
                height={120}
                className="object-contain w-auto h-auto"
              />
            </div>

            <p className="text-[#3b0a1e] font-medium text-lg md:text-xl max-w-3xl leading-relaxed">
              Explore a detailed look at our past events and experience the vibrant energy that truly defines Catalysis, showcasing the passion and innovation that drive our community forward.
            </p>
          </div>

          <div className="hidden md:grid grid-cols-12 auto-rows-[100px] gap-4">
            
            <div className="col-span-2 row-span-3 relative rounded-[2rem] overflow-hidden border-2 border-black">
              <Image src="/gallery/1.jpg" alt="Past event" fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
            </div>
            <div className="col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden border-2 border-black mt-[-40px]">
              <Image src="/gallery/2.jpg" alt="Coding session" fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
            </div>

            <div className="col-span-2 row-span-4 relative rounded-[2rem] overflow-hidden border-2 border-black">
              <Image src="/gallery/3.jpg" alt="Workshop" fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
            </div>

            <div className="col-span-4 row-span-5 relative rounded-[3rem] overflow-hidden border-2 border-black">
              <Image src="/gallery/4.jpg" alt="Team collab" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>

            <div className="col-span-2 row-span-4 relative rounded-[2rem] overflow-hidden border-2 border-black">
              <Image src="/gallery/5.jpg" alt="Presenting" fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
            </div>

            <div className="col-span-3 row-span-3 relative rounded-[2rem] overflow-hidden border-2 border-black mt-[-100px]">
              <Image src="/gallery/6.jpg" alt="Focus" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
            </div>

            <div className="col-span-5 row-span-3 relative rounded-[3rem] overflow-hidden border-2 border-black mt-[-100px]">
              <Image src="/gallery/7.jpg" alt="Workspace" fill sizes="(min-width: 768px) 41vw, 100vw" className="object-cover" />
            </div>

            <div className="col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden border-2 border-black mt-[-100px]">
              <Image src="/gallery/8.jpg" alt="Networking" fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
            </div>
            <div className="col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden border-2 border-black mt-[-100px]">
              <Image src="/gallery/9.jpg" alt="Tech setup" fill sizes="(min-width: 768px) 16vw, 100vw" className="object-cover" />
            </div>
          </div>

          <div className="md:hidden w-full">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border-2 border-black">
                    <Image src={src} alt={`Gallery ${i + 1}`} fill sizes="80vw" className="object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </Container>

      <style jsx global>{`
        .swiper-pagination-bullet { background: black !important; }
        .swiper-pagination-bullet-active { background: #E3242B !important; width: 20px; border-radius: 5px; }
      `}</style>
    </section>
  );
}