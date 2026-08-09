import { useEffect, useMemo } from "react";
import { AppRoot, createTheme, Transition } from "@xanui/core";
import Stack from "@xanui/ui/Stack";
import Xanos from "../../classes/Xanos/index.js";
import Dock from "../Dock/index.js";
import Desktop from "../Desktop/index.js";
import RenderScreen from "./RenderScreen.js";
import useMobile from "../../hooks/useMobile.js";

export type OSRootProps = {
  os: Xanos;
};
const OSRoot = ({ os }: OSRootProps) => {
  const dock = os.config.dock;
  const isSide = dock.placement === "left" || dock.placement === "right";
  const DesktopView: any = os.config.get("renderDesktop", false) ?? Desktop;
  const activeScreen = os.screen.getActiveScreen(false);
  const screens = os.screen.getScreens();
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) {
      os.config.set("isMobile", true);
    } else {
      os.config.set("isMobile", false);
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
        <Dock os={os} />
        <Stack
          flex={1}
          height={height}
          width={width}
          overflow={"hidden"}
          position={"relative"}
        >
          {screens.map((screen) => (
            <Transition
              key={screen.rid}
              variant={"fade"}
              open={activeScreen?.rid === screen.rid}
              easing="smooth"
              duration={300}
              onExited={() => {}}
            >
              <Stack
                height="100%"
                width={"100%"}
                position={"absolute"}
                left={0}
                right={0}
                bottom={0}
                top={0}
                zIndex={activeScreen?.rid === screen.rid ? 1 : 0}
              >
                <RenderScreen screenId={screen.rid} os={os} />
              </Stack>
            </Transition>
          ))}
          {DesktopView && (
            <Transition
              variant={"fade"}
              open={activeScreen ? false : true}
              easing="smooth"
              duration={300}
            >
              <Stack
                height="100%"
                width="100%"
                position={"absolute"}
                left={0}
                right={0}
                bottom={0}
                top={0}
                zIndex={activeScreen ? 0 : 1}
              >
                <DesktopView os={os} />
              </Stack>
            </Transition>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

const Root = ({ os }: OSRootProps) => {
  const _theme = os.config.get("theme", true);
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
      <OSRoot os={os} />
    </AppRoot>
  );
};
export default Root;
