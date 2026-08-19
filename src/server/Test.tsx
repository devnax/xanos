import { renderToString } from "react-dom/server";
import { Router } from "express";
import path, { resolve } from "path";
import { AppRoot, createTheme, ThemeProvider } from "@xanui/core";
import type { RequestHandler } from "express";
import { compresor, crypto } from "securequ";
import _import from "../core/import.js";

import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const page = async (path: string) => {
  return (await import(path)).default;
};

const Home = await page("./Home.js");

function xanosPage(): RequestHandler {
  return async (_req, res, next) => {
    const _static = _req.query.static;
    const originalSend = res.send.bind(res);

    (res as any).send = async (component: any) => {
      // const resolvedPath = resolve(__dirname, path);
      // const { default: App }: any = await _import(resolvedPath);
      const html = renderToString(component);

      // if (_static) {
      //   res.json({
      //     source: "script.js",
      //     props,
      //   });
      //   return;
      // }
      originalSend(
        `
        <!doctype html>
        <html>
          <body>
          <div>${html}</div>
          </body>
        </html>
      `,
      );
    };

    next();
  };
}

const router = Router();

router.use(xanosPage());
router.get("/msg", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

router.get("/", async (req, res) => {
  res.send(
    <Home
      name="John Doe"
      products={[
        { name: "Product 1", price: 10 },
        { name: "Product 2", price: 20 },
      ]}
    />,
  );
});

export default router;
