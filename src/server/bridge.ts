import { XansqlBridgeServer } from "xansql/dialects/Bridge";
import database from "./database.js";
import express, { Express } from "express";

const loadDatabase = async (app: Express, isDev = false) => {
  const bridge = new XansqlBridgeServer(database, {
    basepath: "/data",
    mode: isDev ? "development" : "production",
  });
  const raw = express.raw({
    type: bridge.REQUEST_CONTENT_TYPE,
    limit: "10mb",
  });
  app.use("/data{/*path}", raw, async (req, res) => {
    const response = await bridge.listen(req.originalUrl, {
      body: req.body,
      headers: req.headers as any,
    });

    res.status(response.status).end(response.value);
  });
};

export default loadDatabase;
