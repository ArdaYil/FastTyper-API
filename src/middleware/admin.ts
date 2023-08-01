import MiddlewareFunction from "../types/MiddlewareFunction";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

type AdminFunction = (
  permissionLevel: number,
  testBypass: boolean
) => MiddlewareFunction;

const admin: AdminFunction =
  (permissionLevel, testBypass = false) =>
  (req, res, next) => {
    if (testBypass && process.env.NODE_ENV === "test") return next();

    const user = req.user;

    if (!user)
      throw new Error("Authentication must happen before authorization!");

    if (user.permissonLevel < permissionLevel)
      return res.status(403).send("Access denied | Unauthorized");

    next();
  };

export default admin;
