import fs from "fs";
import path from "path";
import { scanProject } from "./scanner.js";
import { loadConfig } from "./config.js";
import { isWorkingFrameworkDir } from "./paths.js";

function posixRel(from: string, to: string): string {
  return path.relative(from, to).split(path.sep).join("/");
}

const setup = async () => {
  const config = await loadConfig();
  const apps = scanProject();
  const lines: string[] = [];
  const root = process.cwd();
  lines.push(
    `import ${isWorkingFrameworkDir ? '"./src/database/index.ts"' : '"xanos/database"'};`,
  );

  // import all schema files
  for (const app of apps) {
    if (app.files.schema) {
      const rel = posixRel(root, app.files.schema);
      lines.push(`import "./${rel}";`);
    }
  }

  for (const app of config.apps) {
    lines.push(`import "${app}/schema";`);
  }
  //
  lines.push(`import {lazy} from 'react';`);
  lines.push(
    `import XanosStartup from ${isWorkingFrameworkDir ? '"./src/client/startup.tsx"' : '"xanos/startup"'};`,
  );
  // import all config files
  for (const app of apps) {
    const rel = posixRel(root, app.files.config);
    lines.push(`import ${app.id}AppConfig from "./${rel}";`);
  }

  for (const app of config.apps) {
    lines.push(`import ${app}AppConfig from "${app}/config";`);
  }

  // import all app files
  for (const app of apps) {
    const rel = posixRel(root, app.files.app);
    lines.push(`const ${app.id}App = lazy(() => import("./${rel}"));`);
  }

  for (const app of config.apps) {
    lines.push(`const ${app}App = lazy(() => import("${app}/app"));`);
  }

  lines.push("");
  lines.push("const startup = {");
  for (const app of apps) {
    lines.push(
      `  ${app.id}: { app: ${app.id}App, config: ${app.id}AppConfig },`,
    );
  }
  for (const app of config.apps) {
    lines.push(`  ${app}: { app: ${app}App, config: ${app}AppConfig },`);
  }
  lines.push("};");
  lines.push("");
  lines.push("XanosStartup(startup);");

  fs.writeFileSync(
    path.join(root, "xanos.startup.ts"),
    lines.join("\n"),
    "utf-8",
  );
};
export default setup;
