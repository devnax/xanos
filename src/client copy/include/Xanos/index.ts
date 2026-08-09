import createStore from "react-rock";
import { XanosAppSchema, XanosMetaSchema } from "./schema.js";

class Xanos {
  store = createStore(XanosAppSchema, XanosMetaSchema);

  get metas() {
    return this.store.metas();
  }

  get theme() {
    return this.store.getMeta("theme") || XanosMetaSchema.theme.getDefault();
  }

  get apps() {
    return this.store.rows();
  }

  get ActiveApp() {
    const activeAppId = this.store.getMeta("activeAppId", true) as any;
    return this.store.findById(activeAppId);
  }
}

export default new Xanos();
