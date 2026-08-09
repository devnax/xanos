import { createRoot } from "react-dom/client";
import { XanosInstance } from "./index.js";

const container = document.getElementById("xroot");
if (!container) throw new Error("Missing #xroot element");
const Render = XanosInstance.render.bind(XanosInstance);
createRoot(container).render(<Render />);
