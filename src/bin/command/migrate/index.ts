import path from "path";
import prompts from "prompts";
import _import from "../../../core/import.js";
import { fileURLToPath } from "url";
import { scanProject } from "../../../core/scanner.js";
import logger from "../../../core/logger.js";
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
  const dbpath = path.join(__dirname, "../../database/index.js");
  const db: any = await _import(dbpath);
  for (let { files } of scan) {
    if (files.schema) {
      await _import(files.schema);
    }
  }
  logger.info("Running database migrations...");
  await db.default.migrate(force);
  logger.info("Database migrations completed successfully.");
};

export default migrate;
