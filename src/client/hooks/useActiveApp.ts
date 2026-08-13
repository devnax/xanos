import { useLocation } from "react-router-dom";
import XanosApps from "../classes/XanosApps";

const useActiveApp = () => {
  const location = useLocation();
  const appId = location.pathname.split("/")[1];
  const activeApp = XanosApps.getApp(appId, true);
  return activeApp;
};

export default useActiveApp;
