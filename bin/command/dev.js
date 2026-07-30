import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xanos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="src/client/main.tsx"></script>
  </body>
</html>`;

const logger = {
  info: (msg) => console.log(`[xanos] ${msg}`),
  warn: (msg) => console.warn(`[xanos:warn] ${msg}`),
  error: (msg, opts) =>
    console.error(`[xanos:error] ${msg}`, opts?.error ?? ""),
  clearScreen: () => {},
  hasErrorLogged: () => false,
  hasWarned: false,
  warnOnce: (msg) => console.warn(`[xanos:warn] ${msg}`),
};

const serve = async (str, options) => {
  const port = options?.port ? Number(options.port) : 3000;
  const app = express();

  const vite = await createViteServer({
    root: rootDir,
    plugins: [react()],
    customLogger: logger,
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("/{*path}", async (req, res, next) => {
    try {
      const transformed = await vite.transformIndexHtml(req.originalUrl, html);
      res.status(200).setHeader("Content-Type", "text/html").end(transformed);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};

export default serve;
