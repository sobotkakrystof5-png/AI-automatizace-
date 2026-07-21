import { siGmail, siNotion, siShopify, siStripe, siWhatsapp } from "simple-icons";

// Jediný zdroj dat pro nástroje zobrazené v interaktivních kruzích
// (Fáze R4 "Pracujeme s ověřenými systémy", případně širší verze ve
// Fázi R7) — seznam potvrzen uživatelem 2026-07-21 ("Širší mix vč.
// e-commerce/CRM"). SVG data jdou přes balíček `simple-icons` (oficiální
// monochrome brand ikony), ne ručně kreslené napodobeniny.
//
// Slack byl součástí potvrzeného seznamu, ale `simple-icons` v16.27.0 ho
// nemá (jen "Slackware", Linux distribuci) — logo tedy chybí a `path` je
// `null`. Nevymýšlet náhradní ikonu, viz `ToolOrbit`, které pro `path:
// null` vykreslí textový placeholder chip.
export type Tool = {
  slug: string;
  name: string;
  path: string | null;
};

export const connectedTools: Tool[] = [
  { slug: "gmail", name: "Gmail", path: siGmail.path },
  { slug: "slack", name: "Slack", path: null },
  { slug: "notion", name: "Notion", path: siNotion.path },
  { slug: "whatsapp", name: "WhatsApp", path: siWhatsapp.path },
  { slug: "shopify", name: "Shopify", path: siShopify.path },
  { slug: "stripe", name: "Stripe", path: siStripe.path },
];
