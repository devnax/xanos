import path from "path";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import setup from "../../../core/setup.js";
import logger from "../../../core/logger.js";
import obfuscator from "./secure.js";

const cwd = process.cwd();
const outDir = path.join(cwd, ".os");

const build = async (options: { secure?: string }) => {
  let plugins: any = [react()];
  if (options.secure !== "false") {
    plugins.push(obfuscator());
  }
  await setup();
  await viteBuild({
    customLogger: logger,
    root: cwd,
    define: {
      __XANOS_CLIENT__: "true",
    },
    plugins,

    build: {
      outDir,

      rollupOptions: {
        checks: {
          pluginTimings: false,
        },
        input: path.resolve(cwd, "xanos.startup.ts"),

        output: {
          assetFileNames: "assets/[hash][extname]",
          entryFileNames: "startup.js",
          chunkFileNames(chunkInfo) {
            const name = chunkInfo.name;

            if (name.startsWith("database")) {
              return `database/[hash].js`;
            }

            if (name.startsWith("schema")) {
              return `schema/[hash].js`;
            }

            if (name.startsWith("app")) {
              return `apps/[hash].js`;
            }

            if (name.startsWith("rolldown-runtime")) {
              return `vendor/[hash].js`;
            }
            return `vendor/[hash].js`;
          },

          manualChunks(id) {
            id = id.replace(/\\/g, "/");
            if (!id.includes("node_modules")) {
              return undefined;
            }

            const parts = id.split("/");
            const index = parts.lastIndexOf("node_modules");
            if (index !== -1 && index + 1 < parts.length) {
              const packageName = parts[index + 1];
              return `vendor/${packageName}`;
            }

            return undefined;
          },
        },
      },
    },
  });
};

export default build;
