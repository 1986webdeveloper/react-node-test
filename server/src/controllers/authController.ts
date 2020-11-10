import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../auth/passportHandler";


export class AuthController {

  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, info) {
      if (err) {
        console.log(err);
        return res.status(200).json({ status: false, code: "unauthorized" });
      }
      if (!user) {
        return res.status(200).json({ status: false, code: "unauthorized" });
      } else {
        return next();
      }
    })(req, res, next);
  }

  public authorizeJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("jwt", function (err, user, jwtToken) {
      if (err) {
        console.log(err);
        return res.status(200).json({ status: false, code: "unauthorized" });
      }
      if (!user) {
        return res.status(200).json({ status: false, code: "unauthorized" });
      } else {
        return next();
      }
    })(req, res, next);
  }


}

