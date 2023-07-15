import express, { Application } from "express";
import cors from "cors";

const middleware = (app: Application) => {
  app.use(express.json());
  app.use(cors());
};

export default middleware;
