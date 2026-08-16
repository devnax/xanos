import { Xansql, type XansqlFileMeta } from "xansql";
import { XansqlBridgeDialect } from "xansql/dialects/Bridge";
import UserSchema from "./schema/User.js";
import RoleSchema from "./schema/UserRole.js";

declare const __XANOS_CLIENT__: boolean;

const isClient =
  typeof __XANOS_CLIENT__ !== "undefined"
    ? __XANOS_CLIENT__
    : typeof window !== "undefined";

let dialect: any;
let file: any;
export const BASE_PATH = "/query";

if (!isClient) {
  const fs = await import("fs");
  const path = await import("path");
  const { loadConfig } = await import("../core/config.js");
  const { default: MysqlDialect } = await import("xansql/dialects/Mysql");
  const { default: SqliteDialect } = await import("xansql/dialects/Sqlite");
  const { default: PostgresDialect } = await import("xansql/dialects/Postgres");
  const { default: logger } = await import("../core/logger.js");

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
  file = {
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
  };
} else {
  const { protocol, host } = window.location;
  const client = XansqlBridgeDialect(`${protocol}//${host}${BASE_PATH}`);
  dialect = client.dialect;
  file = client.file;
}

const database = new Xansql({
  // debug: true,
  dialect,
  file,
});

export default database;
export const User = database.model(UserSchema);
export const UserRole = database.model(RoleSchema);
