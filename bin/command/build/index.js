import path from "path";
import fs from "fs";
import { build as viteBuild } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const cwd = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const outDir = path.join(cwd, ".os");

const serverJs = `\
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(__dirname, { index: "index.html" }));

app.get("/{*splat}", (_, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
`;

const build = async (str, options) => {
  await viteBuild({
    root: __dirname,
    plugins: [react()],
    build: {
      outDir,
      emptyOutDir: true,
    },
  });
  fs.writeFileSync(path.join(outDir, "server.js"), serverJs, "utf-8");
  console.log("[xanos] build complete → .os/");
};

export default build;
