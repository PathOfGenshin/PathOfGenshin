module.exports = {
  semi: false,
  trailingComma: "all",
  printWidth: 88,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  importOrder: [
    "^(react)$",
    "^next(.*)$",
    "^(?!(@|[./]))(.*)$",
    "^@(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
}
