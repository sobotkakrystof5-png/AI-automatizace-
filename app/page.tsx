import JsonLd from "@/components/seo/JsonLd";
import { faqPageJsonLd, pricingServiceJsonLd } from "@/lib/json-ld";
import Hero from "@/components/home/Hero";
import VerifiedSystems from "@/components/home/VerifiedSystems";
import StatsBar from "@/components/home/StatsBar";
import Differentiators from "@/components/home/Differentiators";
import WhyAutomation from "@/components/home/WhyAutomation";
import AutomationAreas from "@/components/home/AutomationAreas";
import HowWeBuild from "@/components/home/HowWeBuild";
import ProcessSteps from "@/components/home/ProcessSteps";
import ToolsIntegration from "@/components/home/ToolsIntegration";
import Pricing from "@/components/home/Pricing";
import About from "@/components/home/About";
import FAQ from "@/components/home/FAQ";
import Collaboration from "@/components/home/Collaboration";
import Contact from "@/components/home/Contact";
import Booking from "@/components/home/Booking";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <JsonLd data={pricingServiceJsonLd()} />
      <Hero />
      <VerifiedSystems />
      <StatsBar />
      <Differentiators />
      <WhyAutomation />
      <AutomationAreas />
      <HowWeBuild />
      <ToolsIntegration />
      <ProcessSteps />
      <Pricing />
      <About />
      <Collaboration />
      <FAQ />
      <Contact />
      <Booking />
      <FinalCTA />
    </>
  );
}
