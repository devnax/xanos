import server from "../../server/index.js";
import fs from "fs";
import { printServerInfo } from "../../core/logger.js";
import path from "path";
import { frameworkDir } from "../../core/paths.js";

const dev = async () => {
  const port = 3000;
  const packageFilePath = path.join(frameworkDir, "package.json");
  const packageJson = fs.readFileSync(packageFilePath, "utf-8");
  const packageData = JSON.parse(packageJson);
  const version = packageData.version ?? "0.0.0";

  server({
    port,
    development: true,
  });

  printServerInfo({
    port: port,
    version: version,
    env: process.env.NODE_ENV ? [process.env.NODE_ENV] : [],
  });
};

dev();
