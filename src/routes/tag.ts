import { Router, Request, Response } from "express";
import TagModel from "../models/tag";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import { CastError } from "mongoose";

const router = Router();

const getIdPermissionLevel = 10;

router.get(
  "/:id",
  [auth, admin(getIdPermissionLevel)],
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const tag = await TagModel.findById(id);

      if (!tag) return res.status(404).send("Tag not found");

      return res.status(200).json(tag);
    } catch (exception: any) {
      if (exception.kind === "ObjectId") {
        return res.status(404).send("Tag not found");
      }

      return res.status(500).send("Internal server error");
    }
  }
);

export default router;
