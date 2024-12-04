import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    server: {
      deps: {
        inline: ["next"],
      },
    },
  },
});
