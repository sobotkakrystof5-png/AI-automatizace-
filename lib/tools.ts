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
  siGoogledocs,
  siGoogleslides,
  siGoogleanalytics,
  siGoogleads,
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
  siTelegram,
  siDiscord,
  siFacebook,
  siX,
  siYoutube,
  siJira,
  siGithub,
  siWoocommerce,
  siPaypal,
  siXero,
  siZoho,
  siZendesk,
  siIntercom,
  siBrevo,
  siWebflow,
  siTypeform,
  siCalendly,
} from "simple-icons";
import {
  faLinkedin,
  faSlack,
  faSalesforce,
  faMicrosoft,
  type IconDefinition,
} from "@fortawesome/free-brands-svg-icons";

// Jediný zdroj dat pro nástroje na desce spojů (VerifiedSystems.tsx →
// ToolBoard.tsx) a pro uzly hero diagramu (AutomationJourney.tsx, bere si
// odsud 5 konkrétních slugů přes find — proto se existující slugy nikdy
// nepřejmenovávají).
//
// Rozšířeno na 44 nástrojů 2026-08-10 na žádost uživatele („přes 40
// nástrojů… které mají přímou integraci s n8n"). Kritérium pro zařazení:
// nástroj má **oficiální n8n node** — ověřeno 2026-08-10 přes oficiální
// n8n MCP (search_nodes), ne odhadem. Jediná výjimka je Google Meet
// (vlastní node nemá, řeší se přes node Google Calendar) — je to ale
// položka schválená už 2026-07-21, takže se bez souhlasu neodebírá.
// Dlaždice „Microsoft 365" zastupuje rodinu Microsoft nodes v n8n
// (Outlook, Excel, Teams, OneDrive, To Do) — jedna dlaždice, ne pět,
// protože FA má jen souhrnné logo Microsoft.
//
// Loga: primárně `simple-icons` (oficiální monochrome brand ikony,
// viewBox 24×24). LinkedIn, Slack, Salesforce a Microsoft v simple-icons
// nejsou (odstraněny kvůli trademark policy) — pro ně se 2026-08-10 se
// souhlasem uživatele přidal balíček `@fortawesome/free-brands-svg-icons`
// (stejný princip: surová SVG path data, žádné komponenty; viewBox se
// liší per ikona, proto pole `viewBox` níže). **Tím se ruší rozhodnutí
// z 2026-07-22 Slack úplně vynechat** — tehdy byla loga bez viditelných
// názvů a bez alternativního zdroje; teď má každá dlaždice název a FA
// poskytuje skutečné logo, uživatel návrat Slacku výslovně schválil.
// Pořád platí: nikdy nekreslit vymyšlenou napodobeninu loga — nástroj,
// pro který nemá logo ani simple-icons, ani FA brands, se buď vynechá,
// nebo dostane přiznanou textovou dlaždici (path: null).
export type Tool = {
  slug: string;
  name: string;
  path: string | null;
  /** SVG viewBox — simple-icons mají 24×24 (default), FA brands vlastní. */
  viewBox?: string;
};

// FA IconDefinition → { path, viewBox }. Brands ikony mají vždy jedinou
// path (string); pole String() je jen pojistka typu, ne skrytá logika.
function fa(icon: IconDefinition): Pick<Tool, "path" | "viewBox"> {
  return {
    path: String(icon.icon[4]),
    viewBox: `0 0 ${icon.icon[0]} ${icon.icon[1]}`,
  };
}

// Pořadí = pořadí dlaždic na desce (mřížka se plní po řádcích). Nástroje
// jsou seskupené po rodinách (Google → komunikace → sociální sítě → práce
// a projekty → e-commerce a platby → CRM a podpora → marketing a web),
// aby oko četlo shluky souvisejících log, ne náhodnou koláž — vizuální
// členění bez nadpisů kategorií, které uživatel u tohoto konceptu nechtěl.
export const connectedTools: Tool[] = [
  // Google
  { slug: "gmail", name: "Gmail", path: siGmail.path },
  { slug: "google-sheets", name: "Google Sheets", path: siGooglesheets.path },
  { slug: "google-drive", name: "Google Drive", path: siGoogledrive.path },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    path: siGooglecalendar.path,
  },
  { slug: "google-docs", name: "Google Docs", path: siGoogledocs.path },
  { slug: "google-slides", name: "Google Slides", path: siGoogleslides.path },
  {
    slug: "google-analytics",
    name: "Google Analytics",
    path: siGoogleanalytics.path,
  },
  { slug: "google-ads", name: "Google Ads", path: siGoogleads.path },
  { slug: "google-meet", name: "Google Meet", path: siGooglemeet.path },
  // Microsoft
  { slug: "microsoft-365", name: "Microsoft 365", ...fa(faMicrosoft) },
  // Komunikace
  { slug: "whatsapp", name: "WhatsApp", path: siWhatsapp.path },
  { slug: "telegram", name: "Telegram", path: siTelegram.path },
  { slug: "slack", name: "Slack", ...fa(faSlack) },
  { slug: "discord", name: "Discord", path: siDiscord.path },
  { slug: "zoom", name: "Zoom", path: siZoom.path },
  // Sociální sítě a obsah
  { slug: "facebook", name: "Facebook", path: siFacebook.path },
  { slug: "linkedin", name: "LinkedIn", ...fa(faLinkedin) },
  { slug: "x", name: "X (Twitter)", path: siX.path },
  { slug: "youtube", name: "YouTube", path: siYoutube.path },
  // Práce a projekty
  { slug: "notion", name: "Notion", path: siNotion.path },
  { slug: "trello", name: "Trello", path: siTrello.path },
  { slug: "asana", name: "Asana", path: siAsana.path },
  { slug: "clickup", name: "ClickUp", path: siClickup.path },
  { slug: "jira", name: "Jira", path: siJira.path },
  { slug: "airtable", name: "Airtable", path: siAirtable.path },
  { slug: "github", name: "GitHub", path: siGithub.path },
  { slug: "dropbox", name: "Dropbox", path: siDropbox.path },
  // E-commerce a platby
  { slug: "shopify", name: "Shopify", path: siShopify.path },
  { slug: "woocommerce", name: "WooCommerce", path: siWoocommerce.path },
  { slug: "stripe", name: "Stripe", path: siStripe.path },
  { slug: "paypal", name: "PayPal", path: siPaypal.path },
  { slug: "quickbooks", name: "QuickBooks", path: siQuickbooks.path },
  { slug: "xero", name: "Xero", path: siXero.path },
  // CRM a podpora
  { slug: "hubspot", name: "HubSpot", path: siHubspot.path },
  { slug: "salesforce", name: "Salesforce", ...fa(faSalesforce) },
  { slug: "zoho", name: "Zoho", path: siZoho.path },
  { slug: "zendesk", name: "Zendesk", path: siZendesk.path },
  { slug: "intercom", name: "Intercom", path: siIntercom.path },
  // Marketing a web
  { slug: "mailchimp", name: "Mailchimp", path: siMailchimp.path },
  { slug: "brevo", name: "Brevo", path: siBrevo.path },
  { slug: "wordpress", name: "WordPress", path: siWordpress.path },
  { slug: "webflow", name: "Webflow", path: siWebflow.path },
  { slug: "typeform", name: "Typeform", path: siTypeform.path },
  { slug: "calendly", name: "Calendly", path: siCalendly.path },
];
