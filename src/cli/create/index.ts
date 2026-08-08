import * as fs from "fs";
import * as path from "path";
import prompts from "prompts";
import write from "./write.js";
import { frameworkDir } from "../../core/paths.js";

function getPackageJson() {
  const packageJsonPath = path.join(frameworkDir, "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
}

function scaffoldProject(dest: string, name: string): void {
  const PackageJson = getPackageJson();
  const reactVersion = PackageJson.dependencies?.["react"] || "19.2.8";

  write(
    path.join(dest, "package.json"),
    JSON.stringify(
      {
        name,
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "xanos dev",
          build: "xanos build",
          start: "xanos start",
        },
        dependencies: {
          xanos: `^${PackageJson.version}`,
          react: `^${reactVersion}`,
          "react-dom": `^${reactVersion}`,
          "react-rock": PackageJson["react-rock"],
          "@xanui/ui": PackageJson["@xanui/ui"],
          "@xanui/core": PackageJson["@xanui/core"],
          "@xanui/icons": PackageJson["@xanui/icons"],
          "better-sqlite3": PackageJson["better-sqlite3"],
          xansql: PackageJson["xansql"],
        },
        devDependencies: {
          typescript: "^5.4.0",
          "@types/react": `^${reactVersion}`,
          "@types/react-dom": `^${reactVersion}`,
        },
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
import SqliteDialect from "xansql/dialects/Sqlite";
const config: XanosConfig = {
  database: SqliteDialect("db.sqlite"),
  files: "./public/uploads",
};
export default config;
  `,
  );
  write(
    path.join(dest, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
        },
        include: ["xanos-env.d.ts", "**/*.ts", "**/*.tsx"],
        exclude: ["node_modules", ".os"],
      },
      null,
      2,
    ),
  );
  write(path.join(dest, "public", "uploads", "index.html"), ``);
  write(
    path.join(dest, "apps", "main", "index.tsx"),
    `export default function App() {
  return (
    <main>
      <h1>Hello Xanos</h1>
    </main>
  );
}
`,
  );
  write(
    path.join(dest, "startup.ts"),
    `import "xanos/startup"
import "./apps/main/index.tsx"
  `,
  );
}

const installDeps = async (dest: string): Promise<void> => {
  console.log(`\nInstalling dependencies...`);
  const { spawn } = await import("child_process");
  const child = spawn("npm", ["install"], {
    cwd: dest,
    stdio: "inherit",
  });
  child.on("close", (code) => {
    if (code !== 0) {
      console.error(`npm install failed with exit code ${code}`);
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
    console.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log(`\nScaffolding Xanos project at ./${projectName} ...`);
  scaffoldProject(dest, projectName);
  await installDeps(dest);
}
