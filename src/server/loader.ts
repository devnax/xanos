import express, { Router } from "express";
import { scanProject } from "../core/scanner.js";
import _import from "../core/import.js";

const scan = scanProject();

const loader = async (app: express.Express) => {
  for (let { files, id } of scan) {
    if (files.routes) {
      const imp = (await _import(files.routes)) as {
        default: Record<string, Router>;
      };
      if (imp.default instanceof Router) {
        app.use(`/app/${id}`, imp.default as unknown as Router);
      }
    }

    if (files.schema) {
      await _import(files.schema);
    }
  }
};
export default loader;
