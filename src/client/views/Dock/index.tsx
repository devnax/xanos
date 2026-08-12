import OSDock from "./views/OSDock.js";
import CompactDock from "./views/CompactDock.js";
import WebDock from "./views/WebDock.js";
import XanosConfig from "../../classes/XanosConfig/index.js";

export type DockProps = {};

const Dock = ({}: DockProps) => {
  const { mode } = XanosConfig.get("dock");
  switch (mode) {
    case "os":
      return <OSDock />;
    case "web":
      return <WebDock />;
    case "compact":
      return <CompactDock />;
  }
  return null;
};

export default Dock;
