import type { XansqlDialectEngine } from "xansql";
import type { PoolOptions } from "mysql2";
import { PoolConfig } from "pg";
import type { XanosConfigSchemaType } from "../client/classes/XanosConfig/schema";

type FilePath = string;
export type S3FilesConfig = {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export type OSConfigClient = {
  name: string;
  theme: XanosConfigSchemaType["theme"];
  dock: XanosConfigSchemaType["dock"];
};

export type XanosConfig = OSConfigClient & {
  database: {
    engine: XansqlDialectEngine;
    sqlite?: string;
    mysql?: PoolOptions;
    postgres?: PoolConfig;
  };
  files: FilePath | S3FilesConfig;
  customApps: string[];
};
