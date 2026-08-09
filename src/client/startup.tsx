import React from "react";
import { createRoot } from "react-dom/client";
import Xanos from "./Xanos.js";
import Home from "@xanui/icons/Home";
import Setting from "@xanui/icons/Settings";
import Input from "@xanui/ui/Input";
import Stack from "@xanui/ui/Stack";
import EventNoteOutlined from "@xanui/icons/EventNoteOutlined";
import Leaderboard from "@xanui/icons/Leaderboard";
import PeopleAltOutlined from "@xanui/icons/PeopleAltOutlined";
import Report from "@xanui/icons/Report";

const dash = new Xanos({
  dock: {
    mode: "os",
    placement: "left",
  },
  renderDesktop: () => {
    return (
      <Stack
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <h1>Welcome to Xanos Desktop!</h1>
      </Stack>
    );
  },
});

const Comp = () => {
  return (
    <Stack height="100%" width={"100%"} bgcolor="surface.primary" p={2}>
      <Input placeholder="Type your notes here..." />
    </Stack>
  );
};

dash.apps.create({
  id: "app-1",
  name: "Notes",
  color: "#b71212",
  icon: <EventNoteOutlined />,
  widgets: [
    {
      id: "asd",
      name: "",
      icon: "",
      description: "",
      category: "",
      // size: "",
      render: () => {},
    },
  ],
  render: Comp,
  onContextMenu: () => {},
});

dash.apps.create({
  id: "app-2",
  name: "Contacts",
  color: "#093cab",
  icon: <PeopleAltOutlined />,
  render: () => {
    return (
      <Stack height="100%" width={"100%"} bgcolor="surface.primary" p={2}>
        <p>This is the contacts application.</p>
      </Stack>
    );
  },
});

dash.apps.create({
  id: "app-2-1",
  name: "Leaderboard",
  color: "#079d34",
  icon: <Leaderboard />,
  render: () => {
    return (
      <Stack height="100%" width={"100%"} bgcolor="surface.primary" p={2}>
        <p>This is the leaderboard application.</p>
      </Stack>
    );
  },
});

dash.apps.create({
  id: "app-3",
  name: "Reports",
  color: "#d2970d",
  icon: <Report />,
  render: () => {
    return (
      <Stack height="100%" width={"100%"} bgcolor="surface.primary" p={2}>
        <p>This is the reports application.</p>
      </Stack>
    );
  },
});

dash.apps.create({
  id: "app-home",
  name: "Home",
  icon: <Home />,
  color: "#5b5b65",
  render: () => {
    return (
      <Stack height="100%" width={"100%"} bgcolor="surface.primary" p={2}>
        <p>Welcome to Xanos OS!</p>
      </Stack>
    );
  },
});

dash.apps.create({
  id: "app-settings",
  name: "Settings",
  icon: <Setting />,
  color: "#049219",
  render: () => {
    return (
      <Stack height="100%" width={"100%"} bgcolor="surface.primary" p={2}>
        <p>This is the settings application.</p>
      </Stack>
    );
  },
});

const App = () => {
  return <Stack>{dash.render()}</Stack>;
};

const container = document.getElementById("xroot");
if (!container) throw new Error("Missing #xroot element");

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
