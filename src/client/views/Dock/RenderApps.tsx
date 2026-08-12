import Box from "@xanui/ui/Box";
import Stack from "@xanui/ui/Stack";
import XanosApps from "../../classes/XanosApps/index.js";
import XanosConfig from "../../classes/XanosConfig/index.js";

const AppIcon = ({ app }: { app: any }) => {
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
        XanosApps.run(app.id);
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

const RenderApps = () => {
  const apps = XanosApps.getApps();
  const { placement } = XanosConfig.get("dock", true);
  const isSide = placement === "left" || placement === "right";

  return (
    <Stack direction={isSide ? "column" : "row"} gap={1.5} flexWrap={"wrap"}>
      {apps.map((app) => (
        <AppIcon key={app.id} app={app} />
      ))}
    </Stack>
  );
};

export default RenderApps;
