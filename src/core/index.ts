import type { XansqlDialectEngine } from "xansql";
import type { PoolOptions } from "mysql2";
import { PoolConfig } from "pg";

type FilePath = string;
export type S3FilesConfig = {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export interface XanosConfig {
  database: {
    engine: XansqlDialectEngine;
    sqlite?: string;
    mysql?: PoolOptions;
    postgres?: PoolConfig;
  };
  files: FilePath | S3FilesConfig;
  apps: string[];
}
