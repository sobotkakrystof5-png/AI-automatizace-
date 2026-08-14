import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendorované design skilly (viz claude.md, sekce "Design skilly").
    // Je to cizí kód třetích stran, který se v projektu needituje. Jeho
    // lint chyby by jen zašuměly výstup a schovaly skutečné problémy v
    // našem kódu.
    ".claude/**",
  ]),
]);

export default eslintConfig;
