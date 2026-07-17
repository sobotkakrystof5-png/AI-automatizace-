import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Differentiators from "@/components/home/Differentiators";
import Mission from "@/components/home/Mission";
import SectionTeaser from "@/components/home/SectionTeaser";
import Collaboration from "@/components/home/Collaboration";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Differentiators />
      <Mission />
      <SectionTeaser
        theme="cream"
        title="Co vše jde automatizovat"
        lead="Díky AI automatizacím a agentům lze zefektivnit prakticky každou opakující se agendu ve firmě."
        href="/automatizace"
      />
      <SectionTeaser
        theme="white"
        title="Proč automatizace, a ne jen ChatGPT"
        lead="Spousta firem si myslí, že „mít AI“ znamená občas otevřít ChatGPT a nechat si tam něco vygenerovat. To je dobrý začátek — ale není to řešení."
        href="/proc-automatizace"
      />
      <SectionTeaser
        theme="cream"
        title="Ceník"
        lead='Cena automatizace se neodvíjí od toho, "kolik trvalo ji postavit", ale od toho, kolik systémů propojuje, jak složitá je její logika a jak velké riziko a hodnotu klientovi přináší.'
        href="/cenik"
      />
      <SectionTeaser
        theme="navy"
        title="Proces práce"
        lead="Šest kroků od bezplatné konzultace až po spuštění a dvouletou záruku — vždy víte, co se děje a proč."
        href="/proces-prace"
      />
      <SectionTeaser
        theme="white"
        title="Jak tvoříme automatizace"
        lead="Stavíme na nejmodernějších a nejaktuálnějších nástrojích — n8n, JSON, Make.com, Zapier. Každou automatizaci systematicky testujeme, než se dotkne vašeho provozu."
        href="/jak-tvorime-automatizace"
      />
      <SectionTeaser
        theme="cream"
        title="Záruka a dlouhodobý závazek"
        lead="Garantujeme 2 roky záruky na každou dodanou automatizaci. Pojedeme dál, dokud nebudete 100% spokojeni."
        href="/zaruka"
      />
      <SectionTeaser
        theme="cream"
        title="Časté otázky"
        lead="Odpovědi na otázky, které se nás klienti ptají nejčastěji — o ceně, procesu i tom, co se stane, když se automatizace rozbije."
        href="/faq"
      />
      <Collaboration />
      <SectionTeaser
        theme="navy"
        title="O nás"
        lead="Než vznikl AvenIQ, stál jsem dva roky za projektem Vizeon — tvorbou webů na míru pro živnostníky a malé firmy."
        href="/o-nas"
      />
      <FinalCTA />
    </>
  );
}
