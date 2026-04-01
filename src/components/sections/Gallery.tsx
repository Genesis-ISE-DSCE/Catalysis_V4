"use client";

import Container from "@/components/common/Container";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const images: string[] = [
  "/gallery/1.JPG","/gallery/2.JPG","/gallery/3.JPG",
  "/gallery/4.JPG","/gallery/5.JPG","/gallery/6.JPG",
  "/gallery/7.JPG","/gallery/8.JPG","/gallery/9.JPG",
  "/gallery/10.JPG","/gallery/11.JPG","/gallery/12.JPG","/gallery/13.JPG",
  "/gallery/14.JPG","/gallery/15.JPG","/gallery/16.JPG",
  "/gallery/17.JPG","/gallery/18.JPG","/gallery/19.JPG",
  "/gallery/20.JPG","/gallery/11.JPG","/gallery/12.JPG","/gallery/13.JPG",
  "/gallery/14.JPG","/gallery/15.JPG","/gallery/16.JPG",
  "/gallery/17.JPG","/gallery/18.JPG","/gallery/19.JPG",
  "/gallery/20.JPG"
];

const imagesRow1 = [...images.slice(0, 10)];
const imagesRow2 = [...images.slice(10, 20)];
const imagesRow3 = [...images.slice(20, 30)];

interface DesktopRowProps {
  images: string[];
  reverse?: boolean;
}

function DesktopRow({ images, reverse = false }: DesktopRowProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full overflow-hidden group">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView="auto"
        loop={true}
        allowTouchMove={true}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        speed={5000}
        freeMode={true}
        onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper; }}
      >
        {[...images, ...images].map((src, i) => (
          <SwiperSlide key={i} style={{ width: "260px" }}>
            <div
              onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
              onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              className="relative mb-3 mt-3 w-full h-[200px] rounded-[1.5rem] overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <Image
                src={src}
                alt={`Gallery ${i}`}
                fill
                className="object-cover transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-28 bg-[#FFEEF0]">
      <Container>
        <div className="rounded-[3rem] p-10 md:p-20 border-2 border-black bg-[#FAF7ED] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">

          <div className="flex flex-col items-center text-center mb-16">
            
            <div className="inline-block border-2 border-black rounded-full px-7 py-2 bg-white text-sm md:text-base font-semibold mb-8">
              GALLERY
            </div>

            <div className="mb-8">
              <h1 className="font-gliker font-medium text-[34px] sm:text-[42px] md:text-[52px] leading-[1.08] tracking-[-0.005em] text-[#3A001D] max-w-[650px]">
                Moments from the Past
              </h1>
            </div>

            <p className="text-[#3b0a1e] font-nunito text-base md:text-xl max-w-2xl leading-relaxed">
              Explore a detailed look at our past events and experience the vibrant energy that truly defines Catalysis, showcasing the passion and innovation that drive our community forward.
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-5">
            <DesktopRow images={imagesRow1} reverse={true} />
            <DesktopRow images={imagesRow2} reverse={false} />
            <DesktopRow images={imagesRow3} reverse={true} />
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
                  <div className="relative aspect-[4/5] w-full rounded-[1.2rem] overflow-hidden border-2 border-black">
                    <Image src={src} alt={`Gallery ${i}`} fill className="object-cover" />
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