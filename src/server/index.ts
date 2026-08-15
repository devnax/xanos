import express from "express";
import dev from "./dev.js";
import template from "./template.js";
import loader from "./loader.js";
import statics from "./statics.js";
import loadDatabase from "./bridge.js";
import setup from "../core/setup.js";
import loadEnv from "../core/env.js";
import { User } from "../database/index.js";
import query from "./query/index.js";

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

  statics(app, development ?? false);
  await loader(app);
  await setup();
  await loadDatabase(app, development);
  query(app, development ?? false);

  const raw = express.raw({ type: "application/octet-stream", limit: "10mb" });
  // app.get("/_query{/*path}", async (req, res) => {
  //   console.log("Request received at /query");
  //   res.status(200).json({ message: "Hello from /query" });
  // });

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
