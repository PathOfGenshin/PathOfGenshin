module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 },
  ignorePatterns: [
    "node_modules/*",
    ".next/*",
    ".out/*",
    "!.prettierrc.js",
    "src/**/*.scss",
    "src/generated/**/*.ts",
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    "import/resolver": "typescript",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "eslint-config-prettier",
      ],
      rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        "import/order": [
          "error",
          {
            pathGroups: [
              {
                pattern: "@/**",
                group: "internal",
              },
            ],
            groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            "newlines-between": "always",
          },
        ],
      },
    },
  ],
}
