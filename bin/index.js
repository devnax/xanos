#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();
import dev from "./command/dev.js";
import build from "./command/build/index.js";
import start from "./command/start.js";

program.name("XANOS").description("Usages");

program
  .command("dev")
  .description("run the development server")
  .option("--port <number>", "dev server port")
  .action(dev);

program
  .command("build")
  .description("build xanos for production")
  .action(build);

program
  .command("start")
  .description("run the production server")
  .option("--port", "server port")
  .action(start);

program
  .command("install")
  .description("install the xanos")
  .action((str, options) => {});

program
  .command("install-app")
  .description("install xanos app from server")
  .action((str, options) => {});

program
  .command("uninstall-app")
  .description("install xanos app from server")
  .action((str, options) => {});

program
  .command("create-app")
  .description("create new app")
  .action((str, options) => {});

program.parse();
