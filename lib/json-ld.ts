// Jediný zdroj pravdy pro JSON-LD structured data. Staví výhradně na datech
// z existujících lib/*.ts zdrojů (pricing, faq, automation-areas), aby se
// structured data nikdy nerozešlo s tím, co je vidět na stránce.
import { SITE_URL_BASE } from "@/lib/constants";
import { pricingTiers } from "@/lib/pricing";
import { faqs, type FaqItem } from "@/lib/faq";
import type { AutomationArea } from "@/lib/automation-areas";

const absoluteUrl = (path: string) => `${SITE_URL_BASE}${path}`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: "AvenIQ",
    url: absoluteUrl("/"),
    description:
      "AI automatizace firemních procesů pro živnostníky, agentury a malé až středně velké firmy — chytrá automatizace, lidský přístup.",
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

// "od X Kč" v ceníku = minimální/orientační cena, ne fixní — proto
// priceSpecification s minPrice, ne pevné price, aby structured data
// neříkalo víc, než co je na stránce skutečně napsané.
export function pricingServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI automatizace firemních procesů — AvenIQ",
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: "CZ",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cenová pásma automatizací",
      itemListElement: pricingTiers.map((tier) => ({
        "@type": "Offer",
        name: tier.title,
        description: tier.description,
        priceCurrency: "CZK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "CZK",
          minPrice: Number(tier.price.replace(/[^\d]/g, "")),
        },
      })),
    },
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
