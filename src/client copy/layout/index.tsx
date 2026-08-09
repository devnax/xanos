import ViewBox from "@xanui/ui/ViewBox";
import Dock from "./Dock.js";
import Xanos from "../include/Xanos/index.js";
import Render from "./Render.js";

const RootLayout = () => {
  const dockOption = Xanos.metas.get("dock") as any;
  const isRight = dockOption.placement === "right";

  return (
    <ViewBox
      startContent={<Dock />}
      flexDirection={isRight ? "row-reverse" : "row"}
      height="100vh"
    >
      <Render />
    </ViewBox>
  );
};

export default RootLayout;
