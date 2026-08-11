import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import prompts from "prompts";
import write from "./write.js";
import { getFrameworkPackageJson } from "../../core/utils.js";
import logger from "../../core/logger.js";

function scaffoldProject(dest: string, name: string): void {
  const PackageJson = getFrameworkPackageJson();

  write(
    path.join(dest, "package.json"),
    JSON.stringify(
      {
        name,
        version: "1.0.0",
        scripts: {
          dev: "xanos dev",
          build: "xanos build",
          start: "xanos start",
          "make:app": "xanos make:app",
        },
        dependencies: PackageJson.dependencies,
        devDependencies: PackageJson.devDependencies,
      },
      null,
      2,
    ),
  );
  write(
    path.join(dest, "xanos-env.d.ts"),
    `/// <reference types="vite/client" />

// Xanos TypeScript environment declarations.
`,
  );
  write(
    path.join(dest, "xanos.config.ts"),
    `import type { XanosConfig } from "xanos/core";

const config: XanosConfig = {
  database: {
    engine: "sqlite",
    sqlite: "db.sqlite",
    mysql: {},
    postgres:{}
  },
  files: "./public/uploads",
  apps: []
};

export default config;
  `,
  );
  write(
    path.join(dest, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "react-jsx",
          incremental: true,
        },
        include: ["apps"],
        exclude: ["node_modules", ".os", "xanos.startup.ts"],
      },
      null,
      2,
    ),
  );
  write(path.join(dest, "public", "uploads", "index.html"), ``);
}

const installDeps = async (dest: string): Promise<void> => {
  logger.info(`\nInstalling dependencies...`);
  const child = spawn("npm", ["install"], {
    cwd: dest,
    stdio: "inherit",
  });
  child.on("close", (code) => {
    if (code !== 0) {
      logger.error(`npm install failed with exit code ${code}`);
      process.exit(code || 1);
    }
  });
};

export default async function create(): Promise<void> {
  const response = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Project name",
      initial: "my-xanos-app",
      validate: (v: string) =>
        /^[a-z0-9-_]+$/.test(v) || "Use lowercase letters, numbers, - or _",
    },
  ]);

  const { projectName } = response as { projectName: string };
  if (!projectName) process.exit(0);
  const dest = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(dest)) {
    logger.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  logger.info(`\nScaffolding Xanos project at ./${projectName} ...`);
  scaffoldProject(dest, projectName);
  spawn("npx", ["xanos", "make:app", "main"], {
    cwd: dest,
    stdio: "inherit",
  });
  await installDeps(dest);
}
