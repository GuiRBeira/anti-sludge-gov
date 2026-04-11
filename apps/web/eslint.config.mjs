import nextConfig from "eslint-config-next";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextConfig,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "eslint-comments/no-unused-disable": "off"
    },
  },
]);

export default eslintConfig;
