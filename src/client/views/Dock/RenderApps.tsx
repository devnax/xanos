import React from "react";
import Box from "@xanui/ui/Box";
import Stack from "@xanui/ui/Stack";
import Xanos from "../../Xanos.js";

export type RenderAppsProps = {
  os: Xanos;
};

const AppIcon = ({ app, os }: { app: any; os: Xanos }) => {
  return (
    <Box
      width={40}
      height={40}
      display="flex"
      justifyContent="center"
      alignItems="center"
      radius={1.7}
      bgcolor={app.color || "brand.primary"}
      cursor={"pointer"}
      onClick={() => {
        os.runApp(app.id);
      }}
      sx={{
        shadow: "md",
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

const RenderApps = ({ os }: RenderAppsProps) => {
  const apps = os.apps.getApps();
  const { placement } = os.config.get("dock");
  const isSide = placement === "left" || placement === "right";

  return (
    <Stack direction={isSide ? "column" : "row"} gap={1.5} flexWrap={"wrap"}>
      {apps.map((app) => (
        <AppIcon key={app.id} app={app} os={os} />
      ))}
    </Stack>
  );
};

export default RenderApps;
