import "../database/index.js";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Stack from "@xanui/ui/Stack";
import CircleProgress from "@xanui/ui/CircleProgress";
import { AppProvider } from "./context/AppContext.js";
import OSRoot from "./views/OSRoot/index.js";
import XanosApps from "./classes/XanosApps/index.js";
import XanosConfig from "./classes/XanosConfig/index.js";
// import type { OSConfigClient } from "../types/index.js";
import Settings from "@xanui/icons/Settings";
const SettingsView = lazy(() => import("./views/Settings/index.js"));

export type Startup = {
  apps: Record<string, { app: any; config: any }>;
  config: any;
};

const startup = ({ apps, config }: Startup) => {
  XanosApps.create({
    id: "settings",
    name: "Settings",
    icon: <Settings />,
    hidden: true,
    render: () => {
      return (
        <Suspense
          fallback={
            <Stack
              height="100vh"
              width="100vw"
              alignItems="center"
              justifyContent="center"
              bgcolor={"rgba(255, 255, 255, 0.01)"}
            >
              <CircleProgress size="lg" />
            </Stack>
          }
        >
          <SettingsView />
        </Suspense>
      );
    },
  });

  for (const appId in apps) {
    const { app, config } = apps[appId];
    if (!config.name || !config.color || !config.icon) {
      throw new Error(`App ${appId} is missing name, color, or icon in config`);
    }

    const Icon = config.icon;
    const AppComponent = app;

    XanosApps.create({
      id: appId,
      name: config.name,
      color: config.color,
      icon: <Icon />,
      render: () => {
        return (
          <Suspense
            fallback={
              <Stack
                height="100vh"
                width="100vw"
                alignItems="center"
                justifyContent="center"
                bgcolor={"rgba(255, 255, 255, 0.01)"}
              >
                <CircleProgress size="lg" />
              </Stack>
            }
          >
            <AppProvider appId={appId}>
              <AppComponent />
            </AppProvider>
          </Suspense>
        );
      },
    });
  }

  const container = document.getElementById("xroot");
  if (!container) throw new Error("Missing #xroot element");

  // XanosConfig.set("name", config.name);
  // XanosConfig.set("dock", config.dock);
  // XanosConfig.set("theme", {
  //   color: config.theme.color,
  //   mode: config.theme.mode === "dark" ? "dark" : "light",
  // });

  createRoot(container).render(
    <BrowserRouter>
      <OSRoot />
    </BrowserRouter>,
  );
};

export default startup;
