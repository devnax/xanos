import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import XanosApps from "../classes/XanosApps";

const useApp = () => {
  const appId = useContext(AppContext);
  if (!appId) {
    throw new Error("useApp must be used within an AppProvider");
  }
  const app = XanosApps.getApp(appId);
  if (!app) {
    throw new Error(`App with id ${appId} not found`);
  }
  return app;
};

export default useApp;
