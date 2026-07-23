import {
  siGmail,
  siNotion,
  siShopify,
  siStripe,
  siWhatsapp,
  siGooglesheets,
  siGoogledrive,
  siGooglecalendar,
  siGooglemeet,
  siHubspot,
  siTrello,
  siAsana,
  siAirtable,
  siMailchimp,
  siZoom,
  siDropbox,
  siQuickbooks,
  siWordpress,
  siClickup,
} from "simple-icons";

// Jediný zdroj dat pro nástroje zobrazené v interaktivním kruhu
// (VerifiedSystems.tsx, trust strip hned pod Hero) — rozšířeno na ~20
// nástrojů (redesign 2026-07-22) z původního seznamu potvrzeného
// uživatelem 2026-07-21 ("Širší mix vč. e-commerce/CRM"). SVG data jdou
// přes balíček `simple-icons` (oficiální monochrome brand ikony), ne
// ručně kreslené napodobeniny.
//
// Slack byl součástí potvrzeného seznamu, ale `simple-icons` v16.27.0 ho
// nemá (jen "Slackware", Linux distribuci) — na výslovnou žádost uživatele
// (2026-07-22) byl proto z kruhu úplně odebraný, ne nahrazený textovým
// placeholderem. Microsoft/Outlook/Teams podobně chybí (ověřeno přes
// `Object.keys(require('simple-icons'))`) — vynecháno, ne nahrazeno
// vymyšleným logem. Nevymýšlet náhradní ikonu, viz `ToolOrbit`, které pro
// `path: null` vykreslí textový placeholder chip (ponecháno pro
// budoucí nástroje bez SVG, i když aktuální seznam žádný takový nemá).
export type Tool = {
  slug: string;
  name: string;
  path: string | null;
};

export const connectedTools: Tool[] = [
  { slug: "gmail", name: "Gmail", path: siGmail.path },
  { slug: "notion", name: "Notion", path: siNotion.path },
  { slug: "whatsapp", name: "WhatsApp", path: siWhatsapp.path },
  { slug: "shopify", name: "Shopify", path: siShopify.path },
  { slug: "stripe", name: "Stripe", path: siStripe.path },
  { slug: "google-sheets", name: "Google Sheets", path: siGooglesheets.path },
  { slug: "google-drive", name: "Google Drive", path: siGoogledrive.path },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    path: siGooglecalendar.path,
  },
  { slug: "google-meet", name: "Google Meet", path: siGooglemeet.path },
  { slug: "hubspot", name: "HubSpot", path: siHubspot.path },
  { slug: "trello", name: "Trello", path: siTrello.path },
  { slug: "asana", name: "Asana", path: siAsana.path },
  { slug: "airtable", name: "Airtable", path: siAirtable.path },
  { slug: "mailchimp", name: "Mailchimp", path: siMailchimp.path },
  { slug: "zoom", name: "Zoom", path: siZoom.path },
  { slug: "dropbox", name: "Dropbox", path: siDropbox.path },
  { slug: "quickbooks", name: "QuickBooks", path: siQuickbooks.path },
  { slug: "wordpress", name: "WordPress", path: siWordpress.path },
  { slug: "clickup", name: "ClickUp", path: siClickup.path },
];
