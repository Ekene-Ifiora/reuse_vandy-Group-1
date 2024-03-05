import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    files: ['test/**/*.test.jsx'],
    exclude: ['node_modules', './src']
  },
});
