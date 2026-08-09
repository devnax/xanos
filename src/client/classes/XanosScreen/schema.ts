import type { MakeRowType } from "react-rock/types";
import type { Infer } from "xanv";
import { xv } from "xanv";
import { XanosAppSchema } from "../XanosApps/schema.js";

export const XanosScreenSchema = {
  active: xv.boolean(),
};

export type XanosScreenSchemaProps = Infer<typeof XanosScreenSchema>;
export type XnaosScreenProps = MakeRowType<typeof XanosScreenSchema>;

export const XanosScreenAppSchema = {
  screenId: xv.number(),
  appId: XanosAppSchema.id,
  width: xv.string().optional(),
  height: xv.string().optional(),
};

export type XanosScreenAppSchemaProps = Infer<typeof XanosScreenAppSchema>;
export type XnaosScreenAppProps = MakeRowType<XanosScreenAppSchemaProps>;
