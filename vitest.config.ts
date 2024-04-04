/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/**"],
      exclude: [...(configDefaults.coverage.exclude || []), "src/index.*"],
      reporter: ["text", "lcov"],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.js"],
  },
  envDir: ".env.test",
});
