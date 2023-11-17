import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      components: "/src/components",
      const: "/src/const",
      lib: "/src/lib",
      context: "/src/context",
      store: "/src/store",
    },
  },
});
