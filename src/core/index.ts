export interface XanosConfig {
  databaseUrl?: string;
  media?: {
    client: "s3" | "local";
    s3?: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
      bucket: string;
    };
    local?: {
      directory: string;
    };
  };
}
