import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// Global ESLint configuration that can be reused across projects
const eslintConfig = [
  // Ignore patterns - global ignore rules
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "coverage/**",
      ".vscode/**",
      ".git/**",
    ],
  },
  // Main configuration
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // Formatting rules (disabled to avoid conflicts with Prettier)
      indent: "off",
      "@typescript-eslint/indent": "off",
      quotes: "off",
      semi: "off",
      "comma-dangle": "off",

      // Code quality rules (global standards)
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: "error",
      "no-duplicate-imports": "error",

      // React/Next.js specific rules
      "react/no-unescaped-entities": "off",
      "react/jsx-key": "warn",
      "@next/next/no-img-element": "warn",
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
  },
]

export default eslintConfig
