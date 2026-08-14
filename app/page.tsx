import JsonLd from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/json-ld";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import WhyAutomation from "@/components/home/WhyAutomation";
import Mission from "@/components/home/Mission";
import AutomationAreas from "@/components/home/AutomationAreas";
import Services from "@/components/home/Services";
import VerifiedSystems from "@/components/home/VerifiedSystems";
import ProcessSteps from "@/components/home/ProcessSteps";
import ToolsIntegration from "@/components/home/ToolsIntegration";
import QuoteProcess from "@/components/home/QuoteProcess";
import Differentiators from "@/components/home/Differentiators";
import About from "@/components/home/About";
import ZakazIq from "@/components/home/ZakazIq";
import FAQ from "@/components/home/FAQ";
import ContactSection from "@/components/home/ContactSection";

// Pořadí přepracováno 2026-08-10 na výslovnou žádost uživatele. Nahrazuje
// "kanonické pořadí" z repozice 2026-08-09 (viz claude.md, "Struktura
// homepage", a git historie tohoto souboru pro původní verzi). Osm
// hlavních sekcí teď jde přesně v pořadí navbaru (Navbar.tsx):
// Proč automatizace → Služby → Jak pracujeme → V čem jsme jiní → O mně →
// ZakazIQ → FAQ → Kontakt.
//
// Pět sekcí, které uživatel v zadání nejmenoval (TrustStrip, Mission,
// AutomationAreas, VerifiedSystems, ToolsIntegration), NEBYLY smazány.
// Uživatel výslovně řekl "to vyřešíme později" (2026-08-10). Zůstávají
// jako mezisekce u obsahově příbuzné hlavní sekce a nemají vlastní odkaz
// v navbaru. Jejich dlouhodobé umístění/osud je otevřený bod pro budoucí
// session, ne finální rozhodnutí. (Šestou z nich byl HowWeBuild,
// 2026-08-10 nahrazen sekcí QuoteProcess, viz níže.)
//
//  - TrustStrip zůstává hned pod Hero (beze změny). Je to krátký pruh
//    důvěry, patří k prvnímu dojmu, ne k žádné z pojmenovaných sekcí.
//  - Mission a AutomationAreas stojí u WhyAutomation. Obě obsahově
//    doplňují "proč automatizace" (motto, resp. konkrétní příklady).
//  - VerifiedSystems stojí u Services. Loga nástrojů podpírají důvěru
//    v nabízené služby.
//  - ToolsIntegration a QuoteProcess stojí mezi ProcessSteps a
//    Differentiators. Pravidlo z claude.md platí beze změny:
//    VerifiedSystems a ToolsIntegration (obě loga nástrojů) nesmí stát
//    vedle sebe. Dělí je ProcessSteps.
//
// QuoteProcess (nacenění) obsadil 2026-08-10 pozici po HowWeBuild. Původní
// důvod pro odstup od ProcessSteps (obsahový překryv) tím zmizel. Nová
// sekce odpovídá na jinou otázku, viz komentář v QuoteProcess.tsx. Pozice
// je proto volná: sekce o ceně by logicky mohla stát hned za Services nebo
// těsně před FAQ/Kontakt, kde námitka „kolik to stojí" reálně vzniká.
// Přesun ale mění schválené pořadí homepage, takže je to otevřený bod pro
// příští session, ne věc k tichému provedení.
export default function Home() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <Hero />
      <TrustStrip />
      <WhyAutomation />
      <Mission />
      <AutomationAreas />
      <Services />
      <VerifiedSystems />
      <ProcessSteps />
      <ToolsIntegration />
      <QuoteProcess />
      <Differentiators />
      <About />
      <ZakazIq />
      <FAQ />
      <ContactSection />
    </>
  );
}
