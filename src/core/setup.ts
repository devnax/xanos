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
  const apps = await scanProject();
  const lines: string[] = [];
  const root = process.cwd();

  const slientConfig = {
    name: config.identity.name,
    theme: config.theme,
    dock: config.appearance?.dock,
  };

  lines.push(
    `await import(${isWorkingFrameworkDir ? '"./src/database/index.ts"' : '"xanos/database"'});`,
  );

  // import all schema files
  for (const app of apps) {
    if (app.files.schema) {
      if (app.type === "app") {
        const rel = posixRel(root, app.files.schema);
        lines.push(`await import("./${rel}");`);
      } else {
        lines.push(`await import("${app.files.schema}");`);
      }
    }
  }

  //
  lines.push(`import {lazy} from 'react';`);
  lines.push(
    `import XanosStartup from ${isWorkingFrameworkDir ? '"./src/client/startup.tsx"' : '"xanos/startup"'};`,
  );
  lines.push(`const config:any = ${JSON.stringify(slientConfig, null, 2)};`);

  // import all config files
  for (const app of apps) {
    if (app.type === "app") {
      const rel = posixRel(root, app.files.config);
      lines.push(`import ${app.id}AppConfig from "./${rel}";`);
    } else {
      lines.push(`import ${app.id}AppConfig from "${app.files.config}";`);
    }
  }

  // import all app files
  for (const app of apps) {
    if (app.type === "app") {
      const rel = posixRel(root, app.files.app);
      lines.push(`const ${app.id}App = lazy(() => import("./${rel}"));`);
    } else {
      lines.push(
        `const ${app.id}App = lazy(() => import("${app.files.app}"));`,
      );
    }
  }

  lines.push("");
  lines.push("const apps = {");
  for (const app of apps) {
    lines.push(
      `  ${app.id}: { app: ${app.id}App, config: ${app.id}AppConfig },`,
    );
  }
  lines.push("};");
  lines.push("");
  lines.push("XanosStartup({ apps, config });");

  fs.writeFileSync(
    path.join(root, "xanos.startup.ts"),
    lines.join("\n"),
    "utf-8",
  );
};
export default setup;
