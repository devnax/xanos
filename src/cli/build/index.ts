import path from "path";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import setup from "../../core/setup.js";
import logger from "../../core/logger.js";

const cwd = process.cwd();
const outDir = path.join(cwd, ".os");

const build = async () => {
  setup();

  await viteBuild({
    customLogger: logger,
    root: cwd,
    define: {
      __XANOS_CLIENT__: "true",
    },
    plugins: [react()],

    build: {
      outDir,

      rollupOptions: {
        input: path.resolve(cwd, "xanos.startup.ts"),

        output: {
          assetFileNames: "assets/[hash][extname]",
          entryFileNames: "startup.js",
          chunkFileNames: (chunkInfo) => {
            return `chunks/[name]-[hash].js`;
            const name = chunkInfo.name;

            const libs = [
              "framework",
              "xansql",
              "encrypt",
              "compresor",
              "ui",
              "vendor",
            ];

            if (libs.includes(name)) {
              return `libs/${name}-[hash].js`;
            }

            return `os/${name}-[hash].js`;
          },

          manualChunks(id) {
            const normalized = id.replace(/\\/g, "/");
            if (!normalized.includes("/node_modules/")) {
              return;
            }

            if (
              normalized.includes("/node_modules/react/") ||
              normalized.includes("/node_modules/react-dom/") ||
              normalized.includes("/node_modules/react-router/") ||
              normalized.includes("/node_modules/react-router-dom/") ||
              normalized.includes("/node_modules/react-router-config/") ||
              normalized.includes("/node_modules/scheduler/")
            ) {
              return "framework";
            }

            if (
              normalized.includes("/node_modules/react-rock/") ||
              normalized.includes("/node_modules/xanv/") ||
              normalized.includes("/node_modules/youid/") ||
              normalized.includes("/node_modules/react-state-bucket/")
            ) {
              return "xandev";
            }

            if (
              normalized.includes("/node_modules/fflate/") ||
              normalized.includes("/node_modules/msgpackr/")
            ) {
              return "encrypt";
            }

            if (
              normalized.includes("/node_modules/libsodium/") ||
              normalized.includes("/node_modules/libsodium-wrappers/")
            ) {
              return "compresor";
            }

            if (
              normalized.includes("/node_modules/xanfetch/") ||
              normalized.includes("/node_modules/securequ/") ||
              normalized.includes("/node_modules/xansql/")
            ) {
              return "xansql";
            }

            if (
              normalized.includes("/node_modules/@xanui/") ||
              normalized.includes("/node_modules/oncss/") ||
              normalized.includes("/node_modules/pretty-class/") ||
              normalized.includes("/node_modules/hueforge/") ||
              normalized.includes("/node_modules/embla-carousel-react/") ||
              normalized.includes("/node_modules/embla-carousel/") ||
              normalized.includes("/node_modules/react-grid-layout/")
            ) {
              return "ui";
            }

            return "vendor";
          },
        },
      },
    },
  });
};

export default build;
