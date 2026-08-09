import createStore from "react-rock";
import Xanos from "../../Xanos.js";
import { XanosActivitiesSchema } from "./schema.js";

class XanosActivities {
  apps;

  constructor(os: Xanos) {
    this.apps = createStore(XanosActivitiesSchema);
  }
}

export default XanosActivities;
