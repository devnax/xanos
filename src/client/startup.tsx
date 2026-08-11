import "../database/index.js";
import { createRoot } from "react-dom/client";
import { XanosInstance } from "./dep-index.js";
import { Suspense } from "react";
import Stack from "@xanui/ui/Stack";
import CircleProgress from "@xanui/ui/CircleProgress";

const startup = (apps: Record<string, { app: any; config: any }>) => {
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
            <AppComponent />
          </Suspense>
        );
      },
    });
  }

  const container = document.getElementById("xroot");
  if (!container) throw new Error("Missing #xroot element");
  createRoot(container).render(XanosInstance.render());
};

export default startup;
