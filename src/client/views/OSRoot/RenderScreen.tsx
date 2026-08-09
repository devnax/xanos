import Xanos from "../../Xanos.js";
import Stack from "@xanui/ui/Stack";
import type { StoreRID } from "react-rock";

export type RenderScreenProps = {
  screenId: StoreRID;
  os: Xanos;
};

const RenderScreen = ({ screenId, os }: RenderScreenProps) => {
  const activeScreen = os.screen.getActiveScreen(false);
  const screenApps = os.screen.getAppsOnScreen(screenId);

  return (
    <Stack height="100%" width="100%">
      {screenApps.map(({ screenId, appId }) => {
        const app = os.apps.getApp(appId, false);
        if (app) {
          const AppComponent: any = app.render;
          return (
            <Stack key={screenId + app.id} height="100%" width="100%">
              <AppComponent />
            </Stack>
          );
        }
        return null;
      })}
    </Stack>
  );
};

export default RenderScreen;
