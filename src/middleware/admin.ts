import dotenv from "dotenv";
import MiddlewareFunction from "../types/MiddlewareFunction";

dotenv.config();

type AdminFunction = (permissionLevel: number) => MiddlewareFunction;

const admin: AdminFunction = (permissionLevel) => (req, res, next) => {
  const user = req.user;

  if (!user)
    throw new Error("Authentication must happen before authorization!");

  if (user.permissonLevel < permissionLevel)
    return res.status(403).send("Access denied | Unauthorized");

  next();
};

export default admin;
