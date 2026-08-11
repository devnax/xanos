import path from "path";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import setup from "../../../core/setup.js";
import logger from "../../../core/logger.js";

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
          chunkFileNames(chunkInfo) {
            const name = chunkInfo.name;
            if (name.startsWith("app")) {
              return `apps/[hash].js`;
            }
            if (name.startsWith("rolldown-runtime")) {
              return `vendor/[hash].js`;
            }
            if (name.startsWith("vendor")) {
              return `vendor/[hash].js`;
            }
            return `[hash].js`;
          },

          manualChunks(id) {
            id = id.replace(/\\/g, "/");

            if (id.includes("@xanui/")) {
              // return "xanui";
            }

            if (id.includes("node_modules")) {
              const parts = id.split("/");
              const index = parts.lastIndexOf("node_modules");
              if (index !== -1 && index + 1 < parts.length) {
                const packageName = parts[index + 1];
                return `vendor/${packageName}`;
              }
            }
            return undefined;
          },
        },
      },
    },
  });
};

export default build;
