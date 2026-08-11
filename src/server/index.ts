import express from "express";
import { loadConfig } from "../core/config.js";
import dev from "./dev.js";
import template from "./template.js";
import loader from "./loader.js";
import statics from "./statics.js";
import loadDatabase from "./bridge.js";
import setup from "../core/setup.js";

const server = async ({
  port = 3000,
  development,
}: {
  port?: number;
  development?: boolean;
}) => {
  const app = express();
  statics(app);
  await loader(app);
  await setup();
  await loadDatabase(app, development);

  if (development) {
    await dev(app);
  } else {
    app.get("/", async (req, res) => {
      res
        .status(200)
        .setHeader("Content-Type", "text/html")
        .end(template(true));
    });
  }

  app.listen(port);
};

export default server;
