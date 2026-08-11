import { createContext } from "react";

type AppID = string;
export const AppContext = createContext<AppID | null>(null);

export const AppProvider = ({
  children,
  appId,
}: {
  children: React.ReactNode;
  appId: AppID;
}) => {
  return <AppContext.Provider value={appId}>{children}</AppContext.Provider>;
};
