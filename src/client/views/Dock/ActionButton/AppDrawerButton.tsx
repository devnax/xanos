import IconButton from "@xanui/ui/IconButton";
import Apps from "@xanui/icons/Apps";
import AppDrawer from "../../AppDrawer/index.js";

const AppDrawerButton = () => {
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
        AppDrawer.open();
      }}
    >
      <Apps />
    </IconButton>
  );
};

export default AppDrawerButton;
