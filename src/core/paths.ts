import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const frameworkDir = path.join(__dirname, "../../");
export const projectRoot = process.cwd() + "\\";
export const outDir = path.join(projectRoot, ".os");
export const isWorkinFrameworkDir = frameworkDir === projectRoot;
