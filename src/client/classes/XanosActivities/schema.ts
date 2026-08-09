import { xv } from "xanv";
import { XanosAppSchema } from "../XanosApps/schema.js";

export const XanosActivitiesSchema = {
  appId: XanosAppSchema.id,
  groupId: xv.string().optional(),
};
