// Rezervační systém ZakazIQ — jednotné místo pro odkaz na "Rezervovat
// konzultaci zdarma" (navbar, hero, finální CTA). URL zatím není známá —
// viz kickoff prompt, bod 5.
export const ZAKAZIQ_BOOKING_URL = "[DOPLNIT_URL_ZAKAZIQ]";

// Produkční doména webu — zatím neznámá (žádná doména nebyla potvrzena
// v AvenIQ_obsah_webu.md ani jinde v repu). Používá se pro absolutní URL
// v sitemap.xml/robots.txt; před deployem MUSÍ být nastavena přes env
// proměnnou SITE_URL na Vercelu, jinak sitemap obsahuje viditelný
// placeholder.
export const SITE_URL = process.env.SITE_URL ?? "[DOPLNIT_DOMENU_PRED_DEPLOYEM]";
