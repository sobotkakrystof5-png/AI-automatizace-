// Rezervační systém ZakazIQ — jednotné místo pro odkaz na "Rezervovat
// konzultaci zdarma" (navbar, hero, finální CTA). URL zatím není známá —
// viz kickoff prompt, bod 5.
export const ZAKAZIQ_BOOKING_URL = "[DOPLNIT_URL_ZAKAZIQ]";

// true, jakmile je ZAKAZIQ_BOOKING_URL nastavená na reálnou adresu —
// dokud ne, booking sekce (Fáze R9 redesignu) odkazuje místo mrtvého
// placeholder odkazu radši na kontaktní formulář (`/#kontakt`).
export const isBookingUrlConfigured = /^https?:\/\//.test(
  ZAKAZIQ_BOOKING_URL
);

// Produkční doména webu — zatím neznámá (žádná doména nebyla nikde
// v repu potvrzena). Používá se pro absolutní URL
// v sitemap.xml/robots.txt; před deployem MUSÍ být nastavena přes env
// proměnnou SITE_URL na Vercelu, jinak sitemap obsahuje viditelný
// placeholder.
export const SITE_URL = process.env.SITE_URL ?? "[DOPLNIT_DOMENU_PRED_DEPLOYEM]";

// true, jakmile je SITE_URL nastavená na reálnou absolutní adresu (env
// proměnná na Vercelu) — dokud ne, metadataBase/JSON-LD/canonical padají
// zpátky na localhost, aby build a SEO metadata nespadly na neplatné URL.
export const isSiteUrlConfigured = /^https?:\/\//.test(SITE_URL);

// Bezpečná absolutní base URL pro Next.js metadata (metadataBase) a JSON-LD
// — jakmile je SITE_URL nastavená na Vercelu, tahle hodnota se automaticky
// stane produkční doménou beze změny kódu.
export const SITE_URL_BASE = isSiteUrlConfigured ? SITE_URL : "http://localhost:3000";
