import { Request, Response, Router } from "express";
import validate from "../middleware/validate";
import UserModel, { User, validateUser } from "../models/user";

const router = Router();

router.post(
  "/",
  [validate<User>(validateUser)],
  async (req: Request, res: Response) => {
    const { body } = req;
    const user = new UserModel(body);
    const accessToken = user.generateAccessToken();

    await user.save();

    res.status(200).json(user).setHeader("x-auth-token", accessToken);
  }
);
