import { XanosInstance } from "../../index.js";
import type { XanosAppSchemaProps } from "../XanosApps/schema.js";

class App {
  constructor(config: Partial<XanosAppSchemaProps>) {
    XanosInstance.apps.create(config);
  }
}

export default App;
