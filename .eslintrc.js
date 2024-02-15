module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "react**",
            group: "external",
            position: "before",
          },
          {
            pattern: "{next**,next/**}",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "parent",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "next"],
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
          orderImportKind: "asc",
        },
      },
    ],
  },
};
