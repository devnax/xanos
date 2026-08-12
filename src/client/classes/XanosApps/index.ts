import createStore from "react-rock";
import { XanosAppSchema } from "./schema.js";
import type { XanosAppProps, XanosAppSchemaProps } from "./schema.js";

class XanosApps {
  private store = createStore(XanosAppSchema);
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

  run(id: string, disableObservation = false) {
    const app = this.getApp(id, true);
    if (!app) {
      throw new Error(`App with id "${id}" not found.`);
    }
    this.store.update({
      where: { id },
      data: { running: true },
      disableObservation,
    });
  }

  close(id: string, disableObservation = false) {
    const app = this.getApp(id, true);
    if (!app) {
      throw new Error(`App with id "${id}" not found.`);
    }
    this.store.update({
      where: { id },
      data: { running: false },
      disableObservation,
    });
  }

  getRunningApps(disableObservation = false) {
    return this.store.find({
      where: { running: true },
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

export default new XanosApps();
