import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());
  const isLib = mode === "lib";
  return defineConfig({
    plugins: [
      vue({
        customElement: isLib,
      }),
      vueJsx(),
    ],
    base: "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      preserveSymlinks: true,
    },
    build: isLib
      ? {
          target: "esnext",
          // minify: "terser",
          lib: {
            entry: resolve(__dirname, "lib/main.js"), // 设置入口文件
            name: "layout", // 起个名字，安装、引入用
            fileName: (format) => `layout.${format}.js`, // 打包后的文件名
            // formats: ["es", "cjs", "iife"],
          },
          // rollupOptions: {
          //   // 确保外部化处理那些你不想打包进库的依赖
          //   external: ["echarts"],
          //   output: {
          //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          //     globals: {
          //       echarts: "echarts",
          //     },
          //   },
          // },
        }
      : {},
    define: {
      "process.env.NODE_ENV": `'${env.VITE_ENV}'`,
      "process.env.VITE_MODE": `'${env.VITE_MODE}'`,
    },
    server: {
      host: "0.0.0.0",
    },
  });
};
