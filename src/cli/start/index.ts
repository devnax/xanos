import path from "path";
import fs from "fs";
import server from "../../server/index.js";
import logger, { printServerInfo } from "../../core/logger.js";
const start = async (_str: string, options: { port?: number }) => {
  // check if the prodcution build exists. check the startup.js file in the .os directory. if it doesn't exist, run the build command first
  const cwd = process.cwd();
  const startupFile = path.join(cwd, ".os", "startup.js");
  if (!fs.existsSync(startupFile)) {
    throw new Error(
      "Production build not found. Please run the build command first.",
    );
  }
  server({
    port: options?.port ?? 3000,
    development: false,
  });
  printServerInfo({
    port: options?.port ?? 3000,
    version: "1.0.0",
    env: process.env.NODE_ENV ? [process.env.NODE_ENV] : [],
  });
};

export default start;
