import Xanos from "../Xanos/index.js";
import type { XanosApp } from "../Xanos/schema.js";

class App {
  constructor(config: XanosApp) {
    Xanos.store.create({
      data: config,
    });
  }
}

export default App;
