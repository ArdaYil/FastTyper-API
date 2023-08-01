import { Router, Request, Response } from "express";
import TagModel from "../models/tag";
import auth from "../middleware/auth";
import admin from "../middleware/admin";

const router = Router();

const getIdPermissionLevel = 10;

router.get(
  "/:id",
  [auth, admin(getIdPermissionLevel)],
  (req: Request, res: Response) => {
    const id = req.params.id;
    const tag = TagModel.findById(id);

    if (!tag) return res.status(404).send("Tag not found");

    res.status(200).json(tag);
  }
);

export default router;
