import { Router } from "express";
import TagModel from "../models/tag";

const router = Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const tag = TagModel.findById(id);

  if (!tag) return res.status(404).send("Tag not found");

  res.status(200).json(tag);
});

export default router;
