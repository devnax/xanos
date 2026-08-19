import { HelmetOptions } from "helmet";
import { Options as RateLimitOptions } from "express-rate-limit";
import { CorsOptions } from "cors";

export type ThemeMode = "light" | "dark" | "system";
export type UIDensity = "compact" | "comfortable" | "spacious";
export type DockMode = "web" | "desktop";
export type DockPlacement = "left" | "right" | "top" | "bottom";
export type DockSize = "small" | "medium" | "large";
export type DatabaseEngine = "sqlite" | "mysql" | "postgres";
export type StorageDriver = "local" | "s3" | "r2" | "gcs";
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface XanosIdentity {
  name: string;
  logo?: string;
  icon?: string;
  description?: string;
  author?: string;
  website?: string;
}

export interface XanosTheme {
  mode: ThemeMode;
  color: {
    brand: string;
    accent: string;
  };
}

export interface XanosDock {
  mode: DockMode;
  placement: DockPlacement;
  showLogo?: boolean;
  background?: string;
}

export interface XanosAppearance {
  dock?: XanosDock;
  theme?: XanosTheme;
}

export interface XanosAuth {
  signup?: {
    enabled?: boolean;
    role?: string;
    requireEmailVerification?: boolean;
  };

  resetPassword?: {
    enabled?: boolean;
  };

  session?: {
    duration?: string;
    refreshEnabled?: boolean;
  };

  providers?: {
    password?: boolean;
    google?: boolean;
    github?: boolean;
    facebook?: boolean;
  };
}

export interface XanosMySQLDatabase {
  host: string;
  port?: number;
  database: string;
  username: string;
  password: string;
}

export interface XanosPostgresDatabase {
  host: string;
  port?: number;
  database: string;
  username: string;
  password: string;
}

export interface XanosDatabase {
  engine: DatabaseEngine;

  sqlite?: string;
  mysql?: XanosMySQLDatabase;
  postgres?: XanosPostgresDatabase;
  bridge?: {
    basePath: string;
    secure?: boolean;
    url: string;
  };
  pool?: {
    min?: number;
    max?: number;
  };

  logging?: boolean;
}

export interface XanosLocalStorage {
  path: string;
  publicUrl?: string;
}

export interface XanosS3Storage {
  bucket: string;
  region: string;
  endpoint?: string;
}

export interface XanosR2Storage {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  endpoint?: string;
}

export interface XanosGCSStorage {
  projectId: string;
  bucket: string;
  clientEmail?: string;
  privateKey?: string;
}

export interface XanosStorage {
  driver: StorageDriver;

  local?: XanosLocalStorage;
  s3?: XanosS3Storage;
  r2?: XanosR2Storage;
  gcs?: XanosGCSStorage;

  limits?: {
    maxFileSize?: string | number;
  };
}

export interface XanosCustomAppPaths {
  app: string;
  config: string;
  api?: string;
  schema?: string;
}

export interface XanosApps {
  custom?: XanosCustomAppPaths[];

  system?: {
    settings?: boolean;
    users?: boolean;
    files?: boolean;
    notifications?: boolean;
  };

  defaultApp?: string;
}

export interface XanosSecurity {
  secret: {
    public?: string;
    private?: string;
  };

  cors?: CorsOptions | boolean;
  rateLimit?: RateLimitOptions | boolean;
  helmet?: HelmetOptions | boolean;
}

export interface XanosServer {
  host?: string;
  port?: number;
}

export interface XanosLocalization {
  language?: string;
  timezone?: string;
  currency?: string;

  dateFormat?: string;
  timeFormat?: "12h" | "24h";
}

export interface XanosNotifications {
  enabled?: boolean;

  toast?: {
    enabled?: boolean;
    position?:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right";
  };

  email?: {
    enabled?: boolean;
  };

  push?: {
    enabled?: boolean;
  };
}

export interface XanosLogging {
  level?: LogLevel;
  console?: boolean;
  file?: boolean;
  directory?: string;
}

export interface XanosConfig {
  identity: XanosIdentity;
  theme?: XanosTheme;
  appearance?: XanosAppearance;
  auth?: XanosAuth;
  database: XanosDatabase;
  storage?: XanosStorage;
  apps?: XanosApps;
  security?: XanosSecurity;
  server?: XanosServer;
  localization?: XanosLocalization;
  notifications?: XanosNotifications;
  logging?: XanosLogging;
}
