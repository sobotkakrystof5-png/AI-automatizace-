import JsonLd from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/json-ld";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Mission from "@/components/home/Mission";
import About from "@/components/home/About";
import Differentiators from "@/components/home/Differentiators";
import WhyAutomation from "@/components/home/WhyAutomation";
import AutomationAreas from "@/components/home/AutomationAreas";
import VerifiedSystems from "@/components/home/VerifiedSystems";
import Services from "@/components/home/Services";
import HowWeBuild from "@/components/home/HowWeBuild";
import ToolsIntegration from "@/components/home/ToolsIntegration";
import ProcessSteps from "@/components/home/ProcessSteps";
import ZakazIq from "@/components/home/ZakazIq";
import FAQ from "@/components/home/FAQ";
import ContactSection from "@/components/home/ContactSection";

// Kanonické pořadí sekcí homepage (repozice 2026-08-09, viz
// docs/plan-repozice-2026-08.md, sekce 2, a claude.md, "Struktura
// homepage"). Pořadí není libovolné — vede návštěvníka od důvěry a
// poslání přes osobní příběh k tomu, co si může objednat, a teprve
// nakonec ke kontaktu.
//
// Čtyři sekce, které plán jmenovitě neuvádí (Differentiators,
// VerifiedSystems, HowWeBuild, ToolsIntegration), uživatel 2026-08-09
// rozhodl zachovat. Jejich umístění řeší dvě obsahové kolize, na které
// jsem upozorňoval — nejsou náhodná, nepřehazovat bez rozmyslu:
//
//  - VerifiedSystems a ToolsIntegration obě ukazují loga nástrojů. Jsou
//    proto tři sekce od sebe; vedle sebe by stránka dvakrát po sobě
//    dělala totéž.
//  - HowWeBuild (3 principy) a ProcessSteps (5 kroků spolupráce) se
//    obsahově překrývají. Mezi nimi stojí ToolsIntegration — stejné
//    odstínění, jaké mělo pořadí před repozicí.
//
// StatsBar a Collaboration byly stejným rozhodnutím zrušeny: čísla
// přebírá TrustStrip a vlastní projekty vysvětlí sekce ZakazIQ (Fáze 4)
// a stránka /o-mne (Fáze 5).
//
// ZakazIQ (Fáze 4, 2026-08-09) stojí mezi ProcessSteps a FAQ přesně podle
// plánu: nejdřív se návštěvník dozví, jak spolupráce probíhá, pak dostane
// důkaz, že to celé opravdu funguje, a teprve potom řeší námitky ve FAQ.
export default function Home() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <Hero />
      <TrustStrip />
      <Mission />
      <About />
      <Differentiators />
      <WhyAutomation />
      <AutomationAreas />
      <VerifiedSystems />
      <Services />
      <HowWeBuild />
      <ToolsIntegration />
      <ProcessSteps />
      <ZakazIq />
      <FAQ />
      <ContactSection />
    </>
  );
}
