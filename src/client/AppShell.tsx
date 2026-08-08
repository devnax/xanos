import { AppRoot } from "@xanui/core";
import { DarkTheme } from "./libs/theme.js";
import { Button } from "@xanui/ui";
import img from "./img.png";

const AppShell = () => {
  return (
    <AppRoot theme={DarkTheme} minHeight="100vh">
      <Button>Click Me </Button>
      <img src={img} alt="Sample Image" />
    </AppRoot>
  );
};

export default AppShell;
