const philosophyPoints = [
  {
    title: "Nejdřív pochopit, pak automatizovat.",
    body: "Žádné řešení nenabízíme dřív, než rozumíme vašemu skutečnému problému.",
  },
  {
    title: "Transparentnost především.",
    body: "Víte předem, co dostanete, za kolik, a co se stane, když se něco pokazí.",
  },
  {
    title: "Data zůstávají vaše.",
    body: "Preferujeme řešení, kde vaše firemní data neputují nikam, kam nechcete — v souladu s GDPR a evropskými standardy.",
  },
];

export default function About() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          O nás
        </h1>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-zinc-50">Náš příběh</h3>
          <p className="mt-3 text-zinc-400">
            Než vznikl AvenIQ, stál jsem dva roky za projektem{" "}
            <strong className="font-semibold text-zinc-50">Vizeon</strong> —
            tvorbou webů na míru pro živnostníky a malé firmy. Za tu dobu jsem
            si prošel desítkami rozhovorů s majiteli firem, co je skutečně
            trápí. A skoro pokaždé to nakonec nebylo o tom, jak web vypadá —
            bylo to o tom, kolik času tráví ručním papírováním, přepisováním
            objednávek, honěním e-mailů a excelovými tabulkami, místo aby
            dělali to, kvůli čemu firmu vůbec založili.
          </p>
          <p className="mt-4 text-zinc-400">
            V rámci Vizeonu jsem si postavil vlastní systém{" "}
            <strong className="font-semibold text-zinc-50">ZakazIQ</strong> —
            nástroj, který za mě automaticky řeší komunikaci s klienty,
            rezervace konzultací i připomínky. Fungoval tak dobře, že mi
            došlo: tohle není jen pomůcka pro moje webařství. Tohle je byznys
            sám o sobě.
          </p>
          <p className="mt-4 text-zinc-400">
            Tak vznikl AvenIQ — navazuji na dva roky zkušeností s reálnými
            klienty a přesouvám se z tvorby webů do AI automatizace celých
            firemních procesů. Stejný přístup, širší záběr.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-zinc-50">
            Naše filozofie
          </h3>
          <p className="mt-3 text-zinc-400">
            {
              'Automatizace by neměla být samoúčelná. Nejde o to nacpat AI a "chytré" nástroje všude, kde to jde — jde o to najít místa, kde vám kradou čas nudné, opakující se úkoly, a tam je nahradit systémem, který funguje spolehlivě, transparentně a bez neustálého dohledu.'
            }
          </p>
          <p className="mt-3 italic text-zinc-500">
            Automatizujeme to, co vás brzdí — ne to, co je trendy.
          </p>

          <p className="mt-4 text-zinc-400">Držíme se tří zásad:</p>
          <ul className="mt-3 space-y-3">
            {philosophyPoints.map((point) => (
              <li key={point.title} className="text-zinc-400">
                <strong className="font-semibold text-zinc-50">
                  {point.title}
                </strong>{" "}
                {point.body}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-zinc-50">
            Kdo za tím stojí
          </h3>
          <p className="mt-3 text-zinc-400">
            AvenIQ zakládám jako firmu specializovanou na AI automatizaci —
            aktuálně jako jednočlenný projekt, s jasnou ambicí v příštích
            letech vybudovat tým. Za sebou mám dva roky přímé práce s klienty
            přes Vizeon a aktuálně se dál vzdělávám v pokročilé AI
            automatizaci (n8n a související nástroje), abych vám mohl
            nabídnout řešení, která opravdu fungují — ne jen technologickou
            módu.
          </p>
          <p className="mt-4 text-zinc-400">
            S klienty komunikuji přímo já, bez přehazování mezi account
            managery. Odpovídám do 24 hodin — každý den.
          </p>
          <p className="mt-4 text-zinc-400">
            Aktuálně jsem na projektu sám — a chci být upřímný, co to znamená.
            Neznamená to, že jste odkázaní na jednoho člověka bez zálohy:
            každá dodaná automatizace je zdokumentovaná tak, aby ji v případě
            potřeby (dovolená, nemoc) mohl převzít i externí n8n specialista,
            se kterým spolupracuji. Cílem příštích let je vybudovat malý tým,
            ale i teď máte jistotu, že vaše automatizace nezůstane bez
            podpory.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-zinc-50">
            Kryštof Sobotka — CEO a zakladatel
          </h3>
          <p className="mt-3 text-zinc-400">
            Moje cesta začala u webových stránek. Přes projekt Vizeon jsem si
            vybudoval úspěšnou, zavedenou značku na trhu tvorby webů pro
            živnostníky a malé firmy — a po cestě jsem si postavil vlastní
            nástroj ZakazIQ, který mi automatizoval komunikaci s klienty i
            rezervace.
          </p>
          <p className="mt-4 text-zinc-400">
            Tahle zkušenost mě přesvědčila, že skutečná hodnota není ve webu
            samotném, ale v tom, kolik času firmě automatizace reálně vrátí.
            AvenIQ je přirozeným pokračováním téhle cesty — stejný přístup k
            zákazníkům, širší záběr v tom, co dokážeme automatizovat.
          </p>
        </div>
      </div>
    </section>
  );
}
