// xanos/types/express.d.ts

import "express";

declare module "express-serve-static-core" {
  interface Response {
    page(path: string, props: Record<string, any>): Promise<void>;
  }
}
