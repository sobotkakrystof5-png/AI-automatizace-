#!/usr/bin/env node
// SubagentStop hook — krok 2 ze dvou: formátování po ověření.
//
// Používá `eslint --fix`, ne Prettier: Prettier v projektu není a jeho
// doinstalování by při prvním běhu přeformátovalo i kód, kterého se rebrand
// netýká — rebrandový diff by zanikl ve stovkách formátovacích řádků.
// Rozhodnutí uživatele 2026-08-14.
//
// Formátuje výhradně soubory změněné v pracovním stromu, nikdy celý repozitář.

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
  .map((path) => (path.includes(" -> ") ? path.split(" -> ")[1] : path))
  .filter((path) => /\.(ts|tsx|mts|cts)$/.test(path));

if (changed.length === 0) {
  process.stdout.write(
    JSON.stringify({ systemMessage: "Formátování: žádné změněné soubory." }),
  );
  process.exit(0);
}

const fix = run("npx", ["eslint", "--fix", ...changed]);

const message = fix.ok
  ? `Formátování (eslint --fix): hotovo na ${changed.length} souborech.`
  : `Formátování (eslint --fix) doběhlo se zbývajícími nálezy, které nejdou opravit automaticky:\n${fix.out.slice(0, 2000)}`;

process.stdout.write(JSON.stringify({ systemMessage: message }));
