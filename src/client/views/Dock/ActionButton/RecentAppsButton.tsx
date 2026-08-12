import React from "react";
import Layers from "@xanui/icons/Layers";
import IconButton from "@xanui/ui/IconButton";
import RecentApps from "../../RecentApps/index.js";

const RecentAppsButton = () => {
  return (
    <IconButton
      size={40}
      opacity={0.8}
      hover={{
        opacity: 1,
      }}
      variant={"text"}
      color="default"
      onClick={() => {
        RecentApps.open();
      }}
    >
      <Layers />
    </IconButton>
  );
};

export default RecentAppsButton;
