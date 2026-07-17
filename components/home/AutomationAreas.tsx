import Link from "next/link";
import { automationAreas } from "@/lib/automation-areas";

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
          {automationAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/automatizace/${area.slug}`}
              className="group flex flex-col rounded-lg border border-brand-navy/10 bg-white p-6 transition-colors hover:border-brand-teal"
            >
              <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal">
                {area.title}
              </h3>
              <p className="mt-2 text-sm text-brand-navy/80">{area.lead}</p>
              <ul className="mt-4 space-y-2 text-sm text-brand-navy/80">
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

        <p className="mt-8 text-brand-navy/80">
          Toto je jen výběr nejčastějších oblastí — pokud se váš proces
          opakuje a stojí vás čas, s vysokou pravděpodobností jde
          automatizovat.
        </p>
      </div>
    </section>
  );
}
