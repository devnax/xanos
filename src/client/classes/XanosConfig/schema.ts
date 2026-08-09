import type { InferValue } from "xanv";
import { xv } from "xanv";

export const XanosConfigSchema = {
  renderDesktop: xv.any().nullable().default(null),
  allow: xv
    .object({
      multitasking: xv.boolean(),
      desktop: xv.boolean(),
      desktopSettings: xv.boolean(),
      settings: xv.boolean(),
      profile: xv.boolean(),
      notifications: xv.boolean(),
      dock: xv.boolean(),
      apps: xv.boolean(),
      privacy: xv.boolean(),
    })
    .default({
      multitasking: true,
      desktop: true,
      desktopSettings: true,
      settings: true,
      profile: true,
      notifications: true,
      dock: true,
      apps: true,
      privacy: true,
    }),

  auth: xv
    .object({
      enabled: xv.boolean().default(false),
      profile: xv
        .object({
          avatar: xv.string(),
          name: xv.string(),
          email: xv.string().email(),
        })
        .nullable(),
    })
    .default({
      enabled: false,
      profile: null,
    }),

  theme: xv
    .object({
      mode: xv.enum(["dark", "light"] as const).default("dark"),
      accentColor: xv.string().default("#1e90ff"),
    })
    .default({
      mode: "dark",
      accentColor: "#1e90ff",
    }),
  dock: xv
    .object({
      mode: xv.enum(["os", "web", "compact"] as const).default("os"),
      placement: xv.enum(["left", "right", "bottom"] as const),
      pinnedApps: xv.array(xv.string()).default([]),
    })
    .default({
      mode: "os",
      placement: "left",
      pinnedApps: [],
    }),
  notifications: xv
    .object({
      sound: xv.boolean(),
    })
    .default({
      sound: true,
    }),
};

export type XanosConfigSchemaType = InferValue<typeof XanosConfigSchema>;
