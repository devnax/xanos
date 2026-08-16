import { SecurequServer } from "securequ";
import { Express } from "express";
import express from "express";
import path from "path";
import fs from "fs";
import signin from "./signin.js";

const query = (app: Express, isDev: boolean) => {
  const server = new SecurequServer({
    mode: isDev ? "development" : "production",
    // debug: isDev,
    basepath: "/_query",
    clients: [
      {
        origin: "*",
        secret: "wellknownclientsecret",
      },
    ],

    file: {
      upload: async (chunk, meta) => {
        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        const filePath = path.join(uploadDir, meta.fileId);
        fs.appendFileSync(filePath, Buffer.from(chunk));
      },
      delete: async (fileId) => {
        const filePath = path.join(process.cwd(), "uploads", fileId);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      },
    },
    // accept: (info) => {
    //   return true;
    // },
  });

  signin(server);

  const raw = express.raw({ type: server.CONTENT_TYPE, limit: "10mb" });
  app.use("/_query{/*path}", raw, async (req, res) => {
    const response = await server.listen(req.originalUrl, {
      body: req.body,
      headers: req.headers as { [key: string]: string },
    });
    res.setHeader("Content-Type", response.contentType);
    res.status(response.status).end(response.value);
  });
};

export default query;
