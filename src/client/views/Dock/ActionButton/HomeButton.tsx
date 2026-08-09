import IconButton from "@xanui/ui/IconButton";
import React from "react";
import CircleOutlined from "@xanui/icons/CircleOutlined";
import Xanos from "../../../classes/Xanos/index.js";

const HomeButton = ({ os }: { os: Xanos }) => {
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
        os.screen.setDeactive();
      }}
    >
      <CircleOutlined />
    </IconButton>
  );
};

export default HomeButton;
