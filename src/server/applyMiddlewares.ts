import type { Express } from "express";
import { loadConfig } from "../core/config.js";
import cookieParser from "./middlewares/cookieParser.js";
import { CorsOptions } from "cors";
import cors from "cors";
import helmet, { HelmetOptions } from "helmet";
import rateLimit, { Options as RateLimitOptions } from "express-rate-limit";
const applyMiddlewares = async (app: Express) => {
  const config = await loadConfig();

  app.use(cookieParser);
  if (config.security?.cors) {
    let options: CorsOptions = {};
    if (typeof config.security.cors === "object") {
      options = config.security.cors;
    }
    app.use(cors(options));
  }

  if (config.security?.helmet) {
    let options: HelmetOptions = {};
    if (typeof config.security.helmet === "object") {
      options = config.security.helmet;
    }
    app.use(helmet(options));
  }

  if (config.security?.rateLimit) {
    let options: Partial<RateLimitOptions> = {
      windowMs: 60 * 1000, // 1 minute
      max: 100, // limit each IP to 100 requests per windowMs
    };
    if (typeof config.security.rateLimit === "object") {
      options = config.security.rateLimit;
    }
    app.use(rateLimit(options));
  }
};

export default applyMiddlewares;
