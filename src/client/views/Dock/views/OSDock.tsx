import XanosApps from "../../../classes/XanosApps/index.js";
import Stack from "@xanui/ui/Stack";
import Image from "@xanui/ui/Image";
import RecentAppsButton from "../ActionButton/RecentAppsButton.js";
import HomeButton from "../ActionButton/HomeButton.js";
import AppDrawerButton from "../ActionButton/AppDrawerButton.js";
import Box from "@xanui/ui/Box";
import { useNavigate } from "react-router-dom";
import XanosConfig from "../../../classes/XanosConfig/index.js";
import ViewBox from "@xanui/ui/ViewBox";
import ProfileButton from "../components/ProfileButton.js";

const AppIcon = ({ app }: { app: any }) => {
  const navigate = useNavigate();
  return (
    <Box
      width={34}
      height={34}
      display="flex"
      justifyContent="center"
      alignItems="center"
      radius={1.2}
      bgcolor={app.color || "brand.primary"}
      cursor={"pointer"}
      onClick={() => {
        XanosApps.run(app.id);
        navigate(`/${app.id}`);
      }}
      sx={{
        shadow: 1,
        transition: "transform .12s ease, box-shadow .12s ease",
        "& svg": {
          width: "60%",
          height: "60%",
        },

        "&:hover": {
          shadow: 5,
        },

        "&:active": {
          transform: "scale(.96)",
          shadow: 5,
        },
      }}
    >
      {app.icon}
    </Box>
  );
};

const OSDock = () => {
  const { placement } = XanosConfig.get("dock");
  const isSide = placement === "left" || placement === "right";
  const apps = XanosApps.getApps();

  return (
    <ViewBox
      height={isSide ? "100%" : 44}
      width={isSide ? 52 : "100%"}
      px={isSide ? 0 : 1.5}
      py={isSide ? 1.5 : 0}
      alignItems={"center"}
      horizental={isSide ? false : true}
      backdropFilter={"blur(50px)"}
      bgcolor="surface.secondary"
      shadow={"lg"}
      startContent={
        <Stack
          flexRow
          alignItems={"center"}
          gap={1}
          mb={isSide ? 4 : 0}
          mr={isSide ? 0 : 4}
        >
          <Image src="/.xanos.icon.png" width={32} alt="Xanos Logo" />
        </Stack>
      }
      endContent={
        <Stack
          direction={isSide ? "column" : "row"}
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <ProfileButton mode="compact" />
          {/* <RecentAppsButton />
          <HomeButton />
          <AppDrawerButton /> */}
        </Stack>
      }
    >
      <Stack
        direction={isSide ? "column" : "row"}
        gap={1.5}
        flexWrap={"wrap"}
        alignItems={"center"}
      >
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} />
        ))}
      </Stack>
    </ViewBox>
  );
};

export default OSDock;
