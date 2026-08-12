import createStore from "react-rock";
import { XanosActivitiesSchema } from "./schema.js";

class XanosActivities {
  apps;

  constructor() {
    this.apps = createStore(XanosActivitiesSchema);
  }
}

export default XanosActivities;
