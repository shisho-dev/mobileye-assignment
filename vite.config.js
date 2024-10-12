import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      vue: "@vue/compat",
    },
  },
  plugins: [vue()],
  publicPath: process.env.NODE_ENV === "production" ? "/my-vue-app/" : "/",
});
