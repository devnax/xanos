import createStore from "react-rock";
import type { StoreRID } from "react-rock/types";
import Xanos from "../../Xanos.js";
import { XanosScreenAppSchema, XanosScreenSchema } from "./schema";

export type XanosScreenProps = {
  active: boolean;
};

export type XanosScreenAppProps = {
  screenId: string;
  appId: string;
  width: number | string;
  height: number | string;
};

class XanosScreen {
  private os: Xanos;
  private screens;
  private apps;

  constructor(os: Xanos) {
    this.os = os;
    this.screens = createStore(XanosScreenSchema);
    this.apps = createStore(XanosScreenAppSchema);
  }

  create(appId: string, disableObservation = false) {
    const screen = this.screens.create({
      data: { active: false },
      disableObservation,
    });
    this.apps.create({
      disableObservation,
      data: {
        screenId: screen.rid,
        appId: appId,
        width: "100%",
        height: "100%",
      },
    });
    this.setActive(screen.rid, disableObservation);
    return screen;
  }

  setActive(screenId: StoreRID, disableObservation = false) {
    this.screens.update({
      disableObservation,
      data: { active: false },
      where: { active: true },
    });

    this.screens.update({
      disableObservation,
      data: { active: true },
      where: { rid: screenId },
    });
  }

  setDeactive(disableObservation = false) {
    this.screens.update({
      disableObservation,
      data: { active: false },
      where: { active: true },
    });
  }

  addAppToScreen(
    screenId: StoreRID,
    appId: string,
    disableObservation = false,
  ) {
    const screen = this.getScreenById(screenId, false);
    if (screen) {
      const apps = this.getAppsOnScreen(screenId, false);
      const hasApp = apps.find((app) => app.appId === appId);
      if (!hasApp) {
        this.apps.create({
          disableObservation,
          data: {
            screenId: screen.rid,
            appId,
            width: "100%",
            height: "100%",
          },
        });
      }
    }
  }

  getScreenById(rid: StoreRID, disableObservation = false) {
    return this.screens.findOne({
      disableObservation,
      where: { rid },
    });
  }

  getScreensByAppId(appId: string, disableObservation = false) {
    const apps = this.apps.find({ disableObservation, where: { appId } });
    if (apps?.length > 0) {
      const screens = apps.map((app) =>
        this.getScreenById(app.screenId, disableObservation),
      );
      return screens.filter((screen) => screen !== null);
    }
    return [];
  }

  getScreens(disableObservation = false) {
    return this.screens.rows(disableObservation);
  }

  getAppsOnScreen(screenId: StoreRID, disableObservation = false) {
    return this.apps.find({ disableObservation, where: { screenId } });
  }

  getActiveScreen(disableObservation = false) {
    return this.screens.findOne({
      disableObservation,
      where: { active: true },
    });
  }

  closeScreen(rid: StoreRID, disableObservation = false) {
    this.screens.delete({ disableObservation, where: { rid } });
    this.apps.delete({ disableObservation, where: { screenId: rid } });
  }

  clearScreens(disableObservation = false) {
    const allScreens = this.getScreens(disableObservation);
    allScreens.forEach((screen) => {
      this.closeScreen(screen.rid, disableObservation);
    });
  }
}

export default XanosScreen;
