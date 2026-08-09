import createStore from "react-rock";
import { deepMerge } from "../../utils";
import { XanosConfigSchema } from "./schema.js";
import type { XanosConfigSchemaType } from "./schema.js";

class XanosConfig {
  private store = createStore({}, XanosConfigSchema);

  get<Key extends keyof XanosConfigSchemaType>(
    key: Key,
    disableObservation = false,
  ): XanosConfigSchemaType[Key] {
    return this.store.getMeta(
      key,
      disableObservation,
    ) as Required<XanosConfigSchemaType>[Key];
  }

  set<Key extends keyof XanosConfigSchemaType>(
    key: Key,
    value: Partial<XanosConfigSchemaType[Key]>,
    disableObservation = false,
  ) {
    const merge = deepMerge(this.get(key, true), value);
    this.store.setMeta(key, merge, disableObservation);
  }
  get auth() {
    return this.get("auth");
  }

  get theme() {
    return this.get("theme");
  }
  get allow() {
    return this.get("allow");
  }

  get dock() {
    const isMobile = this.get("isMobile");
    const dock = this.get("dock");
    if (isMobile) {
      return {
        pinnedApps: dock.pinnedApps,
        mode: "compact",
        placement: "bottom",
      };
    }
    return dock;
  }
}

export default XanosConfig;
