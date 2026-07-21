import type { MetadataRoute } from "next";
import { automationAreas } from "@/lib/automation-areas";
import { SITE_URL } from "@/lib/constants";

// /design-preview je interní QA route (Fáze 1) a nepatří do produkčního
// webu — viz i její vlastní `robots: { index: false }`. Vynechána i
// odsud, aby ji Google vůbec nenašel přes sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
  ];

  // /vop, /ochrana-osobnich-udaju a /cookies jsou záměrně vynechané —
  // mají `robots: { index: false }` (právní text je zatím placeholder,
  // viz claude.md), takže by v sitemapu vysílaly protichůdný signál
  // ("indexuj mě") vůči vlastní meta direktivě stránky.

  const automationRoutes = automationAreas.map((area) => ({
    path: `/automatizace/${area.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...automationRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
