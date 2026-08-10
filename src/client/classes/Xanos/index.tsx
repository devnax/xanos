import React from "react";
import OSRoot from "../../views/OSRoot";
import XanosConfig from "../XanosConfig";
import XanosApps from "../XanosApps";
import XanosScreen from "../XanosScreen";

class Xanos {
  readonly apps;
  readonly config;
  readonly screen;

  constructor() {
    this.config = new XanosConfig();
    this.apps = new XanosApps(this);
    this.screen = new XanosScreen(this);
  }

  runApp(appId: string, disableObservation: boolean = false) {
    const screens = this.screen.getScreensByAppId(appId, disableObservation);

    if (screens.length) {
      for (const screen of screens) {
        const screenApps = this.screen.getAppsOnScreen(screen.rid, true);
        if (screenApps.length === 1) {
          this.screen.setActive(screen.rid, disableObservation);
          return;
        }
      }
      this.screen.setActive(screens[0].rid, disableObservation);
    } else {
      this.screen.create(appId, disableObservation);
    }
  }

  render() {
    return <OSRoot os={this} />;
  }
}

export default Xanos;
