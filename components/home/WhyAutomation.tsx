const points = [
  {
    title: "Automatizace pracuje za vás, ne vy s ní",
    body: "S ChatGPT musíte vy sami otevřít okno, napsat zadání a výstup ručně přenést dál. Automatizace se spustí sama, ve chvíli, kdy nastane událost — nová objednávka, e-mail, faktura — bez jediného kliknutí z vaší strany.",
  },
  {
    title: "Propojení s vašimi systémy",
    body: "ChatGPT nezná vaše CRM, fakturační systém ani sklad. Automatizace ano — čte a zapisuje data přímo tam, kde je potřebujete, a spojuje víc nástrojů dohromady do jednoho plynulého procesu.",
  },
  {
    title: "Konzistence a spolehlivost",
    body: "Ruční práce s AI se liší člověk od člověka a den ode dne — jednou se zapomene upravit zadání, jindy se vynechá krok. Automatizovaný proces běží pokaždé stejně, bez ohledu na to, kdo je zrovna v práci nebo jak je unavený.",
  },
  {
    title: "Bezpečnost vašich dat",
    body: "Kopírování citlivých firemních nebo zákaznických údajů do veřejného ChatGPT je riziko samo o sobě — nevíte přesně, kam data putují dál. Automatizace umožňuje AI zapojit tak, aby data zůstala ve vašich systémech, pod vaší kontrolou.",
  },
  {
    title: "Škáluje se s vámi",
    body: "Ruční kopírování do ChatGPT funguje u pěti e-mailů denně. U pěti stovek už ne. Automatizace zvládne stejný proces bez ohledu na to, jestli je požadavků pět, nebo pět tisíc.",
  },
  {
    title: "Čas, který se skutečně sečte",
    body: "Pár ušetřených minut u jednoho úkolu v ChatGPT nevypadá jako moc. Vynásobené každým dnem a každým zaměstnancem se z toho ale stávají desítky hodin měsíčně — a automatizace je z rovnice odstraní úplně, ne jen zkrátí.",
  },
];

const comparisonRows = [
  {
    label: "Spouští se",
    manual: "Musíte to udělat vy",
    automated: "Sama, podle události",
  },
  {
    label: "Propojení se systémy",
    manual: "Ruční kopírování",
    automated: "Napojena přímo",
  },
  {
    label: "Konzistence",
    manual: "Liší se člověk od člověka",
    automated: "Vždy stejný proces",
  },
  {
    label: "Bezpečnost dat",
    manual: "Mimo vaši kontrolu",
    automated: "Zůstává ve vašich systémech",
  },
  {
    label: "Škáluje se",
    manual: "Ne",
    automated: "Ano",
  },
];

export default function WhyAutomation() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
          Proč automatizace, a ne jen ChatGPT
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-400">
          {'Spousta firem si myslí, že "mít AI" znamená občas otevřít ChatGPT a nechat si tam něco vygenerovat. To je dobrý začátek — ale není to řešení. ChatGPT odpoví, když se ho zeptáte. Nespustí se sám, nezná vaše systémy, nepamatuje si kontext vaší firmy a hlavně — pořád je tu člověk, který musí ručně kopírovat data tam a zpátky.'}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <div key={point.title}>
              <h3 className="text-xl font-bold text-zinc-50">
                {point.title}
              </h3>
              <p className="mt-2 text-zinc-400">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-zinc-900 text-zinc-50">
                <th scope="col" className="px-4 py-3 font-semibold">
                  <span className="sr-only">Kritérium</span>
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Ruční práce s ChatGPT
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Automatizace na míru
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-zinc-50"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-zinc-400">{row.manual}</td>
                  <td className="px-4 py-3 text-zinc-400">{row.automated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-10 text-xl font-semibold text-zinc-50">
          {'Nejde o to mít "AI ve firmě". Jde o to, aby AI dělala práci za vás — ne abyste vy dělali práci s AI.'}
        </p>
      </div>
    </section>
  );
}
