import React from "react";
import { createRoot } from "react-dom/client";
import { lazy } from "react";
const AppShell = lazy(() => import("./AppShell.js"));

const container = document.getElementById("xroot");
if (!container) throw new Error("Missing #xroot element");

createRoot(container).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <AppShell /> asd
    </React.Suspense>
  </React.StrictMode>,
);
