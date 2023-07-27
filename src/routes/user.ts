import { Router } from "express";
import validate from "../middleware/validate";
import { User, validateUser } from "../models/user";

const router = Router();

router.post("/", [validate<User>(validateUser)], (req, res) => {
  res.status(200).send("Success");
});
