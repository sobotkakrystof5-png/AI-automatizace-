import { siN8n, siMake, siZapier, siAnthropic } from "simple-icons";

// Nástroje, na kterých AvenIQ reálně staví automatizace (odlišné od
// lib/tools.ts, což je seznam firemních nástrojů zákazníků) — zobrazené
// jako horizontální pás v ToolsIntegration.tsx (redesign 2026-07-22).
//
// `simple-icons` v16.27.0 nemá export pro OpenAI/ChatGPT (ověřeno přes
// `Object.keys(require('simple-icons')).filter(k =>
// k.toLowerCase().includes('openai'))` → jen "siOpenaigym", jiný produkt).
// Stejně jako u Slack v lib/tools.ts: `path: null` a textový placeholder
// chip v ToolBand, ne vymyšlené/generované logo.
export type AutomationTool = {
  slug: string;
  name: string;
  path: string | null;
};

export const automationTools: AutomationTool[] = [
  { slug: "n8n", name: "n8n", path: siN8n.path },
  { slug: "claude", name: "Claude", path: siAnthropic.path },
  { slug: "make", name: "Make.com", path: siMake.path },
  { slug: "zapier", name: "Zapier", path: siZapier.path },
  { slug: "chatgpt", name: "ChatGPT", path: null },
];
