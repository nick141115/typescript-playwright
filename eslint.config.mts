import * as js from "@eslint/js";
import * as globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
// import * as eslintConfigPrettier from "eslint-config-prettier"; // Импорт

export default defineConfig([
  // 1. Глобальный объект игнорирования БЕЗ ведущих слэшей
  {
    ignores: [
      ".github/",
      ".idea/",
      "allure-results/",
      "docs/",
      "test-results/", // Убран /
      "playwright-report/", // Убран /
      "blob-report/", // Убран /
      "playwright/.cache/", // Убран /
      "playwright/.auth/", // Убран /
      "README.md", // В регистре .md (обычно маленькими)
      "settings-example.ts",
      "settings.ts",
      "playwright.config.ts",
      "example.spec.ts",
      "temp.spec.ts",
      "**/node_modules/", // Добавлен glob-паттерн для надежности
      "build/",
      "coverage/",
    ],
  },
  // 2. Конфигурация TypeScript (перенесена выше вашей кастомной,
  // чтобы ваши правила rules гарантированно были главнее и шли в конце)
  ...tseslint.configs.recommended,

  // 3. Кастомная конфигурация
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      // Отключает предупреждения об использовании any во всем проекте
      "@typescript-eslint/no-explicit-any": "off",
      "max-len": ["error", { code: 120 }],
    },
  },
  // eslintConfigPrettier, // Добавление в конец массива
]);
