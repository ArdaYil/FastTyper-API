import dotenv from "dotenv";
import MiddlewareFunction from "../types/MiddlewareFunction";

dotenv.config();

type AdminFunction = (permissionLevel: number) => MiddlewareFunction;

const admin: AdminFunction = (permissionLevel) => (req, res, next) => {
  if (permissionLevel <= 1)
    throw new Error("Permission level has to be greater than 1");

  const user = req.user;

  if (!user)
    throw new Error("Authentication must happen before authorization!");

  if (user.permissionLevel < permissionLevel)
    return res.status(403).send("Access denied | Unauthorized");

  next();
};

export default admin;
