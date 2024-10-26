// eslint.mjs
import tsEslintParser from "@typescript-eslint/parser";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import airbnbConfig from "eslint-config-airbnb-base";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import angularEslintPlugin from "@angular-eslint/eslint-plugin";
const { configs: angularConfigs } = angularEslintPlugin;

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        AudioWorkletGlobalScope: "readonly",
      },
      parser: tsEslintParser,
      parserOptions: {
        project: "./tsconfig.json", // Check the path
        tsconfigRootDir: "./", // If tsconfig.json is in the root
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      import: importPlugin,
      "@angular-eslint": angularEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...angularConfigs.recommended.rules,
      ...airbnbConfig.rules,
      ...prettierConfig.rules,
      "no-console": ["error", { allow: ["warn", "error"] }],
      indent: ["error", 2],
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "prettier/prettier": "error",
    },
  },
  {
    files: ["*.html"],
    plugins: ["@angular-eslint/template", "html"],
    rules: {
      "@angular-eslint/template/conditional-expression": "error",
      "@angular-eslint/template/accessibility-elements-content": "error",
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/ban-duplicate-attributes": "error",
      "@angular-eslint/template/no-lifecycle-call": "error",
      "@angular-eslint/template/no-call-expression": "error",
      "@angular-eslint/template/no-empty-template": "error",
      "@angular-eslint/template/element-selectors": [
        "error",
        {
          selector: "app-", // component prefixes
        },
      ],
      "@angular-eslint/template/use-track-by-function": "warn",
    },
  },
];
