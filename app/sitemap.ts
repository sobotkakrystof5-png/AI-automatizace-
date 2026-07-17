import type { MetadataRoute } from "next";
import { automationAreas } from "@/lib/automation-areas";
import { SITE_URL } from "@/lib/constants";

// /design-preview je interní QA route (Fáze 1) a nepatří do produkčního
// webu — viz i její vlastní `robots: { index: false }`. Vynechána i
// odsud, aby ji Google vůbec nenašel přes sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/vop", changeFrequency: "yearly" as const, priority: 0.3 },
    {
      path: "/ochrana-osobnich-udaju",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    { path: "/cookies", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

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
