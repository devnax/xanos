import path from "path";
import fs from "fs";
import { createJiti } from "jiti";
import type { XanosConfig } from "./index.js";

const DEFAULTS: XanosConfig = {};
const configPath = path.resolve(process.cwd(), "xanos.config.ts");
let loadedConfig: XanosConfig | null = null;
export async function loadConfig(): Promise<XanosConfig> {
  if (loadedConfig) {
    return loadedConfig;
  }
  try {
    await fs.promises.access(configPath, fs.constants.F_OK);
  } catch {
    return DEFAULTS;
  }

  try {
    const jiti = createJiti(import.meta.url);
    const mod = await jiti.import(configPath);
    const config =
      (mod as { default?: XanosConfig }).default ?? (mod as XanosConfig);
    loadedConfig = {
      ...DEFAULTS,
      ...config,
    };
    return loadedConfig;
  } catch (error) {
    throw new Error(`Failed to load xanos.config.ts\n\n${error}`);
  }
}
