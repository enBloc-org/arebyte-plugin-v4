/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 70,
  tabWidth: 2,
  useTabs: true,
  semi: true,
  arrowParens: "avoid",
  bracketSpacing: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "none",
  arrowParens: "avoid",
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "", // Empty line
    "^@plasmo/(.*)$",
    "",
    "^@plasmohq/(.*)$",
    "",
    "^~(.*)$",
    "",
    "^[./]"
  ]
}
