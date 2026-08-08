#!/usr/bin/env node

import { Command } from "commander";
import dev from "../cli/dev/index.js";
import build from "../cli/build/index.js";
import start from "../cli/start/index.js";
import create from "../cli/create/index.js";
const program = new Command();

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
  .option("--port <number>", "server port")
  .action(start);

program
  .command("create")
  .description("create a new Xanos project")
  .action(create);

program.parse();
