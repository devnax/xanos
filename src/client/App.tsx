import { AppRoot } from "@xanui/core";
import { DarkTheme } from "./libs/theme";

const Root = () => {
  return (
    <AppRoot theme={DarkTheme}>
      the code in <code>client/app.tsx </code> file.
    </AppRoot>
  );
};

export default Root;
