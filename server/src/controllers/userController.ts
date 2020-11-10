import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";
import { v4 as uuidv4 } from "uuid";
export class UserController {

  public async registerUser(req: Request, res: Response): Promise<Response> {
    const { name, email_id, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = await User.findOne({ email_id: email_id });
    if (user && user.email_id) {
      return res.status(201).send({ status: false, message: "Email Id already exists!" });
    }

    await User.create({
      name: name,
      email_id: email_id,
      password: hashedPassword,
      reset_token: ""
    });

    const token = jwt.sign({ email_id: email_id }, JWT_SECRET);
    res.status(200).send({ status: true, token: token, name });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(200).json({ status: false, code: "unauthorized", message: info.message });
      } else {
        const token = jwt.sign({ email_id: user.email_id }, JWT_SECRET);
        res.status(200).send({ status: true, token: token, name: user.name });
      }
    })(req, res, next);
  }

  public async forgotPassword(req: Request, res: Response): Promise<Response> {
    const { email_id } = req.body;
    const token: string = uuidv4();
    const user = await User.findOne({ email_id: email_id });
    if (user && user.email_id) {
      user.reset_token = token;
      user.save();
      // Pass token Just for demo purpose otherwise we will use email to send a link along with token
      return res.status(201).send({ status: true, message: "Reset link sent to your email id!", token });
    }
    else {
      return res.status(201).send({ status: false, message: "Account not found!" });
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<Response> {
    const { email_id, token, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = await User.findOne({ email_id: email_id });
    if (user && user.email_id) {
      if (user.reset_token && user.reset_token == token) {
        user.reset_token = "";
        user.password = hashedPassword;
        user.save();

        return res.status(201).send({ status: true, message: "Password change successfully!" });
      }
      else {
        return res.status(201).send({ status: false, message: "Invalid reset link!" });
      }
    }
    else {
      return res.status(201).send({ status: false, message: "Account not found!" });
    }
  }

}