import { Xansql, type XansqlFileMeta } from "xansql";
import { loadConfig } from "../core/config.js";
import logger from "../core/logger.js";
import SqliteDialect from "xansql/dialects/Sqlite";
import MysqlDialect from "xansql/dialects/Mysql";
import PostgresDialect from "xansql/dialects/Postgres";
import path from "path";
import fs from "fs";

let dialect: any;

const config = await loadConfig();
if (!config.database[config.database.engine]) {
  logger.error(
    `Database configuration for engine "${config.database.engine}" is missing in xanos.config.ts`,
  );
  process.exit(1);
}

switch (config.database.engine) {
  case "sqlite":
    dialect = SqliteDialect(config.database.sqlite as any);
    break;
  case "mysql":
    dialect = MysqlDialect(config.database.mysql as any);
    break;
  case "postgres":
    dialect = PostgresDialect(config.database.postgres as any);
    break;
}

let dir = "public/uploads";

const database = new Xansql({
  dialect,
  file: {
    upload: async (chunk: Uint8Array, filemeta: XansqlFileMeta) => {
      const uploadDir = path.join(process.cwd(), dir);
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
      const filePath = path.join(uploadDir, filemeta.fileId);
      fs.appendFileSync(filePath, Buffer.from(chunk));
      return filemeta;
    },
    delete: async (fileId: string) => {
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(process.cwd(), dir, fileId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    },
  },
});

export default database;
