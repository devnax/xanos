import express from "express";
import dev from "./dev.js";
import template from "./template.js";
import loader from "./loader.js";
import statics from "./statics.js";
import loadDatabase from "./routes/xansql/index.js";
import setup from "../core/setup.js";
import loadEnv from "../core/env.js";
import loadApi from "./routes/api/index.js";
import applyMiddlewares from "./applyMiddlewares.js";
import TestRouter from "./Test.js";

const server = async ({
  port,
  development,
}: {
  port: number;
  development: boolean;
}) => {
  const env = loadEnv(development ? "development" : "production");
  for (const key in server) {
    process.env[key] = env.server[key];
  }

  const app = express();
  statics(app, development ?? false);
  await applyMiddlewares(app);
  await loader(app);
  await setup();
  await loadDatabase(app, development);
  await loadApi(app, development ?? false);
  app.use("/test", TestRouter);
  if (development) {
    await dev(app);
  } else {
    app.get(/.*/, async (_req, res) => {
      res
        .status(200)
        .setHeader("Content-Type", "text/html")
        .end(template(true));
    });
  }

  app.listen(port);
};

export default server;
