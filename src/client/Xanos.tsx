import React from "react";
import OSRoot from "./views/OSRoot";
import XanosConfig from "./classes/XanosConfig";
import XanosApps from "./classes/XanosApps";
import XanosScreen from "./classes/XanosScreen";
import type { XanosConfigSchemaType } from "./classes/XanosConfig/schema.js";

class Xanos {
  readonly apps;
  readonly config;
  readonly screen;

  constructor(config: Partial<XanosConfigSchemaType> = {}) {
    this.config = new XanosConfig(config, this);
    this.apps = new XanosApps(this);
    this.screen = new XanosScreen(this);
  }

  runApp(appId: string, disableObservation: boolean = false) {
    const screens = this.screen.getScreensByAppId(appId, disableObservation);

    if (screens.length) {
      // check for screen with only this app
      for (const screen of screens) {
        const screenApps = this.screen.getAppsOnScreen(screen.rid, true);
        if (screenApps.length === 1) {
          this.screen.setActive(screen.rid, disableObservation);
          return;
        }
      }
      // otherwise activate first screen with app
      this.screen.setActive(screens[0].rid, disableObservation);
    } else {
      // create new screen with app
      this.screen.create(appId, disableObservation);
    }
  }

  render() {
    return <OSRoot os={this} />;
  }
}

export default Xanos;
