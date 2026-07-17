import Link from "next/link";

const areas = [
  {
    title: "Marketing",
    href: "/automatizace/marketing",
    lead: "Od zachycení leadu až po vyhodnocení kampaně — bez ručního přepisování mezi nástroji.",
    points: [
      "Nový lead z formuláře automaticky obohacen, ohodnocen a zapsán do CRM",
      "Personalizovaná e-mailová komunikace a follow-up sekvence spouštěné podle chování zákazníka",
      "Automatické sbírání a vyhodnocování zpětné vazby po nákupu",
      "Pravidelné reporty výkonu kampaní sestavené z více zdrojů (e-shop, sociální sítě, e-mail)",
    ],
  },
  {
    title: "Interní procesy",
    href: "/automatizace/interni-procesy",
    lead: "Schválení, předávání úkolů a firemní administrativa, která proběhne sama — ve správný čas, správné osobě.",
    points: [
      "Schvalovací workflow pro faktury, objednávky nebo dovolené — bez mailového ping-pongu",
      "Onboarding nových zaměstnanců (přístupy, úkoly, dokumenty) spuštěný jedním krokem",
      "Automatické notifikace a předávání úkolů mezi odděleními",
      "Sledování termínů a automatické připomínky odpovědným osobám",
    ],
  },
  {
    title: "Zákaznická podpora",
    href: "/automatizace/zakaznicka-podpora",
    lead: "Rychlejší odpovědi, méně ztracených dotazů, tým soustředěný jen na to, co si opravdu žádá člověka.",
    points: [
      "Automatické třídění a směrování příchozích dotazů podle tématu a naléhavosti",
      "AI odpovědi na často kladené otázky přímo z vaší znalostní báze",
      "Eskalace složitějších případů člověku s kompletním kontextem, ne jen přeposláním",
      "Automatické sledování spokojenosti a opakovaně řešených problémů",
    ],
  },
  {
    title: "Práce s daty",
    href: "/automatizace/prace-s-daty",
    lead: "Data z různých systémů na jednom místě, čistá a připravená k použití — bez ruční práce a chyb z přepisování.",
    points: [
      "Sběr dat z více zdrojů (CRM, e-shop, fakturační systém) do jednoho přehledu",
      "Automatické čištění, deduplikace a slučování záznamů",
      "Validace dat (např. kontrola IČO, adres, kontaktů) přímo při vstupu do systému",
      "Pravidelná synchronizace dat mezi systémy v reálném čase",
    ],
  },
  {
    title: "Reporty",
    href: "/automatizace/reporty",
    lead: "Čísla, která za vámi přijdou sama, přesně ve chvíli a formě, kdy je potřebujete.",
    points: [
      "Automatické denní, týdenní nebo měsíční souhrny (obrat, marže, provoz) do e-mailu nebo Slacku",
      "Reporty sestavené z více zdrojů dat najednou, bez ručního kopírování do Excelu",
      "Rozesílání různých pohledů na data různým příjemcům podle role",
      "Upozornění na odchylky nebo neobvyklé hodnoty hned, jak nastanou",
    ],
  },
  {
    title: "Účetnictví",
    href: "/automatizace/ucetnictvi",
    lead: "Menší administrativní zátěž, méně manuálních chyb, rychlejší uzávěrky.",
    points: [
      "Příjem faktur z e-mailu, vytěžení dat pomocí AI a validace proti objednávce",
      "Automatické zaúčtování shodných položek, eskalace nesrovnalostí ke kontrole",
      "Párování plateb s vystavenými fakturami",
      "Podklady pro měsíční uzávěrku připravené automaticky pro účetní nebo daňového poradce",
    ],
  },
];

export default function AutomationAreas() {
  return (
    <section id="co-jde-automatizovat" className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Co vše jde automatizovat
        </h2>
        <p className="mt-4 max-w-3xl text-brand-navy/80">
          Díky AI automatizacím a agentům lze zefektivnit prakticky každou
          opakující se agendu ve firmě. Nejčastěji pro klienty řešíme:
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="group flex flex-col rounded-lg border border-brand-navy/10 bg-white p-6 transition-colors hover:border-brand-teal"
            >
              <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal">
                {area.title}
              </h3>
              <p className="mt-2 text-sm text-brand-navy/70">{area.lead}</p>
              <ul className="mt-4 space-y-2 text-sm text-brand-navy/70">
                {area.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden className="text-brand-teal">
                      •
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-brand-navy/70">
          Toto je jen výběr nejčastějších oblastí — pokud se váš proces
          opakuje a stojí vás čas, s vysokou pravděpodobností jde
          automatizovat.
        </p>
      </div>
    </section>
  );
}
