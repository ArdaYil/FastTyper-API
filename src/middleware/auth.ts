import MiddlewareFunction from "../types/MiddlewareFunction";
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth: MiddlewareFunction = (req, res, next) => {
  const accessToken = req.header("x-auth-token");

  if (!accessToken)
    return res.status(401).send("Access denied | Unauthenticated");

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY || "");

    next();
  } catch (exception: unknown) {
    if (exception instanceof JsonWebTokenError)
      return res.status(401).send("Invalid access token");

    if (exception instanceof TokenExpiredError)
      return res.status(401).send("Access token is not valid for use");
  }

  return res.status(500).send("Internal server error");
};

export default auth;
