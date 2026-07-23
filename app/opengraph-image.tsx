import { ImageResponse } from "next/og";

// Sdílený OG/Twitter obrázek pro celý web (root-level file convention —
// podstránky ho dědí, pokud nemají vlastní opengraph-image). Generuje se
// jednou při buildu (žádný dynamický segment), takže náklad na build je
// zanedbatelný. Barvy odpovídají design systému (zinc-950 pozadí,
// brand-turquoise #2DD4BF akcent) — žádná nová barva navíc.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45,212,191,0.35) 0%, rgba(45,212,191,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 400,
            color: "#fafafa",
            letterSpacing: -2,
          }}
        >
          AvenIQ
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            width: 120,
            height: 4,
            backgroundColor: "#2DD4BF",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 36,
            color: "#a1a1aa",
          }}
        >
          Chytrá automatizace. Lidský přístup.
        </div>
      </div>
    ),
    { ...size }
  );
}
