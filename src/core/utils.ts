import logger from "./logger.js";
import pc from "picocolors";
import { frameworkDir } from "./paths.js";
import path from "path";
import fs from "fs";

export const verifyAppName = (appName: string) => {
  if (!/^[a-z][a-z0-9_-]{2,}$/.test(appName)) {
    logger.warn(
      `Invalid app name "${pc.red(appName)}". ` +
        `Use 3+ characters, start with a lowercase letter, ` +
        `and use only a-z, 0-9, "-" or "_".`,
    );
    return false;
  }
  return true;
};

export function getFrameworkPackageJson() {
  const packageJsonPath = path.join(frameworkDir, "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
}
