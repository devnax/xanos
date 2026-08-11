#!/usr/bin/env node

import { Command } from "commander";
import dev from "./command/dev/index.js";
import build from "./command/build/index.js";
import start from "./command/start/index.js";
import create from "./command/create/index.js";
import migrate from "./command/migrate/index.js";
import makeApp from "./command/make-app/index.js";
const program = new Command();

program.name("XANOS").description("Usages");
program.command("dev").description("run the development server").action(dev);
program.command("start").description("run the production server").action(start);

program
  .command("build")
  .description("build xanos for production")
  .action(build);

program
  .command("create")
  .description("create a new Xanos project")
  .action(create);

// database migration commands
program
  .command("migrate")
  .description("run database migrations")
  .option("--force", "force run migrations")
  .action(migrate);

program
  .command("make:app <name>")
  .description("create a new application")
  .action(makeApp);

program.parse();
