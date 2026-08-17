import { XansqlBridgeServer } from "xansql/dialects/Bridge";
import database from "../../../database/index.js";
import express, { Express } from "express";
import { XANSQL_BASE_PATH } from "../../../core/constant.js";

const loadDatabase = async (app: Express, isDev = false) => {
  const bridge = new XansqlBridgeServer(database, {
    basepath: XANSQL_BASE_PATH,
    // debug: true,
    mode: isDev ? "development" : "production",
  });
  const raw = express.raw({
    type: bridge.REQUEST_CONTENT_TYPE,
    limit: "10mb",
  });
  app.use(`${XANSQL_BASE_PATH}{/*path}`, raw, async (req, res) => {
    const response = await bridge.listen(req.originalUrl, {
      body: req.body,
      headers: req.headers as any,
    });
    res.status(response.status).end(response.value);
  });
};

export default loadDatabase;
