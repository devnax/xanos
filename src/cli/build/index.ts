import path from "path";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";

const cwd = process.cwd();
const outDir = path.join(cwd, ".os");

function getPackageName(id: string) {
  const normalized = id.replace(/\\/g, "/");

  const marker = "/node_modules/";

  const index = normalized.lastIndexOf(marker);

  if (index === -1) {
    return null;
  }

  const packagePath = normalized.slice(index + marker.length);

  const parts = packagePath.split("/");

  if (parts[0].startsWith("@")) {
    return `${parts[0]}-${parts[1]}`;
  }

  return parts[0];
}

const build = async () => {
  await viteBuild({
    root: cwd,

    plugins: [react()],

    build: {
      outDir,

      rollupOptions: {
        input: path.resolve(cwd, "startup.ts"),

        output: {
          entryFileNames: "startup.js",
          chunkFileNames: "chunks/[hash].js",
          assetFileNames: "assets/[hash][extname]",

          manualChunks(id) {
            const normalized = id.replace(/\\/g, "/");

            if (!normalized.includes("/node_modules/")) {
              return;
            }

            if (
              normalized.includes("/node_modules/react/") ||
              normalized.includes("/node_modules/react-dom/") ||
              normalized.includes("/node_modules/scheduler/")
            ) {
              return "framework";
            }

            return "vendor";
          },
        },
      },
    },
  });
};

export default build;
