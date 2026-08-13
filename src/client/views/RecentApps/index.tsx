import Stack from "@xanui/ui/Stack";
import CircleProgress from "@xanui/ui/CircleProgress";
import { useState } from "react";
import RenderScreen from "../OSRoot/RenderApps.js";
import { Iframe, Transition } from "@xanui/core";
import Text from "@xanui/ui/Text";
import IconButton from "@xanui/ui/IconButton";
import ArrowUpward from "@xanui/icons/ArrowUpward";
import Close from "@xanui/icons/Close";
import useEmblaCarousel from "embla-carousel-react";
import Layer from "@xanui/ui/Layer";
import XanosApps from "../../classes/XanosApps/index.js";

type ItemProps = { appId: string; onClose: Function };

const Item = ({ appId, onClose }: ItemProps) => {
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState(false);
  return (
    <Transition
      duration={open ? 0 : 300}
      open={open}
      variant={open ? "fade" : "fadeDown"}
      easing="standard"
      onEntered={() => {
        setTimeout(() => {
          setEntered(true);
        }, 500);
      }}
      onExited={() => {
        XanosApps.close(appId);
      }}
    >
      <Stack>
        <Stack justifyContent={"center"} alignItems={"center"} mb={1}>
          <IconButton
            color={"default"}
            variant={"text"}
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Stack>
        <Stack
          height="100%"
          width={400}
          position={"relative"}
          overflow={"hidden"}
          shadow={5}
          radius={2}
          border={1}
          onClick={() => {
            XanosApps.run(appId);
            onClose();
          }}
        >
          <Stack
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={9}
          ></Stack>
          <Stack height={700} shadow="lg" bgcolor="neutral.100">
            {entered ? (
              <Iframe
                sx={{
                  cursor: "none",
                  userSelect: "none",
                  pointerEvents: "unset",
                  height: 700,
                }}
              >
                {/* <RenderScreen /> */}
              </Iframe>
            ) : (
              <Stack
                height={700}
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircleProgress />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Transition>
  );
};

const RecentApps = ({ onClose }: { onClose: () => void }) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
  });
  const apps = XanosApps.getRunningApps();

  return (
    <Stack height="100%" justifyContent={"center"} width={"100%"}>
      <Stack>
        {apps.length === 0 && (
          <Stack height={700} textAlign={"center"}>
            <Text>No Recent Apps</Text>
          </Stack>
        )}
        {!!apps.length && (
          <Stack ref={emblaRef} overflow={"hidden"}>
            <Stack direction={"row"}>
              {apps.map((app) => {
                return (
                  <Stack key={app.id} flex="0 0 auto" minWidth={"0"} p={2}>
                    <Item appId={app.id} onClose={onClose} />
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack
        position={"absolute"}
        bottom={0}
        left={0}
        zIndex={9}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
      >
        <IconButton
          color="default"
          size={44}
          shadow={3}
          onClick={() => {
            onClose();
          }}
        >
          <ArrowUpward />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default {
  open: () => {
    const l = Layer.open(
      <Stack height="100%" width="100%">
        <RecentApps onClose={() => l.close()} />
      </Stack>,
      {
        transition: "zoomOver",
        blur: 20,
      },
    );
  },
};
