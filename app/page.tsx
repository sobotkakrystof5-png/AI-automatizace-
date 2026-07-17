import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Differentiators from "@/components/home/Differentiators";
import Mission from "@/components/home/Mission";
import AutomationAreas from "@/components/home/AutomationAreas";
import WhyAutomation from "@/components/home/WhyAutomation";
import Pricing from "@/components/home/Pricing";

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
    </>
  );
}
