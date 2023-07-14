import express from "express";

const app = express();
const port = process.env.PORT || 8000;

const server = app.listen(port, () =>
  console.log(
    `Fast Typer API started. Listening at http://127.0.0.1:${port}/api`
  )
);

export default server;
