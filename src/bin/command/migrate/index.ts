import path from "path";
import prompts from "prompts";
import _import from "../../../core/import.js";
import { fileURLToPath } from "url";
import { scanProject } from "../../../core/scanner.js";
import logger from "../../../core/logger.js";
import { User, UserRole } from "../../../database/index.js";
import pc from "picocolors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const migrate = async (options: { force?: boolean }) => {
  const scan = await scanProject();
  const force = options.force || false;
  if (force) {
    const response = await prompts([
      {
        type: "confirm",
        name: "confirm",
        message:
          "This will delete the entire database and recreate all tables. All existing data will be permanently lost. Continue?",
        initial: false,
      },
    ]);
    if (!response.confirm) {
      logger.warn("Migration aborted by user.");
      return;
    }
  }
  const dbpath = path.join(__dirname, "../../../database/index.js");
  const db: any = await _import(dbpath);
  for (let { files } of scan) {
    if (files.schema) {
      await _import(files.schema);
    }
  }

  logger.info("Running database migrations...");
  try {
    await db.default.migrate(force);
  } catch (error: any) {
    logger.error(`Migration failed: ${error.message}`);
  }
  logger.info("Database migrations completed successfully.");

  try {
    const roles = await UserRole.create({
      data: {
        name: "admin",
        type: "organization",
        permission: {},
      },
    });

    if (roles) {
      const role = roles[0];
      await User.create({
        data: {
          name: "Admin",
          email: "admin@xanos.com",
          username: "admin",
          password: "admin123",
          role: role.id,
        },
      });
      console.log("");
      console.log(
        `${pc.green("Admin user credentials:")}\n` +
          `${pc.yellow("Username:")} admin\n` +
          `${pc.yellow("Email:")} admin@xanos.com\n` +
          `${pc.yellow("Password:")} admin123`,
      );
      console.log("");
    }
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default migrate;
