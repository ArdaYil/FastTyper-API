import express from "express";
import config from "config";

const app = express();
const port = process.env.PORT || config.get("port");

const server = app.listen(port, () =>
  console.log(
    `Fast Typer API started. Listening at http://127.0.0.1:${port}/api`
  )
);

export default server;
