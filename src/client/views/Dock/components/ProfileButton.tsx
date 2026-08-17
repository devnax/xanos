import Stack from "@xanui/ui/Stack";
import AvatarBox from "@xanui/ui/AvatarBox";
import Avatar from "@xanui/ui/Avatar";
import IconButton from "@xanui/ui/IconButton";
import Setting from "@xanui/icons/Settings";
import { useNavigate } from "react-router-dom";
import useActiveApp from "../../../hooks/useActiveApp";
import Query from "../../../libs/Api";

export type ProfileButtonProps = {
  mode: "compact" | "full";
};

const ProfileButton = ({ mode }: ProfileButtonProps) => {
  const navigate = useNavigate();
  const activeApp = useActiveApp();
  const isActiveSettingsApp = activeApp?.id === "settings";
  return (
    <>
      {mode === "compact" && (
        <Avatar
          src="/.xanos.icon.png"
          size={32}
          cursor={"pointer"}
          onClick={() => {
            navigate("/settings");
          }}
        />
      )}
      {mode === "full" && (
        <Stack
          onClick={() => {
            Query.post("/signin", {
              body: {
                email: "devnaxrul@gmail.com",
                password: "password",
              },
            }).then((res) => {
              console.log("Settings response:", res);
            });
            // navigate("/settings");
          }}
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            p: 1,
            borderRadius: 1.2,
            border: 1,
            borderColor: isActiveSettingsApp
              ? "brand.ghost.secondary"
              : "divider",
            bgcolor: isActiveSettingsApp
              ? "brand.ghost.primary"
              : "transparent",
            cursor: "pointer",
          }}
        >
          <AvatarBox
            title="Naxrul Ahmed"
            subtitle="devnaxrul@gmail.com"
            src="/.xanos.icon.png"
            slotProps={{
              avatar: {
                size: 32,
              },
              title: {
                lineHeight: 1.2,
                fontWeight: 600,
                fontSize: 14,
              },
              subtitle: {
                fontSize: 13,
                lineHeight: 1.2,
                color: "text.secondary",
                opacity: 0.8,
              },
            }}
          />
          <IconButton color="default" opacity={0.8}>
            <Setting />
          </IconButton>
        </Stack>
      )}
    </>
  );
};

export default ProfileButton;
