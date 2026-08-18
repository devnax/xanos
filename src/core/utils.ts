import logger from "./logger.js";
import pc from "picocolors";
import { frameworkDir } from "./paths.js";
import path from "path";
import fs from "fs";
import youid from "youid";

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

export const makeOSID = () => {
  const uid = youid();
  return uid.substring(0, 8);
};

export const isObject = (value: any): boolean => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};
