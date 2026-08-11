import express, { Router } from "express";
import { scanProject } from "../core/scanner.js";
import _import from "../core/import.js";

const loader = async (app: express.Express) => {
  const scan = scanProject();

  for (let { files, id } of scan) {
    if (files.api) {
      const imp = (await _import(files.api)) as {
        default: Record<string, Router>;
      };
      if (imp.default instanceof Router) {
        app.use(`/api/${id}`, imp.default as unknown as Router);
      }
    }

    if (files.schema) {
      await _import(files.schema);
    }
  }
};

export default loader;
