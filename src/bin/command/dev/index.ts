import path from "path";
import chokidar from "chokidar";
import { spawn } from "node:child_process";
import { fileURLToPath } from "url";
import logger from "../../../core/logger.js";
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
  let watcher = chokidar.watch(
    [`apps`, `xanos.config.ts`, `xanos.startup.ts`],
    {
      cwd: process.cwd(),
      ignoreInitial: true,
    },
  );

  watcher.on("all", (event, file) => {
    const normalized = file.replaceAll("\\", "/");

    if (
      normalized.endsWith("/schema/index.ts") ||
      normalized.endsWith("/api/index.ts") ||
      normalized.endsWith("xanos.config.ts") ||
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
