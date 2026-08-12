import * as fs from "fs";
import * as path from "path";
import { verifyAppName } from "./utils.js";
import { loadConfig } from "./config.js";

export interface AppEntry {
  type: "custom" | "app";
  id: string;
  dir: string;
  files: {
    app: string;
    config: string;
    api: string | null;
    schema: string | null;
  };
}

function readDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

const apps: AppEntry[] = [];

export async function scanProject(): Promise<AppEntry[]> {
  if (apps.length > 0) return apps;
  const appsDir = path.join(process.cwd(), "apps");
  const appNames = readDirs(appsDir);
  const config = await loadConfig();

  for (let appId of config.customApps) {
    apps.push({
      type: "custom",
      id: appId,
      dir: "",
      files: {
        app: `${appId}/app`,
        config: `${appId}/config`,
        api: `${appId}/api`,
        schema: `${appId}/schema`,
      },
    });
  }

  for (const name of appNames) {
    const verify = verifyAppName(name);
    if (!verify) continue;

    const config = path.join(appsDir, name, "config.ts");
    const app = path.join(appsDir, name, "app.tsx");
    const api = path.join(appsDir, name, "api/index.ts");
    const schema = path.join(appsDir, name, "schema/index.ts");

    if (fs.existsSync(config) && fs.existsSync(app)) {
      apps.push({
        type: "app",
        id: name,
        dir: path.join(appsDir, name),
        files: {
          app,
          config,
          api: fs.existsSync(api) ? api : null,
          schema: fs.existsSync(schema) ? schema : null,
        },
      });
    }
  }

  return apps;
}
