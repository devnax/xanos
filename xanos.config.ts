import { XanosConfig } from "./src";

const config: XanosConfig = {
  // ─────────────────────────────────────────────
  // OS Identity
  // ─────────────────────────────────────────────
  identity: {
    name: "Call Manager",
    logo: "/logo.svg",
    icon: "/favicon.ico",
    description: "Call Manager is a powerful call management system.",
    author: "Devnax",
    website: "",
  },

  // ─────────────────────────────────────────────
  // Appearance
  // ─────────────────────────────────────────────
  appearance: {
    theme: {
      mode: "dark",
      color: {
        brand: "#15a494",
        accent: "#facc15",
      },
    },
    dock: {
      mode: "web",
      placement: "left",
      showLogo: true,
      background: undefined,
    },
  },

  // ─────────────────────────────────────────────
  // Authentication
  // ─────────────────────────────────────────────
  auth: {
    signup: {
      enabled: true,
      role: "user",
      requireEmailVerification: false,
    },

    resetPassword: {
      enabled: true,
    },

    session: {
      duration: "7d",
      refreshEnabled: true,
    },

    providers: {
      password: true,
      google: false,
      github: false,
      facebook: false,
    },
  },

  // ─────────────────────────────────────────────
  // Database
  // ─────────────────────────────────────────────
  database: {
    engine: "sqlite",

    sqlite: "db.sqlite",

    mysql: {
      host: "",
      port: 3306,
      database: "",
      username: "",
      password: "",
    },

    postgres: {
      host: "",
      port: 5432,
      database: "",
      username: "",
      password: "",
    },

    bridge: {
      basePath: "/xql",
      secure: false,
      url: "",
    },

    pool: {
      min: 2,
      max: 10,
    },

    logging: false,
  },

  // ─────────────────────────────────────────────
  // Storage
  // ─────────────────────────────────────────────
  storage: {
    driver: "local",

    local: {
      path: "./public/uploads",
      publicUrl: "/uploads",
    },

    s3: {
      bucket: "",
      region: "",
      endpoint: "",
    },

    limits: {
      maxFileSize: "50mb",
    },
  },

  // ─────────────────────────────────────────────
  // Applications
  // ─────────────────────────────────────────────
  apps: {
    defaultApp: "dashboard",
    custom: [],

    system: {
      settings: true,
      users: true,
      files: true,
      notifications: true,
    },
  },

  // ─────────────────────────────────────────────
  // Security
  // ─────────────────────────────────────────────
  security: {
    secret: {
      public: process.env.XANOS_PUBLIC_SECRET,
      private: process.env.XANOS_PRIVATE_SECRET,
    },

    cors: true,
    rateLimit: true,
    helmet: true,
  },

  // ─────────────────────────────────────────────
  // Server
  // ─────────────────────────────────────────────
  server: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },

  // ─────────────────────────────────────────────
  // Localization
  // ─────────────────────────────────────────────
  localization: {
    language: "en",
    timezone: "Asia/Dhaka",
    currency: "BDT",

    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
  },

  // ─────────────────────────────────────────────
  // Notifications
  // ─────────────────────────────────────────────
  notifications: {
    enabled: true,

    toast: {
      enabled: true,
      position: "bottom-right",
    },

    email: {
      enabled: false,
    },

    push: {
      enabled: false,
    },
  },

  // ─────────────────────────────────────────────
  // Logging
  // ─────────────────────────────────────────────
  logging: {
    level: "info",
    console: true,
    file: false,
    directory: "./logs",
  },
};

export default config;
