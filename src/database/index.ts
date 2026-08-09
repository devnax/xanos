import { Xansql, type XansqlFileMeta } from "xansql";
import MysqlDialect from "xansql/dialects/Mysql";
import { XansqlBridgeDialect } from "xansql/dialects/Bridge";
import { loadConfig } from "../core/config";

let dialect;
let file;

if (typeof window === "undefined") {
  dialect = MysqlDialect({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const fs = await import("fs");
  const path = await import("path");
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
  const client = XansqlBridgeDialect("http://localhost:3000/api/xql");
  dialect = client.dialect;
  file = client.file;
}

const database = async () => {
  const db = new Xansql({
    // debug: true,
    dialect,
    file,
  });
  return db;
};

export default database;

// export const User = database.model(UserModel);
