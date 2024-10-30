import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  resolve: {
    alias: {
      buffer: "buffer/",
    },
  },
  build: {
    target: "esnext", // or "es2019",
  },
});
