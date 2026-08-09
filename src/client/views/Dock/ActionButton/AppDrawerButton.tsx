import IconButton from "@xanui/ui/IconButton";
import React from "react";
import Apps from "@xanui/icons/Apps";
import Xanos from "../../../Xanos.js";
import AppDrawer from "../../AppDrawer/index.js";

const AppDrawerButton = ({ os }: { os: Xanos }) => {
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
        AppDrawer.open(os);
      }}
    >
      <Apps />
    </IconButton>
  );
};

export default AppDrawerButton;
