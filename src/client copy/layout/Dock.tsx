import React from "react";
import Stack from "@xanui/ui/Stack";
import DashboardIcon from "@xanui/icons/Widgets";
import Xanos from "../include/Xanos/index.js";
import { List, Tooltip, ListItem, IconButton } from "@xanui/ui";

export type DockIconProps = {
  id: number;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

export const DockIcon = ({ id, icon, label, active }: DockIconProps) => {
  return (
    <Tooltip title={label} placement="right" delay={1000}>
      <IconButton
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        variant={active ? "ghost" : "text"}
        color={active ? "brand" : "default"}
        fontSize={20}
        size={40}
        onClick={() => {
          Xanos.store.setMeta("activeAppId", id);
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

const Dock = () => {
  const dockOption = Xanos.metas.get("dock") as any;
  const isSidebar = dockOption.mode === "sidebar";
  const isRight = dockOption.placement === "right";
  const activeAppId = Xanos.metas.get("activeAppId") as number;

  return (
    <Stack
      width={isSidebar ? 250 : 50}
      height="100vh"
      borderRight={isRight ? "none" : 1}
      borderLeft={isRight ? 1 : "none"}
    >
      {isSidebar && (
        <List variant="ghost">
          <ListItem
            gap={1}
            key={"dashboard"}
            startIcon={<DashboardIcon />}
            selected={activeAppId === 0}
            onClick={() => {
              Xanos.store.setMeta("activeAppId", 0);
            }}
          >
            Dashboard
          </ListItem>
          {Xanos.apps.map((app) => (
            <ListItem
              key={app.rid}
              startIcon={app.icon}
              selected={app.rid === activeAppId}
              onClick={() => {
                Xanos.store.setMeta("activeAppId", app.rid);
              }}
              gap={1}
            >
              {app.name}
            </ListItem>
          ))}
        </List>
      )}
      {!isSidebar && (
        <Stack flexDirection="column" alignItems="center" gap={1} mt={2}>
          <DockIcon
            key={"dashboard"}
            id={0}
            icon={<DashboardIcon />}
            label="Dashboard"
            active={activeAppId === 0}
          />
          {Xanos.apps.map((app) => (
            <DockIcon
              key={app.rid}
              id={app.rid}
              icon={app.icon}
              label={app.name}
              active={app.rid === activeAppId}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default Dock;
