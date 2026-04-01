import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Timeline from "@/components/sections/Timeline";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
// import Footer from "@/components/layout/Footer";


export default function Home() {
  return (
    <main className="bg-[#f5eaea] text-black">
      <Hero />
      <About />
      <Events />
      <Timeline />
      <Gallery />
      <FAQ />
      <CTA />
      {/* <Footer /> */}
    </main>
  );
}