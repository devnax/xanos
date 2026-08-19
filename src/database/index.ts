import { Xansql, type XansqlFileMeta } from "xansql";
import { XansqlBridgeDialect } from "xansql/dialects/Bridge";
import UserSchema from "./schema/User.js";
import RoleSchema from "./schema/UserRole.js";
import UserBranchSchema from "./schema/UserBranch.js";
import UserMetaSchema from "./schema/UserMeta.js";
import { XANSQL_BASE_PATH } from "../core/constant.js";

declare const __XANOS_CLIENT__: boolean;

const isClient =
  typeof __XANOS_CLIENT__ !== "undefined"
    ? __XANOS_CLIENT__
    : typeof window !== "undefined";

let dialect: any;
let file: any;

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

  const engine = config.database.engine;
  const dbConfig = config.database[engine];

  switch (config.database.engine) {
    case "sqlite":
      dialect = SqliteDialect(dbConfig as any);
      break;
    case "mysql":
      dialect = MysqlDialect(dbConfig as any);
      break;
    case "postgres":
      dialect = PostgresDialect(dbConfig as any);
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
  const client = XansqlBridgeDialect(`${protocol}//${host}${XANSQL_BASE_PATH}`);
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
export const UserBranch = database.model(UserBranchSchema);
export const UserMeta = database.model(UserMetaSchema);
