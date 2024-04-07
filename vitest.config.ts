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
    environment: "jsdom",
    globals: true,
    outputFile: "./.test_report/test-output.xml",
    reporters: ["junit", "default"],
    setupFiles: ["vitest.setup.js"],
  },
  envDir: ".env.test",
});
