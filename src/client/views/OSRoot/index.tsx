import { useEffect, useLayoutEffect, useMemo } from "react";
import { AppRoot, createTheme } from "@xanui/core";
import Stack from "@xanui/ui/Stack";
import Dock from "../Dock/index.js";
import Desktop from "../Desktop/index.js";
import useMobile from "../../hooks/useMobile.js";
import XanosConfig from "../../classes/XanosConfig/index.js";
import RenderApps from "./RenderApps.js";
import XanosApps from "../../classes/XanosApps/index.js";
import useActiveApp from "../../hooks/useActiveApp.js";

const OSRoot = () => {
  const dock = XanosConfig.get("dock");
  const isSide = dock.placement === "left" || dock.placement === "right";
  const DesktopView: any = XanosConfig.get("renderDesktop", false) ?? Desktop;
  const isMobile = useMobile();
  const activeApp = useActiveApp();

  useLayoutEffect(() => {
    if (activeApp?.id && !XanosApps.getRunningApps().length) {
      XanosApps.run(activeApp?.id);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      XanosConfig.set("isMobile", true);
    } else {
      XanosConfig.set("isMobile", false);
    }
  }, [isMobile]);

  let direction: any = "row";
  let width: any = isSide ? "calc(100vw - 52px)" : "100vw";
  let height: any = isSide ? "100vh" : "calc(100vh - 52px)";

  if (dock.placement === "bottom") {
    direction = "column-reverse";
  } else if (dock.placement === "right") {
    direction = "row-reverse";
  }

  if (dock.mode === "compact") {
    width = "100vw";
    height = "100vh";
  } else if (dock.mode === "web") {
    width = "calc(100vw - 250px)";
    height = "100vh";
    direction = dock.placement === "right" ? "row-reverse" : "row";
  }

  return (
    <Stack>
      <Stack
        height="100%"
        width="100%"
        // bgimage={"http://localhost:4000/wallpaper3.jpg"}
        position={"absolute"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        zIndex={0}
      ></Stack>
      <Stack
        height="100%"
        width="100%"
        flexDirection={direction}
        position={"absolute"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        zIndex={1}
      >
        <Dock />
        <Stack
          flex={1}
          height={height}
          width={width}
          overflow={"hidden"}
          position={"relative"}
        >
          <Stack height="100%" width="100%" position={"relative"}>
            <RenderApps />
          </Stack>
          {DesktopView && (
            <Stack
              height="100%"
              width="100%"
              position={"absolute"}
              left={0}
              right={0}
              bottom={0}
              top={0}
              display={activeApp ? "none" : "block"}
            >
              <DesktopView />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

const Root = () => {
  const _theme = XanosConfig.get("theme", true);
  const theme = useMemo(() => {
    return createTheme({
      name: `xanos-${_theme.mode}`,
      mode: _theme.mode,
      colors: {
        brand: _theme.accentColor as any,
      },
    });
  }, [_theme]);

  return (
    <AppRoot theme={theme} height="100vh" width="100vw" position={"relative"}>
      <OSRoot />
    </AppRoot>
  );
};
export default Root;
