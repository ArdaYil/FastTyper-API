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

    const accessToken = req.header("x-auth-token");

    if (!accessToken)
      return res.status(401).send("Access denied | Unauthenticated");

    const user = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY || ""
    ) as User;

    if (user.permissonLevel < permissionLevel)
      return res.status(403).send("Access denied | Unauthorized");

    next();
  };

export default admin;
