import fs from "fs";
import path from "path";
import { scanProject } from "./scanner.js";
import generate from "./generate.js";

const setup = async () => {
  // delete .os folder if it exists
  const outDir = path.join(process.cwd(), ".os");
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  const apps = scanProject();
  generate(apps);
};

export default setup;
