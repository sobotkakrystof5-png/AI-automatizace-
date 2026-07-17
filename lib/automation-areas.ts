// Jediný zdroj dat pro oblasti automatizace (viz AvenIQ_obsah_webu.md,
// sekce "Co vše jde automatizovat"). Sdíleno mezi homepage přehledem
// (AutomationAreas) a jednotlivými podstránkami /automatizace/[slug],
// aby text nemohl mezi oběma místy zdrift.ovat.
export type AutomationArea = {
  slug: string;
  title: string;
  lead: string;
  points: string[];
  seoTitle: string;
};

export const automationAreas: AutomationArea[] = [
  {
    slug: "marketing",
    title: "Marketing",
    lead: "Od zachycení leadu až po vyhodnocení kampaně — bez ručního přepisování mezi nástroji.",
    points: [
      "Nový lead z formuláře automaticky obohacen, ohodnocen a zapsán do CRM",
      "Personalizovaná e-mailová komunikace a follow-up sekvence spouštěné podle chování zákazníka",
      "Automatické sbírání a vyhodnocování zpětné vazby po nákupu",
      "Pravidelné reporty výkonu kampaní sestavené z více zdrojů (e-shop, sociální sítě, e-mail)",
    ],
    seoTitle: "Automatizace marketingu",
  },
  {
    slug: "interni-procesy",
    title: "Interní procesy",
    lead: "Schválení, předávání úkolů a firemní administrativa, která proběhne sama — ve správný čas, správné osobě.",
    points: [
      "Schvalovací workflow pro faktury, objednávky nebo dovolené — bez mailového ping-pongu",
      "Onboarding nových zaměstnanců (přístupy, úkoly, dokumenty) spuštěný jedním krokem",
      "Automatické notifikace a předávání úkolů mezi odděleními",
      "Sledování termínů a automatické připomínky odpovědným osobám",
    ],
    seoTitle: "Automatizace interních procesů",
  },
  {
    slug: "zakaznicka-podpora",
    title: "Zákaznická podpora",
    lead: "Rychlejší odpovědi, méně ztracených dotazů, tým soustředěný jen na to, co si opravdu žádá člověka.",
    points: [
      "Automatické třídění a směrování příchozích dotazů podle tématu a naléhavosti",
      "AI odpovědi na často kladené otázky přímo z vaší znalostní báze",
      "Eskalace složitějších případů člověku s kompletním kontextem, ne jen přeposláním",
      "Automatické sledování spokojenosti a opakovaně řešených problémů",
    ],
    seoTitle: "Automatizace zákaznické podpory",
  },
  {
    slug: "prace-s-daty",
    title: "Práce s daty",
    lead: "Data z různých systémů na jednom místě, čistá a připravená k použití — bez ruční práce a chyb z přepisování.",
    points: [
      "Sběr dat z více zdrojů (CRM, e-shop, fakturační systém) do jednoho přehledu",
      "Automatické čištění, deduplikace a slučování záznamů",
      "Validace dat (např. kontrola IČO, adres, kontaktů) přímo při vstupu do systému",
      "Pravidelná synchronizace dat mezi systémy v reálném čase",
    ],
    seoTitle: "Automatizace práce s daty",
  },
  {
    slug: "reporty",
    title: "Reporty",
    lead: "Čísla, která za vámi přijdou sama, přesně ve chvíli a formě, kdy je potřebujete.",
    points: [
      "Automatické denní, týdenní nebo měsíční souhrny (obrat, marže, provoz) do e-mailu nebo Slacku",
      "Reporty sestavené z více zdrojů dat najednou, bez ručního kopírování do Excelu",
      "Rozesílání různých pohledů na data různým příjemcům podle role",
      "Upozornění na odchylky nebo neobvyklé hodnoty hned, jak nastanou",
    ],
    seoTitle: "Automatizace reportů",
  },
  {
    slug: "ucetnictvi",
    title: "Účetnictví",
    lead: "Menší administrativní zátěž, méně manuálních chyb, rychlejší uzávěrky.",
    points: [
      "Příjem faktur z e-mailu, vytěžení dat pomocí AI a validace proti objednávce",
      "Automatické zaúčtování shodných položek, eskalace nesrovnalostí ke kontrole",
      "Párování plateb s vystavenými fakturami",
      "Podklady pro měsíční uzávěrku připravené automaticky pro účetní nebo daňového poradce",
    ],
    seoTitle: "Automatizace účetnictví",
  },
];
