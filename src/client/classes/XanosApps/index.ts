import createStore from "react-rock";
import Xanos from "../Xanos/index.js";
import { XanosAppSchema } from "./schema.js";
import type { XanosAppProps, XanosAppSchemaProps } from "./schema.js";

class XanosApps {
  private store = createStore(XanosAppSchema);
  constructor(private os: Xanos) {}

  create(
    app: Partial<XanosAppSchemaProps>,
    disableObservation = false,
  ): XanosAppProps {
    const has = this.store.find({
      where: { id: app.id },
      disableObservation: true,
    });
    if (has.length > 0) {
      throw new Error(`App with id "${app.id}" already exists.`);
    }

    return this.store.create({
      data: app,
      disableObservation,
    });
  }

  getApps(disableObservation = false) {
    return this.store.rows(disableObservation);
  }

  getApp(id: string, disableObservation: boolean = false) {
    return this.store.findOne({ where: { id }, disableObservation });
  }

  getWidgets() {
    const apps = this.getApps(false);
  }
}

export default XanosApps;
