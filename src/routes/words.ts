import config from "config";
import { Router } from "express";
import { getRandomWords } from "../services/wordSystem";

const router = Router();

router.get("/", (req, res) => {
  const words = getRandomWords(config.get("amountOfWords"));

  res.status(200).json(words);
});

export default router;
