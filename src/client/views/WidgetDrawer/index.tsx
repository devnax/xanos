import Stack from "@xanui/ui/Stack";
import React, { useState } from "react";
import Xanos from "../../classes/Xanos/index.js";
import Box from "@xanui/ui/Box";
import Menu from "@xanui/ui/Menu";
import Text from "@xanui/ui/Text";
import List from "@xanui/ui/List";
import ListItem from "@xanui/ui/ListItem";
import PushPin from "@xanui/icons/PushPin";
import IconButton from "@xanui/ui/IconButton";
import ArrowUpward from "@xanui/icons/ArrowUpward";
import Layer from "@xanui/ui/Layer";

const AppIcon = ({
  app,
  os,
  onClick,
}: {
  app: any;
  os: Xanos;
  onClick: Function;
}) => {
  const [target, setTarget] = useState<any>();

  return (
    <Stack
      gap={1}
      width={90}
      height={90}
      flex="0 0 auto"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        width={44}
        height={44}
        display="flex"
        justifyContent="center"
        alignItems="center"
        radius={1.7}
        bgcolor={app.color || "brand.primary"}
        cursor={"pointer"}
        onClick={() => {
          os.runApp(app.id);
          onClick();
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setTarget(e.currentTarget);
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
      <Text
        textShadow="0 1.5px 2px rgba(0, 0, 0, 0.4), 0 0 6px rgba(255, 255, 255, 0.15);"
        fontSize={"button"}
      >
        {app.name}
      </Text>
      <Menu target={target!} onClickOutside={() => setTarget(null)}>
        <List size="sm">
          <ListItem startIcon={<PushPin fontSize={18} />}>Pin App</ListItem>
          <ListItem>Hello</ListItem>
        </List>
      </Menu>
      <Stack
        position={"absolute"}
        bottom={0}
        left={0}
        zIndex={9}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
      >
        <IconButton
          color="default"
          size={44}
          onClick={() => {
            onClick();
          }}
        >
          <ArrowUpward />
        </IconButton>
      </Stack>
    </Stack>
  );
};

type Props = {
  os: Xanos;
  onClose: () => void;
};

const WidgetDrawer = ({ os, onClose }: Props) => {
  const apps = os.apps.getApps();
  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={1} p={3}>
      {apps.map((app) => {
        return (
          <AppIcon
            key={`app-drawer-${app.id}`}
            os={os}
            app={app}
            onClick={onClose}
          />
        );
      })}
    </Stack>
  );
};

export default {
  open: (os: Xanos) => {
    const l = Layer.open(
      <Stack height="100%">
        <WidgetDrawer
          os={os}
          onClose={() => {
            l.close();
          }}
        />
      </Stack>,
      {
        blur: 100,
      },
    );
  },
};
