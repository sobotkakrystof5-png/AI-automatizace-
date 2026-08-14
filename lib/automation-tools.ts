import { siN8n, siMake, siZapier, siClaude, siGooglegemini } from "simple-icons";
import { openAiIconPath } from "./brand-icons";

// Nástroje, na kterých ALTENO reálně staví automatizace (odlišné od
// lib/tools.ts, což je seznam firemních nástrojů zákazníků) — zobrazené
// jako horizontální pás v ToolsIntegration.tsx (redesign 2026-07-22).
//
// ChatGPT tu do 2026-08-05 běžel jako `path: null`, tedy textový chip bez
// loga, protože `simple-icons` OpenAI ikonu nemá. Logo je od té doby
// doplněné z lib/brand-icons.ts (oficiální tvar, ne napodobenina), takže
// pás nemá jeden chip vizuálně slabší než ostatní.
//
// Google Gemini doplněno 2026-08-10 (žádost uživatele) — logo je
// `siGooglegemini` přímo ze `simple-icons`, tedy standardní cestou, ne
// přes lib/brand-icons.ts.
//
// `path: null` typ zůstává — ToolBand pro něj umí vykreslit samotný text a
// je to správné chování pro budoucí nástroj, ke kterému oficiální SVG
// nebude. Nevymýšlet náhradní ikonu.
export type AutomationTool = {
  slug: string;
  name: string;
  path: string | null;
};

export const automationTools: AutomationTool[] = [
  { slug: "n8n", name: "n8n", path: siN8n.path },
  { slug: "claude", name: "Claude", path: siClaude.path },
  { slug: "make", name: "Make.com", path: siMake.path },
  { slug: "zapier", name: "Zapier", path: siZapier.path },
  { slug: "chatgpt", name: "ChatGPT", path: openAiIconPath },
  { slug: "gemini", name: "Google Gemini", path: siGooglegemini.path },
];
