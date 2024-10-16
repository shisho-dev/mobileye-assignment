import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      vue: "@vue/compat",
    },
  },
  plugins: [vue()],
  base: "/mobileye-assignment/",
  publicDir: "/mobileye-assignment/",
});
