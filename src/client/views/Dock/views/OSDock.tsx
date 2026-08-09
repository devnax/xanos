import Xanos from "../../../Xanos.js";
import Stack from "@xanui/ui/Stack";
import RecentAppsButton from "../ActionButton/RecentAppsButton.js";
import HomeButton from "../ActionButton/HomeButton.js";
import AppDrawerButton from "../ActionButton/AppDrawerButton.js";
import Box from "@xanui/ui/Box";

export type RenderAppsProps = {
  os: Xanos;
};

const AppIcon = ({ app, os }: { app: any; os: Xanos }) => {
  return (
    <Box
      width={38}
      height={38}
      display="flex"
      justifyContent="center"
      alignItems="center"
      radius={1.2}
      bgcolor={app.color || "brand.primary"}
      cursor={"pointer"}
      onClick={() => {
        os.runApp(app.id);
      }}
      sx={{
        shadow: 1,
        transition: "transform .12s ease, box-shadow .12s ease",
        "& svg": {
          width: "65%",
          height: "65%",
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

const OSDock = ({ os }: { os: Xanos }) => {
  const { placement } = os.config.get("dock");
  const isSide = placement === "left" || placement === "right";
  const apps = os.apps.getApps();

  return (
    <Stack
      height={isSide ? "100%" : 52}
      width={isSide ? 52 : "100%"}
      px={isSide ? 0 : 1.5}
      py={isSide ? 1.5 : 0}
      flex="0 0 auto"
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={isSide ? "column" : "row"}
      backdropFilter={"blur(50px)"}
      bgcolor="surface.secondary"
      shadow={"lg"}
    >
      <Stack direction={isSide ? "column" : "row"} gap={1.5} flexWrap={"wrap"}>
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} os={os} />
        ))}
      </Stack>
      <Stack
        direction={isSide ? "column" : "row"}
        alignItems="center"
        justifyContent="flex-end"
        gap={1}
      >
        <RecentAppsButton os={os} />
        <HomeButton os={os} />
        <AppDrawerButton os={os} />
      </Stack>
    </Stack>
  );
};

export default OSDock;
