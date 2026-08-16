import express from "express";
import dev from "./dev.js";
import template from "./template.js";
import loader from "./loader.js";
import statics from "./statics.js";
import loadDatabase from "./routes/xansql/index.js";
import setup from "../core/setup.js";
import loadEnv from "../core/env.js";
import query from "./routes/query/index.js";
import cookieParser from "./middlewares/cookieParser.js";

const server = async ({
  port = 3000,
  development,
}: {
  port?: number;
  development?: boolean;
}) => {
  const env = loadEnv(development ? "development" : "production");
  for (const key in server) {
    process.env[key] = env.server[key];
  }

  const app = express();
  app.use(cookieParser);

  statics(app, development ?? false);
  await loader(app);
  await setup();
  await loadDatabase(app, development);
  query(app, development ?? false);

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
