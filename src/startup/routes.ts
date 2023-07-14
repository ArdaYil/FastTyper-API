import { Application } from "express";
import words from "../routes/words";

const routes = (app: Application) => {
  app.use("/api/words", words);
};

export default routes;
