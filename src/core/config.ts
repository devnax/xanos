import path from "path";
import fs from "fs";
import _import from "./import.js";
import { XanosConfig } from "../types/index.js";

const configPath = path.resolve(process.cwd(), "xanos.config.ts");
let loadedConfig: XanosConfig | null = null;
export async function loadConfig(): Promise<XanosConfig> {
  if (loadedConfig) {
    return loadedConfig;
  }
  try {
    await fs.promises.access(configPath, fs.constants.F_OK);
  } catch {
    throw new Error(
      `xanos.config.ts not found in the root directory. Please create one to proceed.`,
    );
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
