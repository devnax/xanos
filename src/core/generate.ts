import fs from "fs";
import path from "path";
import type { AppEntry } from "./scanner.js";
import { isWorkingFrameworkDir, outDir } from "./paths.js";

function posixRel(from: string, to: string): string {
  return path.relative(from, to).split(path.sep).join("/");
}

const generate = (apps: AppEntry[]) => {
  const lines: string[] = ["import {lazy} from 'react';"];
  const root = process.cwd();
  lines.push(
    `import XanosStartup from ${isWorkingFrameworkDir ? '"./src/client/startup.tsx"' : '"xanos/startup"'};`,
  );
  lines.push(
    `import ${isWorkingFrameworkDir ? '"./src/database/index.ts"' : '"xanos/database"'};`,
  );

  for (const app of apps) {
    if (app.files.schema) {
      const rel = posixRel(root, app.files.schema);
      lines.push(`import "./${rel}";`);
    }
  }

  for (const app of apps) {
    const rel = posixRel(root, app.files.config);
    lines.push(`import ${app.id}AppConfig from "./${rel}";`);
  }
  for (const app of apps) {
    const rel = posixRel(root, app.files.app);
    lines.push(`const ${app.id}App = lazy(() => import("./${rel}"));`);
  }

  lines.push("");
  lines.push("const startup = {");
  for (const app of apps) {
    lines.push(
      `  ${app.id}: { app: ${app.id}App, config: ${app.id}AppConfig },`,
    );
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
export default generate;
