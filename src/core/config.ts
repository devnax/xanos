import path from "path";
import fs from "fs";
import type { XanosConfig } from "./index.js";
import _import from "./import.js";

const configPath = path.resolve(process.cwd(), "xanos.config.ts");
let loadedConfig: XanosConfig | null = null;
export async function loadConfig(): Promise<XanosConfig> {
  if (loadedConfig) {
    return loadedConfig;
  }
  try {
    await fs.promises.access(configPath, fs.constants.F_OK);
  } catch {
    return {
      database: {
        engine: "sqlite",
        sqlite: "./database/xanos.db",
      },
      files: "./public/uploads",
    };
  }

  try {
    const mod = await _import(configPath);
    const config =
      (mod as { default?: XanosConfig }).default ?? (mod as XanosConfig);
    loadedConfig = config;
    return loadedConfig;
  } catch (error) {
    throw new Error(`Failed to load xanos.config.ts\n\n${error}`);
  }
}
