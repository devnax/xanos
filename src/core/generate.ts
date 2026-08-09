import fs from "fs";
import path from "path";
import type { AppEntry } from "./scanner.js";
import { isWorkingFrameworkDir, outDir } from "./paths.js";

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function posixRel(from: string, to: string): string {
  return path.relative(from, to).split(path.sep).join("/");
}

export const generateConfig = (apps: AppEntry[]) => {
  ensureDir(outDir);
  const lines: string[] = [];

  for (const app of apps) {
    const rel = posixRel(outDir, app.files.config);
    lines.push(`import ${app.id} from "${rel}";`);
  }

  lines.push("");
  lines.push("export const configs = {");
  for (const app of apps) {
    lines.push(`  ${app.id},`);
  }
  lines.push("};");
  lines.push("");
  lines.push("export default configs;");
  fs.writeFileSync(path.join(outDir, "configs.ts"), lines.join("\n"), "utf-8");
};

export const generateApps = (apps: AppEntry[]) => {
  ensureDir(outDir);
  const lines: string[] = [];

  for (const app of apps) {
    const rel = posixRel(outDir, app.files.app);
    lines.push(`import ${app.id} from "${rel}";`);
  }

  lines.push("");
  lines.push("export const apps = {");
  for (const app of apps) {
    lines.push(`  ${app.id},`);
  }
  lines.push("};");
  lines.push("");
  lines.push("export default apps;");
  fs.writeFileSync(path.join(outDir, "apps.ts"), lines.join("\n"), "utf-8");
};

const generateStartup = (apps: AppEntry[]) => {
  ensureDir(outDir);
  const lines: string[] = [
    `import XanosStartup from ${isWorkingFrameworkDir ? '"../src/client/startup.ts"' : '"xanos/startup"'};`,
    'import apps from "./apps.ts";',
    'import configs from "./configs.ts";',
    "",
    "const startup = {",
    ...apps.map(
      (app) =>
        `  ${app.id}: { app: apps.${app.id}, config: configs.${app.id} },`,
    ),
    "};",
    "",
    "XanosStartup(startup);",
  ];

  fs.writeFileSync(path.join(outDir, "startup.ts"), lines.join("\n"), "utf-8");
};

const generateSchema = (apps: AppEntry[]) => {
  ensureDir(outDir);
  const lines: string[] = [];
  for (const app of apps) {
    if (app.files.schema) {
      const rel = posixRel(outDir, app.files.schema);
      lines.push(`import ${app.id}Schema from "${rel}";`);
    }
  }

  lines.push("");
  lines.push("const schema = {");
  for (const app of apps) {
    if (app.files.schema) {
      lines.push(`  ${app.id}: ${app.id}Schema,`);
    }
  }
  lines.push("};");
  lines.push("");
  lines.push("export default schema;");
  fs.writeFileSync(path.join(outDir, "schema.ts"), lines.join("\n"), "utf-8");
};

const generateRoutes = (apps: AppEntry[]) => {
  ensureDir(outDir);
  const lines: string[] = [];
  for (const app of apps) {
    if (app.files.routes) {
      const rel = posixRel(outDir, app.files.routes);
      lines.push(`import ${app.id}Routes from "${rel}";`);
    }
  }

  lines.push("");
  lines.push("const routes = {");
  for (const app of apps) {
    if (app.files.routes) {
      lines.push(`  ${app.id}: ${app.id}Routes,`);
    }
  }
  lines.push("};");
  lines.push("");
  lines.push("export default routes;");
  fs.writeFileSync(path.join(outDir, "routes.ts"), lines.join("\n"), "utf-8");
};

const generate = (apps: AppEntry[]) => {
  generateConfig(apps);
  generateApps(apps);
  generateStartup(apps);
  generateRoutes(apps);
  generateSchema(apps);
};
export default generate;
