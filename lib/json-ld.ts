// Jediný zdroj pravdy pro JSON-LD structured data. Staví výhradně na datech
// z existujících lib/*.ts zdrojů (faq, automation-areas), aby se structured
// data nikdy nerozešlo s tím, co je vidět na stránce.
//
// Od 2026-08-09 tu není žádné schéma s cenou: web ceny neuvádí (viz claude.md,
// sekce "Co se nikdy nedělá"), takže by je nesmělo publikovat ani structured
// data. Pokud sem někdy přibude Service schéma pro sekci Služby, musí být bez
// Offer/priceSpecification.
import { SITE_URL_BASE } from "@/lib/constants";
import { faqs, type FaqItem } from "@/lib/faq";
import type { AutomationArea } from "@/lib/automation-areas";

const absoluteUrl = (path: string) => `${SITE_URL_BASE}${path}`;

// Description opravena 2026-08-10 (Fáze 7): dřív končila "— chytrá
// automatizace, lidský přístup". Motto zrušené 2026-08-09, sem se ta
// úprava tehdy nepromítla. Structured data proto nesmí tvrdit nic, co web
// sám už neříká. Aktuální hero claim ("Vy řešíte byznys. Rutinu
// automatizujeme my.", 2026-08-10) se sem záměrně nekopíruje, description
// popisuje nabídku, ne slogan.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: "ALTENO",
    url: absoluteUrl("/"),
    description:
      "AI automatizace firemních procesů pro menší a středně velké firmy.",
    founder: {
      "@type": "Person",
      name: "Kryštof Sobotka",
    },
    areaServed: "CZ",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function faqAnswerText(item: FaqItem) {
  return item.a + (item.link ? item.link.label : "") + (item.afterLink ?? "");
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerText(item),
      },
    })),
  };
}

export function automationAreaServiceJsonLd(area: AutomationArea) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.seoTitle,
    description: area.lead,
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: "CZ",
    serviceType: area.title,
  };
}
