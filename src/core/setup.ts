import { scanProject } from "./scanner.js";
import generate from "./generate.js";

const setup = () => {
  const apps = scanProject();
  generate(apps);
};

export default setup;
