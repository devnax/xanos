import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import useOS from "./useOS";

const useApp = () => {
  const appId = useContext(AppContext);
  if (!appId) {
    throw new Error("useApp must be used within an AppProvider");
  }
  const os = useOS();
  const app = os.apps.getApp(appId);
  if (!app) {
    throw new Error(`App with id ${appId} not found`);
  }
  return app;
};

export default useApp;
