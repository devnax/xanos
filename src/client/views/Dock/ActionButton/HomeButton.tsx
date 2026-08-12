import IconButton from "@xanui/ui/IconButton";
import CircleOutlined from "@xanui/icons/CircleOutlined";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
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
        navigate("/");
      }}
    >
      <CircleOutlined />
    </IconButton>
  );
};

export default HomeButton;
