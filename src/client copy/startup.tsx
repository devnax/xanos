import React from "react";
import { createRoot } from "react-dom/client";
import AppShell from "./AppShell.js";
const container = document.getElementById("xroot");
if (!container) throw new Error("Missing #xroot element");

createRoot(container).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>,
);
