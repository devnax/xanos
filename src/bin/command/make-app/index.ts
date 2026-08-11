import path from "path";
import fs from "fs";
import logger from "../../../core/logger.js";
import { verifyAppName } from "../../../core/utils.js";

const makeApp = async (appName: string) => {
  const verify = verifyAppName(appName);
  if (!verify) {
    return;
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
    logger.error(`App directory "${appDir}" already exists. Aborting.`);
    return;
  }

  logger.info(`Creating app directory "${appDir}"...`);
  fs.mkdirSync(appDir);
  fs.mkdirSync(schemaDir);
  fs.mkdirSync(apiDir);

  fs.writeFileSync(
    configFile,
    `import Icon from "@xanui/icons/Extension";

export default {
    name: "${appName}",
    color: "#b20303",
    icon: Icon,
};`,
  );
  fs.writeFileSync(
    appFile,
    `import React from "react";

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

      // Add your schema fields here

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

  logger.info(`App "${appName}" created successfully.`);
};

export default makeApp;
