import Xanos from "../include/Xanos/index.js";
import { Stack } from "@xanui/ui";
import Dashboard from "./Dashboard.js";

const Render = () => {
  const activeApp = Xanos.ActiveApp;

  if (!activeApp) {
    return <Dashboard />;
  }

  const RenderApp = activeApp.render;

  return (
    <Stack>
      <RenderApp />
    </Stack>
  );
};

export default Render;
