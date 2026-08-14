#!/usr/bin/env node
// SubagentStop hook — krok 1 ze dvou: ověření práce subagenta.
// Běží PŘED formátovacím hookem (subagent-format.mjs), protože formátování
// nemá smysl pouštět na kód, který se nepřeloží.
//
// Nikdy neblokuje (vždy exit 0) — rebrand je textová operace, kde přerušení
// uprostřed nechá repozitář v půl přejmenovaném stavu. Nálezy se hlásí zpět
// jako `systemMessage`, aby na ně orchestrátor reagoval vědomě.

import { execFileSync } from "node:child_process";

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

function run(cmd, args) {
  try {
    return {
      ok: true,
      out: execFileSync(cmd, args, {
        cwd: projectDir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }),
    };
  } catch (error) {
    return {
      ok: false,
      out: `${error.stdout ?? ""}${error.stderr ?? ""}`.trim(),
    };
  }
}

const status = run("git", ["status", "--porcelain"]);
const changed = (status.out || "")
  .split("\n")
  .map((line) => line.slice(3).trim())
  .filter(Boolean)
  // Přejmenování hlásí git jako "staré -> nové"; zajímá nás cílová cesta.
  .map((path) => (path.includes(" -> ") ? path.split(" -> ")[1] : path))
  .filter((path) => /\.(ts|tsx|mts|cts)$/.test(path));

const problems = [];

if (changed.length === 0) {
  problems.push("Subagent nezměnil žádný TypeScript soubor.");
} else {
  const tsc = run("npx", ["tsc", "--noEmit"]);
  if (!tsc.ok) problems.push(`TypeScript neprošel:\n${tsc.out.slice(0, 2000)}`);

  const lint = run("npx", ["eslint", ...changed]);
  if (!lint.ok) problems.push(`ESLint nahlásil chyby:\n${lint.out.slice(0, 2000)}`);

  // Kontrola zbytků starého názvu právě v souborech, kterých se subagent dotkl.
  const leftovers = run("git", ["grep", "-n", "-i", "AvenIQ", "--", ...changed]);
  if (leftovers.out.trim()) {
    problems.push(`Zbylé výskyty starého názvu:\n${leftovers.out.slice(0, 2000)}`);
  }
}

const message = problems.length
  ? `Ověření práce subagenta — ${problems.length} nález(ů):\n\n${problems.join("\n\n")}`
  : `Ověření práce subagenta: v pořádku (${changed.length} souborů, TypeScript i ESLint prošly, žádné zbytky starého názvu).`;

process.stdout.write(JSON.stringify({ systemMessage: message }));
