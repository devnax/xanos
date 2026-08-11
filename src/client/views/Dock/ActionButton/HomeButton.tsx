import IconButton from "@xanui/ui/IconButton";
import CircleOutlined from "@xanui/icons/CircleOutlined";
import Xanos from "../../../classes/Xanos/index.js";
import { useNavigate } from "react-router-dom";

const HomeButton = ({ os }: { os: Xanos }) => {
  const navigate = useNavigate();
  return (
    <IconButton
      size={40}
      opacity={0.8}
      hover={{
        opacity: 1,
      }}
      variant={"text"}
      color="default"
      onClick={() => {
        os.screen.setDeactive();
        navigate("/");
      }}
    >
      <CircleOutlined />
    </IconButton>
  );
};

export default HomeButton;
