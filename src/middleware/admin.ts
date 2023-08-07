import MiddlewareFunction from "../types/MiddlewareFunction";

type AdminFunction = (permissionLevel: number) => MiddlewareFunction;

const minimumPermission = 2;
const maximumPermission = 10;

const admin: AdminFunction = (permissionLevel) => (req, res, next) => {
  if (
    permissionLevel < minimumPermission &&
    permissionLevel > maximumPermission
  )
    throw new Error("Permission level has to be between 2 and 10");

  const user = req.user;

  if (!user)
    throw new Error("Authentication must happen before authorization!");

  if (user.permissionLevel < permissionLevel)
    return res.status(403).send("Access denied | Unauthorized");

  next();
};

export default admin;
