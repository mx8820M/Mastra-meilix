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
    // Vendored registry code (shadcn / AI Elements CLIs overwrite local edits).
    // Still type-checked by `tsc` and `next build`.
    "src/components/ui/**",
    "src/components/ai-elements/**",
  ]),
]);

export default eslintConfig;
