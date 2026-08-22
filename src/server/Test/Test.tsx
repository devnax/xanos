import { renderToString } from "react-dom/server";
import { Router } from "express";
import path from "path";
import type { RequestHandler } from "express";
import _import from "../../core/import.js";
import { fileURLToPath } from "url";
import Home from "./Home.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const component = async (_path: string) => {
  const modulePath = _path.startsWith(".") ? _path : `./${_path}`;
  const fullPath = path.resolve(__dirname, modulePath);
  const modules = (await _import(fullPath)) as any;
  const Component = modules.default;
  const metadata = modules.metadata || {};
  Component.metadata = metadata;
  return Component;
};

const getComponentPath = (component: any) => {
  try {
    component.type();
  } catch (error) {
    const stack = (error as Error).stack ?? "";
    const match = stack.match(/\(?(file:\/\/\/[^)\s]+):\d+:\d+\)?/);
    if (!match) {
      return null;
    }
    return fileURLToPath(match[1]);
  }

  return null;
};

export function xanosPage(): RequestHandler {
  return async (_req, res, next) => {
    const originalSend = res.send.bind(res);
    (res as any).send = async (component: any) => {
      const cpath = getComponentPath(component);
      console.log(cpath);

      const { title, description } = component.type.metadata || {};
      if (_req.query.static) {
        res.setHeader("Content-Type", "application/json");
        originalSend(
          JSON.stringify({
            source: "script.js",
            props: component.props,
          }),
        );
      } else {
        const html = renderToString(component);

        res.setHeader("Content-Type", "text/html");
        res.setHeader("X-Page-Title", title || "");
        res.setHeader("X-Page-Description", description || "");
        originalSend(
          `
        <!doctype html>
        <html>
          <head>
            <title>${title || ""}</title>
            <meta name="description" content="${description || ""}" />
          </head>
          <body>
            <div>${html}</div>
            <script>
              window.__INITIAL_PROPS__ = ${JSON.stringify(component.props)};
            </script>
          </body>
        </html>
      `,
        );
      }
    };
    next();
  };
}

const router = Router();

router.get("/", async (req, res) => {
  res.send(
    <Home
      name="John Doe"
      auth={{ userId: "123", token: "abc" }}
      products={[
        { name: "Product 1", price: 10 },
        { name: "Product 2", price: 20 },
      ]}
    />,
  );
});

export default router;
