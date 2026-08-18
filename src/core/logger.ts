import os from "os";
import pc from "picocolors";

const logger = {
  info: (msg: string) => console.log(`${pc.blue("[xanos]")} ${msg}`),
  warn: (msg: string) =>
    console.log(`${pc.yellow("[xanos:warn]")} ${pc.yellow(msg)}`),
  error: (msg: string) =>
    console.log(`${pc.red("[xanos:error]")} ${pc.red(msg)}`),
  warnOnce: (msg: string) =>
    console.log(`${pc.yellow("[xanos:warn]")} ${pc.yellow(msg)}`),
  clearScreen: () => {},
  hasErrorLogged: () => false,
  hasWarned: false,
};

export default logger;

const getLocalIpAddress = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] ?? []) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

export const printServerInfo = (options: {
  port: number;
  version: string;
  env?: string[];
}) => {
  console.log();
  console.log(`${pc.green(pc.bold("◆ Xanos"))} ${pc.dim(options.version)}`);
  console.log();
  console.log(
    `${pc.dim("-")} Local:        ${pc.cyan(`http://localhost:${options.port}`)}`,
  );
  console.log(
    `${pc.dim("-")} Network:      ${pc.cyan(`http://${getLocalIpAddress()}:${options.port}`)}`,
  );
  if (options.env?.length) {
    console.log(`${pc.dim("-")} Environments: ${options.env.join(", ")}`);
  }
};
