"use client";

import dynamic from "next/dynamic";

// next/dynamic(..., { ssr: false }) smí být volané jen z "use client"
// souboru — tenhle wrapper existuje čistě proto, aby ho mohly Server
// Components (např. Hero) renderovat normálně jako <FlowDiagramLazy />.
const FlowDiagram = dynamic(() => import("./FlowDiagram"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-full animate-pulse rounded-xl bg-zinc-900" />
  ),
});

export default FlowDiagram;
