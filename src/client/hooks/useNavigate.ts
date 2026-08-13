import { useNavigate as useNavi } from "react-router-dom";
import useApp from "./useApp";
const useNavigate = () => {
  const navigate = useNavi();
  const app = useApp();
  if (!app) return navigate;
  return (path: string) => {
    if (app) navigate(`/${app.id}${path}`);
  };
};

export default useNavigate;
