import path from "path";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";

const cwd = process.cwd();
const outDir = path.join(cwd, ".os");

const build = async () => {
  await viteBuild({
    root: cwd,
    plugins: [react()],
    build: {
      outDir,
      rollupOptions: {
        input: "startup.ts",
        output: {
          entryFileNames: "startup.js",
          chunkFileNames: "chunks/[hash].js",
          assetFileNames: "assets/[hash][extname]",
        },
      },
    },
  });
};

export default build;
