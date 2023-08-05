import express from "express";
import config from "config";
import routes from "./startup/routes";
import middleware from "./startup/middleware";
import db from "./startup/db";

const app = express();
const port = process.env.PORT || config.get("port");

db();
middleware(app);
routes(app);

const server = app.listen(port, () =>
  console.log(
    `Fast Typer API started. Listening at http://127.0.0.1:${port}/api`
  )
);

module.exports = server;
