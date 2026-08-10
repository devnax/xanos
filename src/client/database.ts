import { Xansql } from "xansql";
import { XansqlBridgeDialect } from "xansql/dialects/Bridge";
const client = XansqlBridgeDialect("http://localhost:3000/api/xql");

const database = new Xansql({
  dialect: client.dialect,
  file: client.file,
});

export default database;
