import { useContext } from "react";
import { OSContext } from "../context/OSContext.js";

const useOS = () => {
  const ctx = useContext(OSContext);
  if (!ctx) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return ctx;
};
export default useOS;
