import SplashScreen from "@/components/ui/SplashScreen";
import Hero     from "@/components/sections/Hero";
import About    from "@/components/sections/About";
import Events   from "@/components/sections/Events";
import Timeline from "@/components/sections/Timeline";
import Gallery  from "@/components/sections/Gallery";
import FAQ      from "@/components/sections/FAQ";
import CTA      from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="bg-[#f5eaea] dark:bg-[#0A0018] text-black dark:text-white">
      <SplashScreen />
      <Hero />
      <About />
      <Events />
      <Timeline />
      <Gallery />
      <FAQ />
      <CTA />
    </main>
  );
}
