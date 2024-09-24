import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {},
    }),
  ],
  resolve: {
    alias: {
      // 为了在项目中使用绝对导入，我们需要为 src 目录创建一个别名
      "@": resolve(__dirname, "src"),
    },
  },
});
