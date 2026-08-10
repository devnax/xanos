import "../database/index.js";
import { createRoot } from "react-dom/client";
import { XanosInstance } from "./index.js";

const startup = (apps: any) => {
  const container = document.getElementById("xroot");
  if (!container) throw new Error("Missing #xroot element");
  createRoot(container).render(XanosInstance.render());
};

export default startup;
