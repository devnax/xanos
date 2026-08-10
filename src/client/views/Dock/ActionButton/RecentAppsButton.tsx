import React from "react";
import Layers from "@xanui/icons/Layers";
import IconButton from "@xanui/ui/IconButton";
import Xanos from "../../../classes/Xanos/index.js";
import RecentApps from "../../RecentApps/index.js";

const RecentAppsButton = ({ os }: { os: Xanos }) => {
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
        RecentApps.open(os);
      }}
    >
      <Layers />
    </IconButton>
  );
};

export default RecentAppsButton;
