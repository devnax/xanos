import { AppRoot, createTheme } from "@xanui/core";
import Xanos from "./include/Xanos/index.js";
import RootLayout from "./layout/index.js";
import { useMemo } from "react";

const AppShell = () => {
  const themeOptions: any = Xanos.theme;

  const theme = useMemo(() => {
    return createTheme({
      name: `xos-${themeOptions.mode}`,
      mode: themeOptions.mode,
      colors: {
        brand: themeOptions.accent,
      },
    });
  }, [themeOptions]);

  return (
    <AppRoot theme={theme} minHeight="100vh">
      <RootLayout />
    </AppRoot>
  );
};

export default AppShell;
