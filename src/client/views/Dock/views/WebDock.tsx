import Stack from "@xanui/ui/Stack";
import RecentAppsButton from "../ActionButton/RecentAppsButton.js";
import HomeButton from "../ActionButton/HomeButton.js";
import AppDrawerButton from "../ActionButton/AppDrawerButton.js";
import List from "@xanui/ui/List";
import ListItem from "@xanui/ui/ListItem";
import { useNavigate } from "react-router-dom";
import XanosApps from "../../../classes/XanosApps/index.js";
import useActiveApp from "../../../hooks/useActiveApp.js";

const AppIcon = ({ app }: { app: any }) => {
  const navigate = useNavigate();
  const activeApp = useActiveApp();
  const isActiveApp = activeApp?.id === app.id;
  return (
    <ListItem
      startIcon={app.icon}
      selected={isActiveApp ? true : false}
      onClick={() => {
        XanosApps.run(app.id);
        navigate(`/${app.id}`);
      }}
      sx={{
        "& .list-item-text": {
          textShadow:
            "0 1.5px 2px rgba(0, 0, 0, 0.4), 0 0 6px rgba(255, 255, 255, 0.15);",
        },
      }}
    >
      {app.name}
    </ListItem>
  );
};

const WebDock = () => {
  const apps = XanosApps.getApps();

  return (
    <Stack
      height={"100%"}
      width={250}
      flex="0 0 auto"
      justifyContent={"space-between"}
      bgcolor="surface.secondary"
      shadow={5}
    >
      <List variant={"ghost"} color={"brand"}>
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}
      </List>
      <Stack
        height={52}
        flex="0 0 auto"
        direction={"row"}
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <RecentAppsButton />
        <HomeButton />
        <AppDrawerButton />
      </Stack>
    </Stack>
  );
};

export default WebDock;
