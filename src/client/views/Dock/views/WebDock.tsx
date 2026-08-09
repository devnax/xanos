import React from "react";
import Xanos from "../../../Xanos.js";
import Stack from "@xanui/ui/Stack";
import RecentAppsButton from "../ActionButton/RecentAppsButton.js";
import HomeButton from "../ActionButton/HomeButton.js";
import AppDrawerButton from "../ActionButton/AppDrawerButton.js";
import List from "@xanui/ui/List";
import ListItem from "@xanui/ui/ListItem";

export type RenderAppsProps = {
  os: Xanos;
};

const AppIcon = ({ app, os }: { app: any; os: Xanos }) => {
  const activeScreen: any = os.screen.getActiveScreen();
  const isActiveApp = os.screen
    .getAppsOnScreen(activeScreen?.rid)
    .find((a: any) => a.appId === app.id);

  return (
    <ListItem
      startIcon={app.icon}
      selected={isActiveApp ? true : false}
      opacity={isActiveApp ? 1 : 0.7}
      onClick={() => {
        os.runApp(app.id);
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

const WebDock = ({ os }: { os: Xanos }) => {
  const apps = os.apps.getApps();

  return (
    <Stack
      height={"100%"}
      width={250}
      flex="0 0 auto"
      justifyContent={"space-between"}
      bgcolor="surface.secondary"
      shadow={5}
    >
      <List variant={"outline"} color={"default"}>
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} os={os} />
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
        <RecentAppsButton os={os} />
        <HomeButton os={os} />
        <AppDrawerButton os={os} />
      </Stack>
    </Stack>
  );
};

export default WebDock;
