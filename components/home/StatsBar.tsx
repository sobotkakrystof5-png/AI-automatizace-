import CountUpValue from "@/components/home/CountUpValue";

const stats = [
  {
    target: 2,
    suffix: " roky",
    label: "Přímé zkušenosti s reálnými klienty (přes projekt Vizeon)",
  },
  {
    target: 24,
    suffix: " hodin",
    label: "Maximální doba odezvy na váš dotaz — každý den",
  },
  {
    target: 2,
    suffix: " roky",
    label: "Záruka na každou dodanou automatizaci",
  },
  {
    target: 3,
    suffix: "",
    label: "Vlastní produkty a nástroje reálně v provozu (AvenIQ, ZakazIQ, Vizeon)",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-zinc-400 sm:text-left">
          AvenIQ v číslech
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="text-center sm:text-left">
              <dt className="text-3xl font-semibold tabular-nums text-brand-gold sm:text-4xl">
                <CountUpValue target={s.target} suffix={s.suffix} />
              </dt>
              <dd className="mt-2 text-sm text-zinc-400">{s.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-center text-sm text-zinc-400 sm:text-left">
          Menší čísla než u velkých agentur — ale za každým z nich stojí
          přímá zkušenost, ne marketing.
        </p>
      </div>
    </section>
  );
}
