import express from "express";
import { projectRoot } from "../core/paths.js";
import template from "./template.js";

const dev = async (app: express.Express) => {
  const [{ createServer }, { default: react }, { default: logger }] =
    await Promise.all([
      import("vite"),
      import("@vitejs/plugin-react"),
      import("../core/logger.js"),
    ]);

  const vite = await createServer({
    root: projectRoot,
    plugins: [react()],
    customLogger: logger,
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use(/.*/, async (req, res, next) => {
    try {
      const html = await vite.transformIndexHtml(req.originalUrl, template());

      res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (err: any) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });
};

export default dev;
