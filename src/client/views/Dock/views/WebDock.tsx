import Stack from "@xanui/ui/Stack";
import RecentAppsButton from "../ActionButton/RecentAppsButton.js";
import HomeButton from "../ActionButton/HomeButton.js";
import AppDrawerButton from "../ActionButton/AppDrawerButton.js";
import List from "@xanui/ui/List";
import ListItem from "@xanui/ui/ListItem";
import Image from "@xanui/ui/Image";
import ViewBox from "@xanui/ui/ViewBox";
import { useNavigate } from "react-router-dom";
import XanosApps from "../../../classes/XanosApps/index.js";
import useActiveApp from "../../../hooks/useActiveApp.js";
import Text from "@xanui/ui/Text";
import XanosConfig from "../../../classes/XanosConfig/index.js";
import ProfileButton from "../components/ProfileButton.js";

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
        radius: 1,
        mb: 0.3,
        opacity: isActiveApp ? 1 : 0.8,
        "&:hover": {
          opacity: 1,
          "& svg": {
            transform: "scale(1.1)",
            color: "brand.primary",
          },
        },
        "& .list-item-text": {
          fontSize: 15,
          fontWeight: 500,
        },
        "& svg": {
          fontSize: 20,
        },
      }}
    >
      {app.name}
    </ListItem>
  );
};

const WebDock = () => {
  const apps = XanosApps.getApps();
  const name = XanosConfig.get("name");

  return (
    <ViewBox
      height={"100%"}
      width={250}
      flex="0 0 auto"
      bgcolor="surface.primary"
      shadow={5}
      startContent={
        <Stack p={1} flexRow alignItems={"center"} gap={1} mb={1}>
          <Image src="/.xanos.icon.png" width={32} alt="Xanos Logo" />
          <Text variant="h6">{name}</Text>
        </Stack>
      }
      endContent={
        <Stack mb={2} px={1.5}>
          <ProfileButton mode="full" />
        </Stack>
      }
    >
      <Stack px={1}>
        <List variant={"ghost"} color={"brand"}>
          {apps.map((app) => (
            <AppIcon key={app.id} app={app} />
          ))}
        </List>
      </Stack>
    </ViewBox>
  );
};

export default WebDock;
