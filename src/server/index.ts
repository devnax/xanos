import express, { Router } from "express";
import { projectRoot } from "../core/paths.js";
import { loadConfig } from "../core/config.js";
import { createJiti } from "jiti";
import path from "path";

const config = await loadConfig();
const jiti = createJiti(import.meta.url);
const app = express();

const template = (isProd = false) => {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="xroot"></div>
        <script type="module" src="/.os/startup.${isProd ? "js" : "ts"}"></script>
      </body>
    </html>
    `;
  return template;
};

const initialDevServer = async () => {
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

export type ServerOption = {
  port?: number;
  development?: boolean;
};

const server = async ({ port = 3000, development }: ServerOption) => {
  app.use(
    `/startup.js`,
    express.static(".os/startup.js", {
      maxAge: 0,
      etag: true,
    }),
  );
  app.use(
    "/assets",
    express.static(".os/assets", {
      maxAge: "1y",
      immutable: true,
    }),
  );

  app.use(
    "/chunks",
    express.static(".os/chunks", {
      maxAge: "1y",
      immutable: true,
    }),
  );
  app.use(
    express.static("public", {
      maxAge: "1y",
      immutable: true,
    }),
  );

  const routePath = path.resolve(process.cwd(), ".os/routes.ts");
  const { default: routes } = (await jiti.import(routePath)) as {
    default: Record<string, Router>;
  };
  for (let route in routes) {
    const router = routes[route];
    app.use(`/app/${route}`, router);
  }

  if (development) {
    await initialDevServer();
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
