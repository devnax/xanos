import React from "react";
import Xanos from "../../../Xanos.js";
import Stack from "@xanui/ui/Stack";
import RecentAppsButton from "../ActionButton/RecentAppsButton.js";
import HomeButton from "../ActionButton/HomeButton.js";
import AppDrawerButton from "../ActionButton/AppDrawerButton.js";

const CompactDock = ({ os }: { os: Xanos }) => {
  const { placement } = os.config.get("dock");
  const isSide = placement === "left" || placement === "right";
  let sx: any = {};
  switch (placement) {
    case "left":
      sx = {
        left: 0,
        ml: 0.8,
      };
      break;
    case "bottom":
      sx = {
        left: "50%",
        transform: "translateX(-50%)",
        mb: 0.8,
      };
      break;
    case "right":
      sx = {
        right: 0,
        mr: 0.8,
      };
      break;
  }

  return (
    <Stack
      direction={isSide ? "column" : "row"}
      gap={0.5}
      position={"fixed"}
      radius={4}
      bottom={0}
      zIndex={1000}
      sx={sx}
      shadow={5}
      p={0.2}
      backdropFilter={"blur(50px)"}
    >
      <RecentAppsButton os={os} />
      <HomeButton os={os} />
      <AppDrawerButton os={os} />
    </Stack>
  );
};

export default CompactDock;
