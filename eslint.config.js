// eslint flat config (ESM)
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  { ignores: ["**/dist/**", "**/build/**", "**/.turbo/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}", "**/*.cts", "**/*.mts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
];
