import * as fs from "fs";
import * as path from "path";
import { verifyAppName } from "./utils.js";

export interface AppEntry {
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

export function scanProject(): AppEntry[] {
  const appsDir = path.join(process.cwd(), "apps");
  const appNames = readDirs(appsDir);

  const apps: AppEntry[] = [];

  for (const name of appNames) {
    const verify = verifyAppName(name);
    if (!verify) continue;

    const config = path.join(appsDir, name, "config.ts");
    const app = path.join(appsDir, name, "app.tsx");
    const api = path.join(appsDir, name, "api/index.ts");
    const schema = path.join(appsDir, name, "schema/index.ts");

    if (fs.existsSync(config) && fs.existsSync(app)) {
      apps.push({
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
