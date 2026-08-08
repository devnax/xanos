import express from "express";
import { projectRoot } from "../core/paths.js";
import { loadConfig } from "../core/config.js";

const app = express();
const initialDevServer = async () => {
  const [{ createServer }, { default: react }, { default: logger }] =
    await Promise.all([
      import("vite"),
      import("@vitejs/plugin-react"),
      import("../core/logger.js"),
    ]);

  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="xroot"></div>
        <script type="module" src="/startup.ts"></script>
      </body>
    </html>
    `;

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
      const html = await vite.transformIndexHtml(req.originalUrl, template);

      res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (err: any) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });
};

export type ServerOption = {
  port?: number;
  development?: boolean;
};

const server = async ({ port = 3000, development }: ServerOption) => {
  app.use(`/startup.js`, express.static(".os/startup.js"));
  app.use(`/assets`, express.static(".os/assets"));
  app.use(`/chunks`, express.static(".os/chunks"));
  app.use(express.static("public"));

  if (development) {
    await initialDevServer();
  } else {
    app.get("/", async (req, res) => {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Xanos</title>
          </head>
          <body>
            <div id="xroot"></div>
            <script type="module" src="/startup.js"></script>
          </body>
        </html>
      `;
      res.status(200).setHeader("Content-Type", "text/html").end(html);
    });
  }

  app.listen(port);
};

export default server;
