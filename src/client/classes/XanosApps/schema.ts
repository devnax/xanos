import { ReactElement } from "react";
import type { MakeRowType } from "react-rock/types";
import { xv } from "xanv";
import type { Infer } from "xanv";

export const XanosAppWidgetSchemaObject = {
  id: xv.string(),
  name: xv.string().max(50),
  icon: xv.any(),
  description: xv.string().max(255).optional(),
  category: xv.string().max(50).default("general"),
  size: xv.enum(["small", "medium", "large"] as const).default("small"),
  render: xv.any(),
};

export const XanosAppShorcutSchemaObject = {
  mode: xv.string(),
  key: xv.string(),
  action: xv.any(),
};

export const XanosAppSchema = {
  id: xv.string(),
  name: xv.string().max(50),
  icon: xv.any<ReactElement>(),
  color: xv.string().optional(),
  render: xv.functionComponent({}).optional(),
  onContextMenu: xv.any().optional(),
  widgets: xv.array(xv.object(XanosAppWidgetSchemaObject)).optional(),
  shortcuts: xv.array(xv.object(XanosAppShorcutSchemaObject)).optional(),

  // internal
  running: xv.boolean().default(false),
};

export type XanosAppSchemaProps = Infer<typeof XanosAppSchema>;
export type XanosAppProps = MakeRowType<typeof XanosAppSchema>;
export type XanosAppWidgetProps = Infer<typeof XanosAppWidgetSchemaObject>;
export type XanosAppShorcutProps = Infer<typeof XanosAppShorcutSchemaObject>;
