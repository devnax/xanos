import path from "path";
import fs from "fs";
import { createJiti } from "jiti";
import type { XanosConfig } from "./index.js";
import SqliteDialect from "xansql/dialects/Sqlite";

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
      database: SqliteDialect("db.sqlite") as any,
      files: "./public/uploads",
    };
  }

  try {
    const jiti = createJiti(import.meta.url);
    const mod = await jiti.import(configPath);
    const config =
      (mod as { default?: XanosConfig }).default ?? (mod as XanosConfig);
    loadedConfig = config;
    return loadedConfig;
  } catch (error) {
    throw new Error(`Failed to load xanos.config.ts\n\n${error}`);
  }
}
