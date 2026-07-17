import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Differentiators from "@/components/home/Differentiators";
import Mission from "@/components/home/Mission";
import AutomationAreas from "@/components/home/AutomationAreas";
import WhyAutomation from "@/components/home/WhyAutomation";
import Pricing from "@/components/home/Pricing";
import ProcessSteps from "@/components/home/ProcessSteps";
import HowWeBuild from "@/components/home/HowWeBuild";
import Guarantee from "@/components/home/Guarantee";
import FAQ from "@/components/home/FAQ";
import Collaboration from "@/components/home/Collaboration";
import About from "@/components/home/About";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Differentiators />
      <Mission />
      <AutomationAreas />
      <WhyAutomation />
      <Pricing />
      <ProcessSteps />
      <HowWeBuild />
      <Guarantee />
      <FAQ />
      <Collaboration />
      <About />
      <FinalCTA />
    </>
  );
}
