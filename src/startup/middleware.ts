import express, { Application } from "express";

const middleware = (app: Application) => {
  app.use(express.json());
};

export default middleware;
