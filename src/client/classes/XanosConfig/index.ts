import createStore from "react-rock";
import { deepMerge } from "../../utils";
import type Xanos from "../../Xanos.js";
import { XanosConfigSchema } from "./schema.js";
import type { XanosConfigSchemaType } from "./schema.js";

class XanosConfig {
  private store = createStore({}, XanosConfigSchema);
  constructor(
    config: Partial<XanosConfigSchemaType>,
    private os: Xanos,
  ) {
    this.set("renderDesktop", config.renderDesktop ?? null, true);
    this.set("allow", config.allow ?? {}, true);
    this.set("auth", config.auth ?? {}, true);
    this.set("theme", config.theme ?? {}, true);
    this.set("dock", config.dock ?? {}, true);
  }

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
}

export default XanosConfig;
