import type { Request, Response, NextFunction } from "express";
import Cookies from "universal-cookie";

declare global {
  namespace Express {
    interface Request {
      cookies: Cookies;
    }
  }
}

function cookieParser(req: Request, _res: Response, next: NextFunction) {
  req.cookies = new Cookies(req.headers.cookie);
  next();
}

export default cookieParser;
