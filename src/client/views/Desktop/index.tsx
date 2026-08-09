import Stack from "@xanui/ui/Stack";
import List from "@xanui/ui/List";
import ListItem from "@xanui/ui/ListItem";
import useContextMenu from "@xanui/ui/useContextMenu";
import Text from "@xanui/ui/Text";
import WidgetsOutlined from "@xanui/icons/WidgetsOutlined";
import RefreshOutlined from "@xanui/icons/RefreshOutlined";
import StyleOutlined from "@xanui/icons/StyleOutlined";
import WidgetDrawer from "../WidgetDrawer/index.js";
import Xanos from "../../classes/Xanos/index.js";

const Desktop = ({ os }: { os: Xanos }) => {
  const onContextMenu = useContextMenu({
    children: (
      <List size="sm">
        <ListItem
          startIcon={<RefreshOutlined />}
          onClick={() => window.location.reload()}
        >
          Refresh
        </ListItem>
        <ListItem startIcon={<StyleOutlined />}>Personalize</ListItem>
        <ListItem
          startIcon={<WidgetsOutlined />}
          onClick={() => {
            onContextMenu.close();
            WidgetDrawer.open(os);
          }}
        >
          Widgets
        </ListItem>
      </List>
    ),
  });

  return (
    <Stack width="100%" height="100%" onContextMenu={onContextMenu}>
      <Text variant="h5">Desktop</Text>
    </Stack>
  );
};

export default Desktop;
