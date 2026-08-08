import type { XansqlDialect } from "xansql";

type FilePath = string;
export type S3FilesConfig = {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export interface XanosConfig {
  database: XansqlDialect;
  files: FilePath | S3FilesConfig;
}
