import type { ReactElement } from "react";
import { xv, type Infer } from "xanv";
export const XanosAppSchema = {
  name: xv.string(),
  icon: xv.any<ReactElement>(),
  render: xv.functionComponent({}),
};

export type XanosApp = Infer<typeof XanosAppSchema>;

export const XanosMetaSchema = {
  activeAppId: xv.number().default(0), // the current app id
  dock: xv
    .object({
      mode: xv.enum(["dock", "sidebar"]).default("dock"),
      placement: xv.enum(["left", "right"]).default("left"),
    })
    .default({
      mode: "dock",
      placement: "left",
    }),
  theme: xv
    .object({
      mode: xv.enum(["light", "dark"]).default("dark"),
      accent: xv.string().default("#00bcd4"),
    })
    .default({
      mode: "dark",
      accent: "#00bcd4",
    }),
  auth: xv
    .object({
      id: xv.number().default(0),
      name: xv.string().default(""),
      email: xv.string().default(""),
    })
    .nullable()
    .default(null as any),
};
