import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { frameworkDir } from "./paths";

const server: Record<string, string> = {};
const clientEnvPrefix = "PUB_";
const client: Record<string, string> = {};
let loaded = false;

const generateTsTypes = () => {
  const lines: string[] = [];
  lines.push("interface ImportMetaEnv {");
  for (const key in client) {
    const value = client[key];
    let type: string = "string";
    if (typeof value === "string") {
      type = "string";
    } else if (typeof value === "number") {
      type = "number";
    } else if (typeof value === "boolean") {
      type = "boolean";
    }
    lines.push(`  ${key}: ${type};`);
  }
  lines.push("}");

  lines.push("");
  lines.push("interface ImportMeta {");
  lines.push("  readonly env: ImportMetaEnv;");
  lines.push("}");

  lines.push("");

  // server
  lines.push("");
  lines.push("interface ProcessEnv {");
  for (const key in server) {
    lines.push(`  ${key}: string;`);
  }
  lines.push("}");

  fs.writeFileSync(
    path.resolve(process.cwd(), "xanos-env.d.ts"),
    lines.join("\n"),
  );
};

function loadEnv(mode: "development" | "production") {
  if (loaded) return { server, client };
  const files = [".env", mode === "production" ? ".prod.env" : ".dev.env"];

  for (const file of files) {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) continue;
    const parsed = dotenv.parse(fs.readFileSync(filePath));
    for (const key in parsed) {
      if (key.startsWith(clientEnvPrefix)) {
        client[key.replace(clientEnvPrefix, "")] = JSON.parse(parsed[key]);
      } else {
        server[key] = JSON.parse(parsed[key]);
      }
    }
  }
  loaded = true;
  generateTsTypes();
  return { server, client };
}

export default loadEnv;
