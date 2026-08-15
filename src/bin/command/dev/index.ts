import path from "path";
import chokidar from "chokidar";
import { spawn } from "node:child_process";
import { fileURLToPath } from "url";
import logger from "../../../core/logger.js";
import { isWorkingFrameworkDir } from "../../../core/paths.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "./server.js");

let child: any;
function start() {
  child = spawn(process.execPath, [filePath], {
    stdio: "inherit",
  });
}

function restart() {
  child?.kill();
  start();
}

const dev = () => {
  start();

  const dirs = [`apps`, `xanos.config.ts`];
  if (isWorkingFrameworkDir) {
    dirs.push(`dist/server`);
  }
  let watcher = chokidar.watch(dirs, {
    cwd: process.cwd(),
    ignoreInitial: true,
  });

  watcher.on("all", (event, file) => {
    const normalized = file.replaceAll("\\", "/");

    if (
      normalized.endsWith("/schema/index.ts") ||
      normalized.endsWith("/api/index.ts") ||
      normalized.endsWith("xanos.config.ts") ||
      (normalized.includes("dist/server/") && normalized.endsWith(".js")) ||
      (event === "unlink" && normalized.endsWith("xanos.startup.ts"))
    ) {
      logger.info(`Detected change in ${normalized}. Restarting server...`);
      restart();
    }
  });

  process.on("SIGINT", () => {
    child?.kill();
    watcher.close();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    child?.kill();
    watcher.close();
    process.exit(0);
  });
};

export default dev;
