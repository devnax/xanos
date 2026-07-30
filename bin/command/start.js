import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const cwd = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(cwd, ".os/server.js");

const start = () => {
  const child = spawn("node", [serverPath], { stdio: "inherit" });
  child.on("error", (err) => console.error("[xanos:error]", err.message));
};

export default start;
