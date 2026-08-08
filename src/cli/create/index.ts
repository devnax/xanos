import * as fs from "fs";
import * as path from "path";
import prompts from "prompts";
import write from "./write.js";

function scaffoldProject(dest: string, name: string): void {
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
        },
        dependencies: {
          xanos: "^0.1.0",
          react: "^18.0.0",
          "react-dom": "^18.0.0",
          "react-rock": "^3.2.23",
          "@xanui/ui": "^1.2.23",
          "@xanui/core": "^1.3.36",
          "@xanui/icons": "^1.1.14",
        },
        devDependencies: {
          typescript: "^5.4.0",
          "@types/react": "^18.0.0",
          "@types/react-dom": "^18.0.0",
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
const config: XanosConfig = {
  port: 3000,
  publicDir: "public",
  outDir: ".xanos",
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
  console.log(`\nDone! Next steps:\n`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  console.log(`  npx xanos dev\n`);
}
