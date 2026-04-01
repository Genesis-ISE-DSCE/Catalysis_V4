import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function Events() {
  return (
    <section id="events" className="py-10 md:py-20 bg-[#FFEEF0] overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">


          <div>
            <SectionHeader
              label="Events"
              title="Discover and Explore Upcoming Events Near You"
              subtitle="Explore an extensive variety of events designed to inspire and engage innovators of all kinds, offering unique opportunities to learn, connect, and grow in your creative journey."
            />

            <Link href = "/events">
              <Button className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl">
                VIEW ALL EVENTS
              </Button>
            </Link>
          </div>
            {/* Responsive Heading Image */}
            <div className="mb-4 md:mb-8">
              {/* Desktop Heading */}
              <Image 
                src="/enents-heading.png" 
                alt="Discover and Explore Upcoming Events Near You" 
                width={500} 
                height={120}
                className="hidden md:block object-contain"
              />
              {/* Mobile Heading - Updated: Reduced width to make it smaller */}
              <Image 
                src="/enents-heading-phone.png" 
                alt="Discover and Explore Upcoming Events Near You" 
                width={200} 
                height={10}
                className="block md:hidden object-contain"
              />
            </div>

            {/* Subtitle - Updated: Smaller text and tighter margin for mobile */}
            <p className="text-[#3b0a1e] font-medium text-sm md:text-xl leading-relaxed max-w-xl -mb-8 md:mb-10">
              Explore an extensive variety of events designed to inspire and engage innovators of all kinds, offering unique opportunities to learn, connect, and grow in your creative journey.
            </p>

            {/* Desktop View Button (Hidden on Mobile) */}
            <button className="hidden lg:block hover:scale-105 active:scale-95 transition-transform">
              <Image 
                src="/events-button.png" 
                alt="View All Events" 
                width={240} 
                height={60} 
              />
            </button>
          </div>

          {/* Right Cards Column */}
          {/* Updated: Changed to flex-row for mobile to sit side-by-side and smaller widths */}
          <div className="flex flex-row gap-3 md:gap-6 justify-center items-center order-2">
            {/* Pitch Arena Card */}
            <div className="relative transition-transform hover:-translate-y-2 duration-300">
              <Image
                src="/event-card-2.png"
                alt="Pitch Arena"
                width={160} // Smaller for mobile
                height={220}
                className="drop-shadow-lg md:drop-shadow-xl object-contain md:w-[280px]"
              />
            </div>

            {/* Typemaster Arena Card */}
            <div className="relative transition-transform hover:-translate-y-2 duration-300">
              <Image
                src="/event-card-1.png"
                alt="Typemaster Arena"
                width={160} // Smaller for mobile
                height={220}
                className="drop-shadow-lg md:drop-shadow-xl object-contain md:w-[280px]"
              />
            </div>
          </div>

          {/* Mobile View Button (Hidden on Desktop) */}
          <div className="order-3 lg:hidden flex justify-center w-full mt-0">
            <button className="hover:scale-105 active:scale-95 transition-transform">
              <Image 
                src="/events-button.png" 
                alt="View All Events" 
                width={220} // Smaller for mobile
                height={60} 
              />
            </button>
          </div>

        </div>
      </Container>
    </section>
  );
}