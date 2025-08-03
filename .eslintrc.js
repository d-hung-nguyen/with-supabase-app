module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "no-console": "warn",
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
  },
  overrides: [
    {
      files: ["lib/pg-meta/**/*.ts"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
    {
      files: ["**/supabase-manager/**/*.tsx", "**/supabase-manager/**/*.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
    {
      files: [
        "**/dynamic-form.tsx",
        "**/results-table.tsx",
        "**/sql-editor.tsx",
      ],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
    {
      files: ["lib/logs.ts", "**/ui/chart.tsx"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
}
