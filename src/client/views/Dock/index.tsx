import React from "react";
import Xanos from "../../classes/Xanos/index.js";
import OSDock from "./views/OSDock.js";
import CompactDock from "./views/CompactDock.js";
import WebDock from "./views/WebDock.js";

export type DockProps = {
  os: Xanos;
};

const Dock = ({ os }: DockProps) => {
  const { mode } = os.config.dock;
  switch (mode) {
    case "os":
      return <OSDock os={os} />;
    case "web":
      return <WebDock os={os} />;
    case "compact":
      return <CompactDock os={os} />;
  }
  return null;
};

export default Dock;
