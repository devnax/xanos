import "../database/index.js";
import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Stack from "@xanui/ui/Stack";
import CircleProgress from "@xanui/ui/CircleProgress";
import Xanos from "./classes/Xanos/index.js";
import { AppProvider } from "./context/AppContext.js";
import { OSProvider } from "./context/OSContext.js";
export const XanosInstance = new Xanos();

export type Startup = {
  apps: Record<string, { app: any; config: any }>;
};

const startup = ({ apps }: Startup) => {
  for (const appId in apps) {
    const { app, config } = apps[appId];
    if (!config.name || !config.color || !config.icon) {
      throw new Error(`App ${appId} is missing name, color, or icon in config`);
    }

    const Icon = config.icon;
    const AppComponent = app;

    XanosInstance.apps.create({
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
  createRoot(container).render(
    <BrowserRouter>
      <OSProvider os={XanosInstance}>{XanosInstance.render()}</OSProvider>
    </BrowserRouter>,
  );
};

export default startup;
