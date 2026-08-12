import React, { useLayoutEffect } from "react";
import Xanos from "../classes/Xanos/index.js";
import { useNavigate, useLocation } from "react-router-dom";
export const OSContext = React.createContext<Xanos | null>(null);

export const OSProvider = ({
  children,
  os,
}: {
  children: React.ReactNode;
  os: Xanos;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const appId = location.pathname.slice(1);
    if (appId) {
      const app = os.apps.getApp(appId);
      if (app) {
        os.runApp(appId);
      } else {
        navigate(-1);
      }
    }
  }, []);
  return <OSContext.Provider value={os}>{children}</OSContext.Provider>;
};
