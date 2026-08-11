import path from "path";
import fs from "fs";

const makeApp = async (appName: string) => {
  if (!/^[a-z][a-z0-9_-]{4,}$/.test(appName)) {
    throw new Error(
      `Invalid app name "${appName}". ` +
        `Use 5+ characters, start with a lowercase letter, ` +
        `and use only a-z, 0-9, "-" or "_".`,
    );
  }

  // check the app directory exists
  const appsDir = path.join(process.cwd(), "apps");
  if (!fs.existsSync(appsDir)) {
    fs.mkdirSync(appsDir);
  }

  // app directory exists
  const appDir = path.join(appsDir, appName);
  const schemaDir = path.join(appDir, "schema");
  const apiDir = path.join(appDir, "api");

  const configFile = path.join(appDir, "config.ts");
  const appFile = path.join(appDir, "app.tsx");
  const schemaFile = path.join(schemaDir, "index.ts");
  const apiFile = path.join(apiDir, "index.ts");

  if (fs.existsSync(appDir)) {
    throw new Error(`App directory "${appDir}" already exists.`);
  }

  fs.mkdirSync(appDir);
  fs.mkdirSync(schemaDir);
  fs.mkdirSync(apiDir);

  fs.writeFileSync(
    configFile,
    `import Icon from "@xanui/icons/Extension";
export default {
    name: "${appName}",
    color: "#fefefe",
    icon: Icon,
};`,
  );
  fs.writeFileSync(
    appFile,
    `import React, { useEffect } from "react";
const ${appName}App = () => {
    return (
        <div>${appName} App</div>
    )
}
export default ${appName}App; 
`,
  );

  fs.writeFileSync(
    schemaFile,
    `import database from "xanos/database";
import { xt } from "xansql";
import { Model } from "xansql";

class ${appName}Model extends Model {
  get table() {
    return "${appName}s";
  }
  schema() {
    return {
      id: xt.id(),
      name: xt.string().min(3).max(100),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),
    };
  }
}

// export const ${appName} = database.model(${appName}Model);
    `,
  );
  fs.writeFileSync(
    apiFile,
    `import { Router } from "express"
const api = Router();
api.get("/", async (req, res) => {
    res.status(200).setHeader("Content-Type", "text/html").end("<h1>Welcome</h1>");
});
export default api;`,
  );
};

export default makeApp;
