import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Sdílený OG/Twitter obrázek pro celý web (root-level file convention.
// Podstránky ho dědí, pokud nemají vlastní opengraph-image). Generuje se
// jednou při buildu (žádný dynamický segment), takže náklad na build je
// zanedbatelný. Barvy odpovídají design systému (zinc-950 pozadí,
// brand-turquoise #2DD4BF akcent), žádná nová barva navíc.
//
// Wordmark je od rebrandu 2026-08-14 skutečné logo, ne vysázený text: řez
// loga není žádným písmem projektu reprodukovatelný a OG náhled je často
// první, co člověk ze značky uvidí. Soubor se načítá ze souborového systému
// a vkládá jako data URI. Satori neumí relativní URL a obrázek musí být
// v generovaném PNG zapečený, ne stažený za běhu.
//
// Použit je wordmark bez hesel, ne `alteno-logo-claim.png`: pod logem už
// stojí hero claim a obojí najednou by z náhledu udělalo dva soupeřící slogany.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const wordmark = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "alteno-logo.png")
).toString("base64")}`;

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
        {/* satori v ImageResponse renderuje jen <img>; next/image tu nefunguje. */}
        <img src={wordmark} alt="ALTENO" width={620} height={83} />
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
          Vy řešíte byznys. Rutinu automatizujeme my.
        </div>
      </div>
    ),
    { ...size }
  );
}
