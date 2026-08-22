// xanos/types/express.d.ts

import "express";
import { ReactElement } from "react";

declare module "express-serve-static-core" {
  interface Response {
    send(info: string | ReactElement): Promise<void>;
  }
}
