import { Application } from "express";
import words from "../routes/words";
import tag from "../routes/tag";

const routes = (app: Application) => {
  app.use("/api/words", words);
  app.use("/api/tags", tag);
};

export default routes;
