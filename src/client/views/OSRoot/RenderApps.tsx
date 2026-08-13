import Stack from "@xanui/ui/Stack";
import XanosApps from "../../classes/XanosApps/index.js";
import useActiveApp from "../../hooks/useActiveApp.js";

const RenderApps = () => {
  const runningApps = XanosApps.getRunningApps();
  const activeApp = useActiveApp();

  return (
    <Stack height="100%" width="100%">
      {runningApps.map((app) => {
        const AppComponent: any = app.render;
        return (
          <Stack
            key={app.id}
            height="100%"
            width="100%"
            border={1}
            display={activeApp?.id === app.id ? "block" : "none"}
          >
            <AppComponent />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default RenderApps;
